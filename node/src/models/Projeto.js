const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Projeto = sequelize.define('Projeto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  coordenador: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  curso: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('ativo', 'finalizado'),
    allowNull: false,
    defaultValue: 'ativo',
  },
}, {
  tableName: 'projetos',
  timestamps: false,
});

module.exports = Projeto;
