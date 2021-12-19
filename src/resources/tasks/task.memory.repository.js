const dataSource = require('../../database/dataSource');
const Task = require('./task.model');

const createOne = async (data) => dataSource.addDocument(Task.name, data);
const getAll = async () => dataSource.getDocuments(Task.name);
const getByID = async (id) => dataSource.getDocument(Task.name, { id });
const updateOne = async (query, update) =>
  dataSource.updateDocument(Task.name, query, update);
const updateMany = async (query, update) =>
  dataSource.updateDocuments(Task.name, query, update);
const deleteOne = async (query) => dataSource.deleteDocument(Task.name, query);
const deleteMany = async (query) =>
  dataSource.deleteDocuments(Task.name, query);

module.exports = {
  createOne,
  getAll,
  getByID,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
};
