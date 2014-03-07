var newVehicle = {
  initialize : function() {
    $("#create").click(function() {
      var make = $("#make").val();
      var model = $("#model").val();
      var unvalidatedYear = $("#year").val();
      var license = $("#license").val();

      var errors = []; // Contains errors with user input
      var year = newVehicle.validateYear(unvalidatedYear);

      // Populate the error list
      if (!make){
        newVehicle.pushError(errors, "make", "A vehicle make must be inputted");
      }
      if (!model) {
        newVehicle.pushError(errors, "model", "A vehicle model must be inputted");
      }
      if (typeof year === "string") {
        newVehicle.pushError(errors, "year", year);
      }
      if (!license) {
        newVehicle.pushError(errors, "license", "A vehicle license plate must be inputted");
      }

      newVehicle.setIdsToBlack(['year', 'make', 'model', 'license'])

      if (errors.length == 0) {
        // If there are no errors, add vehicle to server
        var User = Ridekeeper.user;
        var successFun = function(newVehicle) {
          window.open("#/vehicles", "_self");
        }
        var errorFun = function(newVehicle, error) {
          $('#create-text').html('Failed to add vehicle.<br>Error Code: ' + error.code);
          $('#create-text').css('color', '#f00');
        }
        if (ridekeeper.currentPage == "new-vehicle") {
          User.addVehicle(license, make, model, year, successFun, errorFun);
          $('#create-text').html('Adding vehicle...');
          $('#create-text').css('color', '');
        } else {
          var fields = [{field: "make",    value: make},
                        {field: "model",   value: model},
                        {field: "year",    value: year},
                        {field: "license", value: license}];
          User.updateVehicle(pageVehicleId, fields, successFun, errorFun);
          $('#create-text').html('Updating vehicle...');
          $('#create-text').css('color', '');
        }
      } else {
        // Display each error on the top, and set each invalid field to red
        $('#error-list').empty();
        $('#error-list').css("display", "block");
        for (var i = 0; i < errors.length; i++) {
          $('#error-list').append("<li>" + errors[i].error + "</li>");
          $('#' + errors[i].field + '-text').css("color", "#f00");
        }
        document.getElementById("error-list").scrollIntoView(); // Scroll to errors
      }

    });
  },

  /* Returns a string if there is an error parsing the year, or a whole number
     if the year is successfully parsed */
  validateYear : function(unvalidatedYear) {
    if (!unvalidatedYear) {
      return "A vehicle year must be inputted";
    }
    var year = parseInt(unvalidatedYear);
    if (isNaN(year)) {
      return "Year must be a number";
    } else if (year < 1900) {
      return "Year must be at least 1900";
    }
    return year;
  },

  pushError : function(errorList, errorField, errorString) {
    errorList.push({
      field: errorField,
      error: errorString,
    });
  },

  // Sets the color of each id in idList to its default
  setIdsToBlack : function(idList) {
    for (var i = 0; i < idList.length; i++) {
      $('#' + idList[i] + '-text').css("color", '');
    }
  }

}
