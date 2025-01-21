import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.config.js';
import UserModel from './user.model.js';
import BootcampModel from './bootcamp.model.js';

// INICIALIZA LA CONEXION A LA BASE DE DATOS DESDE: config->db.config.js
export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  port: dbConfig.port,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//METODOS
db.users = UserModel(sequelize, Sequelize);
db.bootcamps = BootcampModel(sequelize, Sequelize);

// RELACION MANY-TO-MANY
db.users.belongsToMany(db.bootcamps, {
  through: 'user_bootcamp',
  as: 'bootcamps',
  foreignKey: 'user_id',
  otherKey: 'bootcamp_id',
});

db.bootcamps.belongsToMany(db.users, {
  through: 'user_bootcamp',
  as: 'users',
  foreignKey: 'bootcamp_id',
  otherKey: 'user_id',
});

export default db;
