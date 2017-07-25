var db = require("./models");


// this will fill the messageList with xx objects that you can turn into models
var incidentList = [];

    incidentList.push({
    address : "1336 9th Ave, San Francisco, CA 94122",
    description : "Droppings",
    date : "July 25 2017"
    });
    incidentList.push({
    address : "937 Taraval St, San Francisco, CA 94116",
    description : "Construction",
    date : "July 25 2017"
    });
    incidentList.push({
    address : "1140 Ocean Ave, San Francisco, CA 94112",
    description : "Crime Scene",
    date : "March 1 2017"
    });
    incidentList.push({
    address : "4301 24th St, San Francisco, CA 94114",
    description : "Public Event",
    date : "July 24 2017"
    });
    incidentList.push({
    address : "73 Cambon Dr, San Francisco, CA 94132",
    description : "Miscellaneous",
    date : "July 23 2017"
    });
    incidentList.push({
    address : "4 Coleridge St, San Francisco, CA 94110",
    description : "Droppings",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "3000 24th St, San Francisco, CA 94110",
    description : "Construction",
    date : "July 22, 2017"
    });
    incidentList.push({
    address : "2171 Mission St, San Francisco, CA 94110",
    description : "Crime Scene",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "4 Coleridge St, San Francisco, CA 94110",
    description : "Public Event",
    date : "July 25, 2017"
    });
    incidentList.push({
    address : "321 Florida St, San Francisco, CA 94110",
    description : "Miscellaneous",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "Beach Street & The Embarcadero, San Francisco, CA 94133",
    description : "Construction",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "882 North Point St, San Francisco, CA 94109",
    description : "Droppings",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "499 Bay St, San Francisco, CA 94133",
    description : "Construction",
    date : "July 24, 2017"
    });
    incidentList.push({
    address : "868 Geary Blvd, San Francisco, CA 94109",
    description : "Miscellaneous",
    date : "July 24, 2017"
    });


  incidentList.forEach(function(incident){
    incident.expiration = incident.date;
  });



//funtion to seed database with messages. This will delete all esisting messages before seeding.
db.Incident.remove({}, function(err, removed){

  db.Incident.create(incidentList, function(err, created){
    if (err) { console.log('ERROR' + err); }
    process.exit();
  });

});
