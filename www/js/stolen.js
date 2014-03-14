function stolenInitialize() {
  var User = Ridekeeper.user;

  showLoader();

  User.getStolenVehicleList(function(vehicleArray) {
	
    var stolenvehicles = "";

    for (var i = 0; i < vehicleArray.length; i++) {

      var vehicle = vehicleArray[i];
      var vehicleText = vehicle.year + ' ' + vehicle.make + ' ' + vehicle.model;
      var vehicleHTML = '<div class="list-item" onclick="setVehiclePage(\''+ vehicle.objectId + '\', true)">'
                        + vehicleText + '</div>';
      stolenvehicles += vehicleHTML;
    }
      $('#stolen-list').html(stolenvehicles);

      hideLoader();
  });

}

