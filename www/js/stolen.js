function stolenInitialize() {
  var User = Ridekeeper.user;
  var latitude;
  var longitude;
  //Sends users location to getStolenVehicleList and then displays the list
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    User.getStolenVehicleList(latitude, longitude, function(vehicleArray) {
      for (var i = 0; i < vehicleArray.length; i++) {

        var vehicle = vehicleArray[i];
        var vehicleText = vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
        var vehicleHTML = '<div class="list-item" onclick="setVehiclePage(\''+ vehicle.objectId + '\', true)">'
                            + vehicleText + '</div>';
        $('#stolen-list').append(vehicleHTML);
      }
    });
  });  
  
}

