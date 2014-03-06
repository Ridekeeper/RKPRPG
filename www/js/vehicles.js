function vehiclesInitialize() {
  var User = Ridekeeper.user;

  $('#plus-button').click(function(){
    window.location.hash = "new-vehicle";
  });

  User.getUserVehicleList(function(vehicleArray) {
    for (var i = 0; i < vehicleArray.length; i++) {

      var vehicle = vehicleArray[i];
      var vehicleText = vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
      var vehicleHTML = '<div class="list-item" onclick="setVehiclePage(1)">'
                        + vehicleText + '</div>';

      $('#vehicle-list').append(vehicleHTML);
    }
  });
}
