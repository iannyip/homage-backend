import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

// Get the functions from each model
import initCentreModel from './centre.mjs';
import initPersonModel from './person.mjs';
import initBookingModel from './booking.mjs';

// Create the db
const env = process.env.NODE_ENV || 'development';
const config = allConfig[env];
const db = {};
let sequelize;
if (env === 'production') {
  // Break apart the Heroku database url and rebuild the configs we need
  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(
    dbUrl.auth.indexOf(':') + 1,
    dbUrl.auth.length,
  );
  const dbName = dbUrl.path.slice(1);
  const host = dbUrl.hostname;
  const { port } = dbUrl;
  config.host = host;
  config.port = port;
  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// add your model definitions to db here
db.Centre = initCentreModel(sequelize, Sequelize.DataTypes);
db.Person = initPersonModel(sequelize, Sequelize.DataTypes);
db.Booking = initBookingModel(sequelize, Sequelize.DataTypes);

db.Booking.belongsTo(db.Centre);
db.Centre.hasMany(db.Booking);

db.Person.hasOne(db.Booking);
db.Booking.belongsTo(db.Person);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
