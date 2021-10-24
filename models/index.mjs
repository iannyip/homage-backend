import { Sequelize } from 'sequelize';
import { combineTableNames } from 'sequelize/types/lib/utils';
import allConfig from '../config/config.js';

// Get the functions from each model
import initCentreModel from './centre.mjs';
import initPersonModel from './person.mjs';
import initBookingModel from './booking.mjs';

// Create the db
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

// add your model definitions to db here
db.Centre = initCentreModel(sequelize, Sequelize.DataTypes);
db.Person = initPersonModel(sequelize, Sequelize.DataTypes);
db.Booking = initBookingModel(sequelize, Sequelize.DataTypes);

db.Booking.belongsTo(db.Centre);
db.Centre.hasMany(db.Booking);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(db);

export default db;
