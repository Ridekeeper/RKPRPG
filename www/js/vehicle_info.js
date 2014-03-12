var googleMap; // identifier for the Google Map
var pageVehicleId; // identifier for the page's vehicle
var currentVehicle; // contains page's vehicle
var intervalId = null; //identifier for setInterval()
var oldPos = null; //Stores the position of the vehicle last time it was updated
var vehicleStolen; //Indicates whether currentVehicle is stolen

function vehicleInfoInitialize() {
  var errorFun = function(vehicleObject, error) {
    alert('Error retreiving vehicle.\nError Code: ' + error.code);
    window.open("#/vehicles", "_self");
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
    window.open("#/vehicles", "_self");
  });

  if (vehicleStolen) {
    $('input').attr('readonly', true);
    $('#track').css('display', 'block'); // Show track vehicle button
    $('#enter-chatroom').css('display', 'block'); // Show enter chatroom button
  
    $('#track').click(function() {
      window.open('#/track', '_self'); // Page does not yet exist
    });
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

/* Initializes the Google Map. Called once every time a vehicle page is loaded */
function mapInitialize(location) {
  var mapOptions = {
    center: location,
    zoom: 20,
    disableDefaultUI: true,
    draggable: false,
    mapTypeControl: true,

  };
  googleMap = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions);
  intervalId = setInterval(updateMap, 3000);
  updateMap();
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


//Called every few seconds to update the vehicle position on the map
var curMarker = null;
function updateMap() {
  
  Ridekeeper.user.getVehicle(pageVehicleId, function(object) {
    $('#map-message').css('display', 'none');

    if (!object.location) {
      $('#map-message').css('display', 'block');
      return  
    }

    var pos = object.location;

    // Only change map position if it changed
    if (oldPos == null || !oldPos.equals(pos)) {
      if (curMarker != null) {
        curMarker.setMap(null);
      }
      curMarker = new google.maps.Marker({
        position: pos,
        map: googleMap,
      });
      googleMap.setCenter(pos);
      oldPos = pos;
    }
    
  }, function(object, error) {
    $('#map-message').css('display', 'block');    
  })
  
}

// Sets up page when partial is loaded
function setVehiclePage(vehicleIdentifier, stolen) {
  pageVehicleId = vehicleIdentifier;
  vehicleStolen = stolen;
  window.open("#/vehicle-map", "_self");
}
