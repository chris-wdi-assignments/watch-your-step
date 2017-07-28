function addTwoDays(now){
  var twoDaysMilliseconds = now + 172800000;
  return new Date(twoDaysMilliseconds);
}

function getCoordinates(address, callback) {
  // because of .call(), `this` will be modal
  const currentForm = this;
  const parameters = "address=" + address;
  $.ajax({
    method: "GET",
    url: "https://maps.googleapis.com/maps/api/geocode/json?" + parameters,
    success: function (geocoderResults) {
      const results = geocoderResults.results;
      if (geocoderResults.status === 'ZERO_RESULTS' || results.length === 0) {
        $(currentForm).prepend(`
          <div class="alert alert-danger alert-dismissible fade in">
            <button type="button" class="close" data-dismiss="alert">
              <span>&times;</span>
            </button>
            <span class="glyphicon glyphicon-exclamation-sign"></span>
            Address not found.
          </div>
        `);
      } else callback(geocoderResults);
    },
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

  // trigger edit
  $('#incident-edit-btn').on('click', function (e) {
    const id = $('#update-incident').attr('data-incident-id');
    // update data from db
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
    });
  });

  //PUT
  $('#update-form').on('submit', function (e) {
    e.preventDefault();
    const id = $('#update-incident').attr('data-incident-id');
    const data = {
      // read data from form
      address: $('#edit-address').val(),
      category: $('#edit-category').val().toLowerCase(),
      // auto set date & expiration
      date: new Date(),
      expiration: addTwoDays(Date.now())
    };
    $.ajax({
      method: "put",
      url: `/api/incidents/${id}`,
      data: data,
      success: function (incident) {
        $('#update-incident').modal('hide');
        // flip modal to initial state
        $('.show-elements').show();
        $('.edit-elements').hide();
      }
    });
  });

  //DELETE
  $('#incident-delete-btn').on('click', function (e) {
    // we embedded this data when the pin was first clicked
    const id = $('#update-incident').attr('data-incident-id');

    $.ajax({
      method: "DELETE",
      url: "/api/incidents/" + id,
      success: function () {
        $('#update-incident').modal('hide');
        const marker_id = $('#update-incident').attr('data-marker-index');
        markers[marker_id].setMap(null);  // remove pin off the map
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
    getCoordinates.call(document.getElementById('new-incident'), address, function (geocoderRes) {
      // the .call() will bind the function to the form, so we can draw alert
      const results = geocoderRes.results;
      let formData = {
        address: results[0].formatted_address,
        category: $('#new-category').val(),
        latitude: results[0].geometry.location.lat,
        longitude: results[0].geometry.location.lng
      };

      $.ajax({
        method: 'POST',
        url: '/api/incidents',
        data: formData,
        success: function (newIncident) {
          renderIncident(newIncident);
          const index = markers.length - 1;
          const createdMarker = markers[index];
          addClickHandlerToMarker(createdMarker, index);
          $('#create-incident').modal('hide');
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
