var newVehicle = {
  initialize : function() {
    $("#create").click(function() {
      var make = $("#make").val();
      var model = $("#model").val();
      var year = parseInt($("#year").val());
      var license = $("#license").val();

      //alert("create vehicle")

      var vehicle = new Vehicle();
      //vehicle.addVehicle(license, make, model, "testowner", year);
      window.open("#/vehicles", "_self");
    });
  },

}
