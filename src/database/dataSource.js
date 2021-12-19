const UUID = require('../utils/uuid/UUID.js');

const defaultOptions = {
  autoGenerateID: true,
};

class DataSource {
  constructor(options) {
    this.database = new Map();
    this.options = { ...defaultOptions, ...options };
  }

  getCollection(collection) {
    this.ensureCollection(collection);
    return this.database.get(collection);
  }

  ensureCollection(collection) {
    if (!this.database.has(collection)) {
      this.database.set(collection, []);
    }
  }

  addDocument(collection, doc) {
    const docToSave = { ...doc };
    this.ensureCollection(collection);
    const docs = this.getCollection(collection);
    if (this.options.autoGenerateID) {
      if (!docToSave.id) {
        docToSave.id = UUID.generateUUID();
      }
    }
    docs.push(docToSave);
    return Promise.resolve(docToSave);
  }

  getDocument(collection, query) {
    const docs = this.getCollection(collection);

    if (!query) return [...this.getCollection(collection)];
    const doc = docs.find(DataSource.queryFilter(query));
    if (doc) {
      return Promise.resolve({ ...doc });
    }

    return Promise.resolve(null);
  }

  getDocuments(collection, query) {
    const docs = this.getCollection(collection);
    if (!query) return [...docs];
    const filtered = docs.filter(DataSource.queryFilter(query));
    return Promise.resolve(filtered);
  }

  updateDocument(collection, query, update) {
    const docs = this.getCollection(collection);
    const document = docs.find(DataSource.queryFilter(query));
    if (document) {
      const updated = Object.assign(document, update);
      return Promise.resolve(updated);
    }
    return Promise.resolve(null);
  }

  updateDocuments(collection, query, update) {
    const docs = this.getCollection(collection);
    const filtered = docs.filter(DataSource.queryFilter(query));
    if (filtered.length) {
      filtered.forEach((o) => {
        Object.assign(o, update);
      });
      return Promise.resolve(true);
    }
    return Promise.resolve(null);
  }

  deleteDocuments(collection, query) {
    const docs = this.getCollection(collection);
    const toDelete = docs.filter(DataSource.queryFilter(query));
    if (toDelete) {
      toDelete.forEach((doc) =>
        this.deleteDocument(collection, { id: doc.id })
      );
      return Promise.resolve(true);
    }
    return Promise.resolve(null);
  }

  deleteDocument(collection, query) {
    const docs = this.getCollection(collection);
    const docIndex = docs.findIndex(DataSource.queryFilter(query));
    if (docIndex !== -1) {
      const found = docs[docIndex];
      docs.splice(docIndex, 1).pop();
      return Promise.resolve({ ...found });
    }

    return Promise.resolve(null);
  }

  static queryFilter(query) {
    return (doc) => {
      const entry = Object.entries(query);
      for (let i = 0; i < entry.length; i += 1) {
        const [key, value] = entry[i];
        if (doc[key] !== value) return false;
      }
      return true;
    };
  }

  static connect(options) {
    DataSource.INSTANCE = new DataSource(options);
    return Promise.resolve();
  }

  static getInstance() {
    return DataSource.INSTANCE;
  }
}

module.exports = new DataSource();
