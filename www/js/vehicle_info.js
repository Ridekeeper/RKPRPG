var googleMap; // identifier for the Google Map
var currentVehicleId; // identifier for the page's vehicle
var intervalId = null; //identifier for setInterval()

/* Initializes the Google Map. Called once every time a vehicle page is loaded */
function mapInitialize() {
  var mapOptions = {
    center: getVehiclePosition(currentVehicleId),
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
  if (currentVehicleId == 1) {
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
  
  pos = getVehiclePosition(currentVehicleId);
  
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
  currentVehicleId = vehicleIdentifier;
  window.location = "#/vehicle-map";
}
