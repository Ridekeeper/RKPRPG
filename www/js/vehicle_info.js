var googleMap; // identifier for the Google Map
var pageVehicleId; // identifier for the page's vehicle
var currentVehicle; // contains page's vehicle
var intervalId = null; //identifier for setInterval()
var oldPos = null; //Stores the position of the vehicle last time it was updated
var vehicleStolen; //Indicates whether currentVehicle is stolen

function vehicleInfoInitialize() {
  var errorFun = function(vehicleObject, error) {
    alert('Error retreiving vehicle.\nError Code: ' + error.code);
    if (vehicleStolen) {
      window.open("#/vehicles-stolen", "_self");
    } else {
      window.open("#/vehicles", "_self");
    }
  }
  Ridekeeper.user.getVehicle(pageVehicleId, function(vehicleObject) {
    currentVehicle = vehicleObject;
    $('#top-bar h1').text('Vehicle: ' + getVehicleTitle(vehicleObject));
    $('#make').val(vehicleObject.make);
    $('#model').val(vehicleObject.model);
    $('#year').val(vehicleObject.year);
    $('#license').val(vehicleObject.license);
    if (!vehicleObject.location) {
      $('#map-message').css('display', 'block');    
    } else {
      mapInitialize(vehicleObject.location);
    }
  }, errorFun);

  $('#back').click(function() {
    if (vehicleStolen) {
      window.open("#/vehicles-stolen", "_self");
    } else {
      window.open("#/vehicles", "_self");
    }
  });

  $('#track').click(function() {
    window.open('#/track', '_self');
  });

  if (vehicleStolen) {
    $('input').attr('readonly', true);
    $('#enter-chatroom').css('display', 'block'); // Show enter chatroom button
  
    $('#enter-chatroom').click(function() {
      window.open('#/chatroom', '_self'); // Page does not yet exist
    });

  } else {
    newVehicle.initialize();

    $('#remove').css('display', 'block'); // Show remove vehicle button
    $('#remove').click(function() {
      var deleteVehicle = confirm('Do you wish to delete the vehicle?');
      if (deleteVehicle) {
        var successFun = function() {
          window.open('#/vehicles', '_self');
        }
        var errorFun = function(object, error) {
          $('#create-text').html('Failed to remove vehicle.<br>Error Code: ' + error.code);
          $('#create-text').css('color', '#f00');
          document.getElementById("create-text").scrollIntoView();
        }
        Ridekeeper.user.removeVehicle(pageVehicleId, successFun, errorFun);
          $('#create-text').html('Removing vehicle...');
          $('#create-text').css('color', '#');
          document.getElementById("create-text").scrollIntoView();
      }
    });

  }

}

//Test function that is no longer used
var curPos = 0;
function getVehiclePosition() {
  var pos;
  if (pageVehicleId == 1) {
    if (curPos == 0) {
      pos = new google.maps.LatLng(34.068509, -118.445546);
    } else {
      pos = new google.maps.LatLng(34.068509, -118.445667);
    }
  } else {
    if (curPos == 0) {
      pos = new google.maps.LatLng(34.069465, -118.445900);
    } else {
      pos = new google.maps.LatLng(34.069491, -118.445806);
    }
  } 
  curPos = (curPos + 1) % 2;
  return pos
}

// Sets up page when partial is loaded
function setVehiclePage(vehicleIdentifier, stolen) {
  pageVehicleId = vehicleIdentifier;
  vehicleStolen = stolen;
  window.open("#/vehicle-map", "_self");
}
