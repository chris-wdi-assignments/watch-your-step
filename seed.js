var db = require("./models");


// this will fill the messageList with xx objects that you can turn into models
/*
var incidentList = [];

    incidentList.push({
    address : "1336 9th Ave, San Francisco, CA 94122",
    category : "Droppings",
    date : "July 25 2017"
    });
    incidentList.push({
    address : "937 Taraval St, San Francisco, CA 94116",
    category : "Construction",
    date : "July 25 2017"
    });
    incidentList.push({
    address : "1140 Ocean Ave, San Francisco, CA 94112",
    category : "Crime Scene",
    date : "March 1 2017"
    });
    incidentList.push({
    address : "4301 24th St, San Francisco, CA 94114",
    category : "Public Event",
    date : "July 24 2017"
    });
    incidentList.push({
    address : "73 Cambon Dr, San Francisco, CA 94132",
    category : "Other",
    date : "July 23 2017"
    });
    incidentList.push({
    address : "4 Coleridge St, San Francisco, CA 94110",
    category : "Droppings",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "3000 24th St, San Francisco, CA 94110",
    category : "Construction",
    date : "July 22, 2017"
    });
    incidentList.push({
    address : "2171 Mission St, San Francisco, CA 94110",
    category : "Crime Scene",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "4 Coleridge St, San Francisco, CA 94110",
    category : "Public Event",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "321 Florida St, San Francisco, CA 94110",
    category : "Other",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "Beach Street & The Embarcadero, San Francisco, CA 94133",
    category : "Construction",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "882 North Point St, San Francisco, CA 94109",
    category : "Droppings",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "499 Bay St, San Francisco, CA 94133",
    category : "Construction",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "868 Geary Blvd, San Francisco, CA 94109",
    category : "Other",
    date : "July 24, 2017"
    });
*/

const oneIncident = {
  address : "868 Geary Blvd, San Francisco, CA 94109",
  latitude : 37.7863157,
  longitude : -122.4246912,
  category : "Other",
  date : "July 24, 2017",
  expiration : "July 26, 2017"
};

let incidentList = [
  {
    address : "868 Geary Blvd, San Francisco, CA 94109",
    latitude : 37.7863157,
    longitude : -122.4246912,
    category : "Other",
    date : "July 24, 2017",
    expiration : "July 26, 2017"
  },
  {
    address: "1639 Polk St, San Francisco, CA 94109",
    latitude: 37.7263157,
    longitude: -122.4846912,
    category: "Droppings",
    date: "July 27, 2017",
    expiration: "July 29, 2017"
  }
];

//funtion to seed database with messages. This will delete all esisting messages before seeding.
db.Incident.remove({}, function(err, removed){
  db.Incident.create(incidentList, function(err, created){
    if (err) { console.log('ERROR' + err); }
    process.exit();
  });
});
