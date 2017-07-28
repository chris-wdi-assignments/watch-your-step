function addTwoDays(now){
  var twoDaysMilliseconds = now + 172800000;
  return new Date(twoDaysMilliseconds);
}

function getCoordinates(address, callback) {
  const parameters = "address=" + address;
  $.ajax({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?" + parameters,
    success: callback,
    error: (err) => {
      throw new Error(err)
    }
  })
}

$(document).ready(function () {

  // render map on DOM
  const map = new google.maps.Map(document.getElementById('show-data'), {
    center: {
      lat: 37.783,
      lng: -122.42
    },
    zoom: 16
  });

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
    $.ajax({
      method: "put",
      url: `/api/incidents/${id}`,
      data: data,
      success: function (incident) {
        $(`.incident-show-btn[data-incident-id="${id}"]`).closest('.list-group').remove();
        $('#update-incident').modal('hide');
        $('.show-elements').show();
        $('.edit-elements').hide();
      }
    });
  });

  //DELETE
  $('#incident-delete-btn').on('click', function (e) {
    const id = $('#update-incident').attr('data-incident-id');

    $.ajax({
      method: "DELETE",
      url: "/api/incidents/" + id,
      success: function () {
        $('#update-incident').modal('hide');
        const marker_id = $('#update-incident').attr('data-marker-index');
        markers[marker_id].setMap(null);  // remove pin off the map
        //$(`.incident-show-btn[data-incident-id="${id}"]`).closest('.list-group').remove();
      },
      error: function (err) {
        console.log('There was an error!', 'err');
      }
    })
  })

  // POST
  $('#new-incident').on('submit', function(e) {
    e.preventDefault();

    let address = $('#new-address').val();
    getCoordinates(address, function (geocoderRes) {
      let formData = {
        address: geocoderRes.results[0].formatted_address,
        category: $('#new-category').val(),
        latitude: geocoderRes.results[0].geometry.location.lat,
        longitude: geocoderRes.results[0].geometry.location.lng
      };

      $.ajax({
        method: 'POST',
        url: '/api/incidents',
        data: formData,
        success: function (newIncident) {
          $('#create-incident').modal('hide');
          renderIncident(newIncident);
          const index = markers.length - 1;
          const createdMarker = markers[index];
          addClickHandlerToMarker(createdMarker, index);
          $("#new-incident").trigger("reset");
        }
      });
    });
  }) // closes onsubmit handler

  //GET - INDEX
  let markers = [];
  $.ajax({
    method: 'GET',
    url: '/api/incidents',
    success: function (incidents) {
      renderMultipleIncidents(incidents);
      markers.forEach(function (marker, index) {
        addClickHandlerToMarker(marker, index);
      })
    }
  });

  function addClickHandlerToMarker(marker, index) {
    google.maps.event.addListener(marker, 'click', function (e) {
      $('.show-elements').show();
      $('.edit-elements').hide();
      const id = marker.title;
      $('#update-incident').attr('data-incident-id', id).attr('data-marker-index', index);
      $.ajax({
        method: 'GET',
        url: `/api/incidents/${id}`,
        success: function (incident) {
          $('.show-address').text(incident.address);
          $('.show-category').text(incident.category);
          $('.show-date').text(incident.date);
        },
        error: function (err) {throw new Error(err);}
      })
      $('#update-incident').modal('show');
    })
  }

  function renderMultipleIncidents(incidents) {
    // Create Markers
    incidents.incidents.forEach(function(potato) {
      renderIncident(potato);
    });
  } //closes renderMultipleIncidents function

  function renderIncident(incident) {
    markers.push(new google.maps.Marker({
      position: {lat: incident.latitude, lng: incident.longitude},
      map: map,
      title: incident._id
    }));
  }
}); //closes document
