const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres@localhost:5432/racetracker', {dialect: 'postgres'});
 
module.exports = sequelize;