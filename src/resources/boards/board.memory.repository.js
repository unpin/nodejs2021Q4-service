const dataSource = require('../../database/dataSource');
const Board = require('./board.model');

const createOne = async (data) => dataSource.addDocument(Board.name, data);
const getAll = async () => dataSource.getDocuments(Board.name);
const getByID = async (id) => dataSource.getDocument(Board.name, { id });
const updateOne = async (query, update) =>
  dataSource.updateDocument(Board.name, query, update);
const deleteOne = async (query) => dataSource.deleteDocument(Board.name, query);

module.exports = { createOne, getAll, getByID, updateOne, deleteOne };
