const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/watchyourstep');

const Incident = require('./incident');
//const Neighborhood = require('./neighborhood');

module.exports = {
  //Neighborhood : Neighborhood,
  Incident: Incident
};
