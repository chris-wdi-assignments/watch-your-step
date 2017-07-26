$(document).ready(function () {
  $('#create-incident').modal('show');

  $('#new-incident').on('submit', function(e) {
    e.preventDefault();

    var formData = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/api/incidents',
      data: formData,
      success: onCreate
      // this will create new incident in database
    })

    function onCreate(newIncident) {
      console.log("Successfully posted/created");
      $('#create-incident').modal('hide');
    } // closes onCreate function
  }) // closes onsubmit handler

  $.ajax({
    method: 'GET',
    url: '/api/incidents',
    success: renderMultipleIncidents
  });

  function renderMultipleIncidents(incidents) {
    var makeArray = incidents.incidents;
    makeArray.forEach(function(incident) {
      renderIncident(incident);
    });
  }

  function renderIncident(incident) {
    var indexIncident = (`
      <ul>
        <li>Address: ${incident.address}</li>
        <li>Category: ${incident.category}</li>
        <li>Date: ${incident.date}</li>
        <li>Expires: ${incident.expiration}</li>
      </ul>
    `)
    $("#show-data").append(indexIncident); //put at end
  }

}); //closes document
