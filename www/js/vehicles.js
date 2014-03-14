function vehiclesInitialize() {
  var User = Ridekeeper.user;

  $('#plus-button').click(function(){
    window.location.hash = "new-vehicle";
  });

  User.getUserVehicleList(function(vehicleArray) {

    var vehicles = "";

    for (var i = 0; i < vehicleArray.length; i++) {

      var vehicle = vehicleArray[i];
      var vehicleText = vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
      var vehicleHTML = '<div class="list-item" onclick="setVehiclePage(\''+ vehicle.objectId + '\', false)">'
                        + vehicleText + '</div>';

      vehicles += vehicleHTML;
    }

    $('#vehicle-list').html(vehicles);
  });
}
