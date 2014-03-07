var googleMap; // identifier for the Google Map
var pageVehicleId; // identifier for the page's vehicle
var currentVehicle; // contains page's vehicle
var intervalId = null; //identifier for setInterval()

function vehicleInfoInitialize() {
  var errorFun = function(vehicleObject, error) {
    alert('Error retreiving vehicle.\nError Code: ' + error.code);
    window.open("#/vehicles", "_self");
  }
  Ridekeeper.user.getVehicle(pageVehicleId, function(vehicleObject) {
    mapInitialize();
    $('#make').val(vehicleObject.make);
    $('#model').val(vehicleObject.model);
    $('#year').val(vehicleObject.year);
    $('#license').val(vehicleObject.license);
  }, errorFun);

  newVehicle.initialize();

}

/* Initializes the Google Map. Called once every time a vehicle page is loaded */
function mapInitialize() {
  var mapOptions = {
    center: getVehiclePosition(pageVehicleId),
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

//Stub function that returns vehicle location
var curPos = 0;
function getVehiclePosition(vehicleId) {
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
  
  pos = getVehiclePosition(pageVehicleId);
  
  if (curMarker != null) {
    curMarker.setMap(null);
  }
  curMarker = new google.maps.Marker({
    position: pos,
    map: googleMap,
    
  });
  
  googleMap.setCenter(pos);
  
}

// Sets up page when partial is loaded
function setVehiclePage(vehicleIdentifier) {
  pageVehicleId = vehicleIdentifier;
  window.location = "#/vehicle-map";
}
