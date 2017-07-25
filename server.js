const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));

// const controllers = require('./controllers');

//db

//const db = require('./models');

//routes

app.get('/', function (req, res) {
  res.sendFile('views/index.html', {root: __dirname});
});

app.get('/api', controllers.api.index);
app.get('/api/incidents', controllers.incidents.index);
app.get('/api/incidents/:incident_id', controllers.incidents.show);

app.post('/api/incidents', controllers.incidents.create);

app.delete('/api/incidents/:incident_id', controllers.incidents.destroy);

app.put('/api/incidents/:incident_id', controllers.incidents.update);

// serve

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Express serving from port ${port}`);
});
