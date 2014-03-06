function stolenInitialize() {
  var User = Ridekeeper.user;

  User.getStolenVehicleList(function(vehicleArray) {
    for (var i = 0; i < vehicleArray.length; i++) {

      var vehicle = vehicleArray[i];
      var vehicleText = vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
      var vehicleHTML = '<div class="list-item" onclick="setVehiclePage(1)">'
                        + vehicleText + '</div>';

      $('#stolen-list').append(vehicleHTML);
    }
  });
}

