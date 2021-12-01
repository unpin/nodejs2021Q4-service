const dataSource = require('../../database/dataSource');
const User = require('./user.model');

const createOne = async (data) => dataSource.addDocument(User.name, data);
const getAll = async () => dataSource.getDocuments(User.name);
const getByID = async (id) => dataSource.getDocument(User.name, { id });
const updateOne = async (query, update) =>
  dataSource.updateDocument(User.name, query, update);
const deleteOne = async (query) => dataSource.deleteDocument(User.name, query);

module.exports = { createOne, getAll, getByID, updateOne, deleteOne };
