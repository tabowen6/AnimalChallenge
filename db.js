const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:password@localhost:5432/animal-server");

module.exports = db;