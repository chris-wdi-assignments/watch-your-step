const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const Neighborhood = require('./neighborhood.js');

const IncidentSchema = new Schema({
  address: String,
  description: String,
  date: Date,
  //neighborhood: Neighborhood,
  expiration: Date
});

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident;
