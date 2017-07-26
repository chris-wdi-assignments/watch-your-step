


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
      //do something
      // modal hide
      //list.append TODO
    }
  })
}); //closes document
