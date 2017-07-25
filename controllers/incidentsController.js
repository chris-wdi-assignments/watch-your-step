const db = require("../models");

// GET /api/incidents
const index = function (req, res) {
  db.Incident.find({}, function(err, incidents){
    if (err){
      res.status(500).json({error: err.message});
    }
    res.json({incidents: incidents});
  });
}

// GET /api/incidents/:incident_id
const show = function (req, res) {
  const id = req.params.incident_id;
  db.Incident.findById(id, function (err, incident) {
    if (err) return res.status(500).json(err);
    if (incident === null) return res.status(404).json({message: 'incident not found'});
    res.json(incident);
  });
}

function addTwoDays(now){
  var twoDaysMilliseconds = now + 172800000;
  return new Date(twoDaysMilliseconds);
}

// POST /api/incidents
const create = function (req, res) {
  db.Incident.create({
    address: req.body.address,
    description: req.body.description,
    date: new Date(),
    expiration: addTwoDays(Date.now())
  }, function(err, newIncident){
    if (err) {
      return res.status(500).json({error: err.message});
    }
    res.json(newIncident);
  });
}

// PUT /api/incidents/:incident_id
const update = function (req, res) {
  db.Incident.findById(req.params.incident_id, function(err, foundIncident){
    if(err) return res.send(err);
    foundIncident.address = req.body.address;
    foundIncident.description = req.body.description;
    foundIncident.date = new Date();
    foundIncident.expiration = addTwoDays(Date.now());
    foundIncident.save(function(err, savedIncident){
      if(err) return res.send(err);
      res.json(savedIncident)
    });
  });
}

// DELETE /api/incidents/:incident_id
const destroy = function (req, res) {
  res.send("This will destroy a single incident.");
}

module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
