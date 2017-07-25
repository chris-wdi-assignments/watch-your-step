const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/watchyourstep');

const Incident = require('./incident');
//const Neighborhood = require('./neighborhood');

module.exports = {
  //Neighborhood : Neighborhood,
  Incident: Incident
};
