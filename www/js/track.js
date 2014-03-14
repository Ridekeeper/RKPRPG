var directionsDisplay;
var directionsService;
var oldCurrentLoc = null;

function trackInitialize() {

  $('#back').click(function() {
    window.open("#/vehicle-map", "_self");
  });

  $('#top-bar h1').text('Vehicle: ' + getVehicleTitle(currentVehicle));
  
  var errorFun = function(vehicleObject, error) {
    alert('Error retreiving vehicle.\nError Code: ' + error.code);
    window.open("#/vehicles", "_self");
  }
  Ridekeeper.user.getVehicle(pageVehicleId, function(vehicleObject) {
    mapInitialize(vehicleObject.location);
  }, errorFun);
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

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsDisplay.setMap(googleMap);
  directionsService = new google.maps.DirectionsService();

  updateMap();
}

//Called every few seconds to update the vehicle position on the map
var curMarker = null;
function updateMap() {
  
  Ridekeeper.user.getVehicle(pageVehicleId, function(object) {

    $('#map-message').css('display', 'none');

    if (!object.location) {
      $('#map-message').css('display', 'block');
      $('#map-message').text('Error retrieving vehicle location');
      return;
    }

    if (Ridekeeper.currentPage == 'track') {
      getCurLocation(
        function(latitude, longitude) {
          getRoute(object, latitude, longitude);
        }, 
        function( error ) {
          $('#map-message').css('display', 'block');
          $('#map-message').text('Error retrieving user location');
        }
      );

    } else {
      showVehicleLocation(object);
      intervalId = setTimeout(updateMap, 3000);
    }
  }, function(object, error) {
    $('#map-message').css('display', 'block');    
  })
  
}

function routeUpdated(vehicleLoc, userLoc) {
  return oldPos == null || oldCurrentLoc == null
         || !oldPos.equals(vehicleLoc) || !oldCurrentLoc.equals(userLoc);
}

function getRoute(object, latitude, longitude) {

  var userLoc = new google.maps.LatLng(latitude,longitude);

  if (routeUpdated(object.location, userLoc)) {

    directionsReq = {
      origin: userLoc,
      destination: object.location,
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      provideRouteAlternatives: false,
    }

    oldPos = object.location;
    oldCurrentLoc = userLoc;

    directionsService.route(directionsReq, function(result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(result);
      } else {
        $('#map-message').css('display', 'block');
        $('#map-message').text('Error retrieving directions to vehicle');
      }
      if (Ridekeeper.currentPage == "track") {
        intervalId = setTimeout(updateMap, 10000);
      }
    });
  } else {
    if (Ridekeeper.currentPage == "track") {
      intervalId = setTimeout(updateMap, 10000);
    }    
  }

}

function showVehicleLocation(object) {

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
}

// Stub function which current retrieves hardcoded position after 1 second
function getCurLocation(successFun, errorFun) {
  if (navigator.geolocation) {
    function returnPosition(position) {
      successFun(position.coords.latitude, position.coords.longitude);
    };
    navigator.geolocation.getCurrentPosition(returnPosition, errorFun, 
      {enableHighAccuracy:true, timeout: 5000});
  }
  //setTimeout(function(){successFun(34.038509, -118.445667);}, 1000);
}
