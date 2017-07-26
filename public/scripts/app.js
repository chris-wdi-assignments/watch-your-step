$(document).ready(function () {

  $('#new-button').on('click', function (e) {
    $('#create-incident').modal('show');
  })

  $('#show-data').on('click', '.incident-show-btn', function() {
    console.log('incident-show-btn is working!!');
    $('#update-incident').modal('show');

  })



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
      <ul class="list-group">
        <li class="list-group-item">Address: ${incident.address}</li>
        <li class="list-group-item">Category: ${incident.category}</li>
        <li class="list-group-item">Date: ${incident.date}</li>
        <li class="list-group-item">Expires: ${incident.expiration}</li>
        <li class="list-group-item">
          <button class="btn btn-default incident-show-btn" data-incident-id="${incident._id}">View</button>
        </li>
      </ul>
    `)
    $("#show-data").append(indexIncident); //put at end
  }

}); //closes document
