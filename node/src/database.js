const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetos_db', 'postgres', '1234', {
  host: '::1',
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
