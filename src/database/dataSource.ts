import UUID from '../utils/uuid/UUID';
import Model from './Model';

type DataSourceOptions = {
  autoGenerateID: boolean;
};

const defaultOptions: DataSourceOptions = {
  autoGenerateID: true,
};

class DataSource {
  options: DataSourceOptions;

  database: Map<string, object[]>;

  /**
   * Creates an instance of the DataSource class.
   *
   * @param options - {@link DataSourceOptions}
   * @returns Returns instance of {@link DataSource}
   *
   */

  constructor(options: DataSourceOptions) {
    this.database = new Map<string, object[]>();
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Returns a collection with the specified name.
   *
   * @param collectionName - name of collection
   * @returns Returns an array of objects
   *
   */

  getCollection(collectionName: string): object[] {
    this.ensureCollection(collectionName);
    return <object[]>this.database.get(collectionName);
  }

  /**
   *
   * Creates collection if it does not exist
   *
   * @param collectionName - name of collection
   * @returns void
   *
   */

  ensureCollection(collectionName: string): void {
    if (!this.database.has(collectionName)) {
      this.database.set(collectionName, []);
    }
  }

  /**
   * Adds a document to the given collection.
   *
   * @param collectionName - name of collection
   * @param doc - {@link Model} document to add
   * @returns Returns the document that was added
   *
   */

  addDocument(collectionName: string, doc: Model): object {
    const documentToSave = { ...doc };
    this.ensureCollection(collectionName);
    const collection = this.getCollection(collectionName);
    if (this.options.autoGenerateID) {
      if (!documentToSave.id) {
        documentToSave.id = UUID.generateUUID();
      }
    }
    collection.push(documentToSave);
    return documentToSave;
  }

  /**
   * Gets a document from a given collection that matches the query.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @returns Returns an object that matches the query or null
   * if no match is found
   *
   */

  getDocument(collectionName: string, query: object): object | null {
    const collection = this.getCollection(collectionName);
    const document = collection.find(DataSource.queryFilter(query));
    if (document) {
      return { ...document };
    }

    return null;
  }

  /**
   * Gets documents from a given collection that match the query.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @returns Returns an array of objects that matched the query
   *
   */

  getDocuments(collectionName: string, query: object) {
    const collection = this.getCollection(collectionName);
    if (!query) return [...collection];
    const filtered = collection.filter(DataSource.queryFilter(query));
    return filtered;
  }

  /**
   * Updates a document from a given collection that match the query
   * with the update object.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @param update - Object that contains the updated fields
   * @returns Returns an updated object or null if no match is found
   *
   */

  updateDocument(
    collectionName: string,
    query: object,
    update: object
  ): object | null {
    const collection = this.getCollection(collectionName);
    const document = collection.find(DataSource.queryFilter(query));
    if (document) {
      const updated = Object.assign(document, update);
      return updated;
    }
    return null;
  }

  /**
   * Updates documents from a given collection that match the query.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @param update - Object that contains the updated fields
   * @returns Returns true if the update was successful or false
   * if no match is found
   *
   */

  updateDocuments(
    collectionName: string,
    query: object,
    update: object
  ): boolean {
    const collection = this.getCollection(collectionName);
    const foundDocuments = collection.filter(DataSource.queryFilter(query));
    if (foundDocuments.length) {
      foundDocuments.forEach((o) => {
        Object.assign(o, update);
      });
      return true;
    }
    return false;
  }

  /**
   * Deletes a document from a given collection that matches the query.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @returns Returns deleted object if delete was successful or null
   * if no match was found
   *
   */

  deleteDocument(collectionName: string, query: object): object | null {
    const collection = this.getCollection(collectionName);
    const documentIndex = collection.findIndex(DataSource.queryFilter(query));
    if (documentIndex !== -1) {
      const document = collection.splice(documentIndex, 1).pop();
      return { ...document };
    }
    return null;
  }

  /**
   * Deletes documents from a given collection that match the query.
   *
   * @param collectionName - name of collection
   * @param query - Object that serves as a search query
   * @returns Returns true if the delete was successful or false
   * if no match is found
   *
   */

  deleteDocuments(collectionName: string, query: object): boolean {
    const collection = this.getCollection(collectionName);
    const toDelete = <Model[]>collection.filter(DataSource.queryFilter(query));
    if (toDelete) {
      toDelete.forEach((doc) =>
        this.deleteDocument(collectionName, { id: doc.id })
      );
      return true;
    }
    return false;
  }

  /**
   * Returns a function that can be used to filter documents by a query.
   *
   * @param query - Object that serves as a search query
   * @returns Returns a function that can be used to filter documents by a query.
   *
   */

  static queryFilter<T>(query: Partial<T>): (doc: T) => boolean {
    return (doc: T) => {
      type Fields = keyof T;
      const keys = Object.keys(query) as Fields[];
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        if (doc[key] !== query[key]) {
          return false;
        }
      }
      return true;
    };
  }
}

const dataSource = new DataSource(defaultOptions);

export default dataSource;
