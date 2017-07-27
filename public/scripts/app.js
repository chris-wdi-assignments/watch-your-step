
function addTwoDays(now){
  var twoDaysMilliseconds = now + 172800000;
  return new Date(twoDaysMilliseconds);
}

$(document).ready(function () {

  $('#new-button').on('click', function (e) {
    $('#create-incident').modal('show');
  });

  $('#incident-edit-btn').on('click', function (e) {
    const id = $('#update-incident').attr('data-incident-id');
    $.ajax({
      method: "GET",
      url: `/api/incidents/${id}`,
      success: function (incident) {
        $('#edit-address').val(incident.address);
        let category = incident.category;
        category = category ? category.toLowerCase() : '';
        $('#edit-category').val(category);
        $('.show-elements').hide();
        $('.edit-elements').show();
      }
    })
  });

  //PUT
  $('#update-form').on('submit', function (e) {
    e.preventDefault();
    const id = $('#update-incident').attr('data-incident-id');
    const data = {
      address: $('#edit-address').val(),
      category: $('#edit-category').val().toLowerCase(),
      date: new Date(),
      expiration: addTwoDays(Date.now())
    };
    console.log(data);
    $.ajax({
      method: "put",
      url: `/api/incidents/${id}`,
      data: data,
      success: function (incident) {
        $(`.incident-show-btn[data-incident-id="${id}"]`).closest('.list-group').remove();
        renderIncident(incident);
        $('#update-incident').modal('hide');
        $('.show-elements').show();
        $('.edit-elements').hide();
      }
    })
  })

  //DELETE
  $('#incident-delete-btn').on('click', function (e) {
    const id = $('#update-incident').attr('data-incident-id');

    $.ajax({
      method: "DELETE",
      url: "/api/incidents/" + id,
      success: function () {
        $('#update-incident').modal('hide');
        $(`.incident-show-btn[data-incident-id="${id}"]`).closest('.list-group').remove();
      },
      error: function (err) {
        console.log('There was an error!', 'err');
      }
    })

  })

  //GET - SHOW
  $('#show-data').on('click', '.incident-show-btn', function(e) {
    $('.show-elements').show();
    $('.edit-elements').hide();
    const id = $(e.target).attr('data-incident-id');
    $('#update-incident').attr('data-incident-id', id);
    $.ajax({
      method: 'GET',
      url: '/api/incidents/' + id,
      success: function (incident) {
        $('.show-address').text(incident.address);
        $('.show-category').text(incident.category);
        $('.show-date').text(incident.date);
      },
      error: function (err) {throw new Error(err);}
    })
    $('#update-incident').modal('show');
  })

  // POST
  $('#new-incident').on('submit', function(e) {
    e.preventDefault();

    const formData = $(this).serialize();

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
      renderIncident(newIncident);
      $("#new-incident").trigger("reset");



    } // closes onCreate function
  }) // closes onsubmit handler

  $.ajax({
    method: 'GET',
    url: '/api/incidents',
    success: renderMultipleIncidents
  });

  function renderMultipleIncidents(incidents) {
    const map = new google.maps.Map(document.getElementById('show-data'), {
      center: {
        lat: 37.78,
        lng: -122.44
      },
      zoom: 13
    });

    var myLatLng = {lat: -25.363, lng: 131.044};

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });


    // Create Markers

    incidents.incidents.forEach(function(potato) {
      console.log(potato);
      var marker = new google.maps.Marker({
        position: {lat: potato.latitude, lng: potato.longitude},
        map: map,
        title: 'Hello World!'
      });
    });


  } //closes renderMultipleIncidents function







  function renderIncident(incident) {
    var indexIncident = (`
      <ul class="list-group">
      <li class="list-group-item">Address: ${incident.address}</li>
      <li class="list-group-item">Category: ${incident.category}</li>
      <li class="list-group-item">Date: ${incident.date}</li>
      <li class="list-group-item">
      <button class="btn btn-default incident-show-btn" data-incident-id="${incident._id}">View</button>
      </li>
      </ul>
      `)
      $("#show-data").append(indexIncident); //put at end
    }
  }); //closes document
