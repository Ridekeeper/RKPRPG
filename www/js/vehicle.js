function Vehicle() 
{


  this.initParseSession = function (sessionToken)
  {
    Parse.initialize(ParseApplicationId, "Ov2QPnkFZJ6UkrewLGck9fsyqaakk89RwT1w7VgQ");
    return true;
  };

  this.addVehicle = function (license, make, model,ownerId, year)
  {
  	var Vehicle = Parse.Object.extend("Vehicle");
  	var newVehicle = new Vehicle();
  	newVehicle.set("license", license);
  	newVehicle.set("make", make);
  	newVehicle.set("model", model);
  	newVehicle.set("ownerId", ownerId);
  	newVehicle.set("year", year);

  	newVehicle.save(null, 
  	{
      success: function(newVehicle) 
      {
        // Execute any logic that should take place after the object is saved.
        alert('New object created with objectId: ' + newVehicle.id);
      },
      error: function(newVehicle, error) 
      {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and description.
        alert('addVehicle failed');
      }
    });

  }

  this.getUserVehicleList = function (userId)
  {
  	//Lists the user's vehicles
  	var Vehicle = Parse.Object.extend("Vehicle");
  	var query = new Parse.Query(Vehicle);
  	query.equalTo("ownerId", userId);
  	query.find({
      success: function(results) 
      {
        alert("Successfully retrieved " + results.length + " vehicles.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) 
        {
          var object = results[i];
          alert(object.id + ' - ' + object.get('make') + "," + object.get('model'));
        }
        return results;
      },
      error: function(error) 
      {
        alert("Error: getUserVehicleList failed");
      }
    });

  	///////Ridekeeper.user
  };

  this.getStolenVehicleList = function ()
  {
  	//List all stolen vehicles
  	var Vehicle = Parse.Object.extend("Vehicle");
  	var query = new Parse.Query(Vehicle);
  	query.equalTo("alertLevel", "STOLEN");
  	query.find({
      success: function(results) 
      {
        alert("Successfully retrieved " + results.length + " stolen vehicles.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < results.length; i++) 
        {
          var object = results[i];
          alert(object.id + ' - ' + object.get('make') + "," + object.get('model'));
        }
        return results;
      },
      error: function(error) 
      {
        alert("Error: getStolenVehicleList failed");
      }
    });

  };

  this.getVehicle = function (objectId)
  {
  	////Currently alerts the vehicle make haha
  	//var myId = "g5teWNiFl5";
  	var Vehicle = Parse.Object.extend("Vehicle");
	var query = new Parse.Query(Vehicle);
	query.get(objectId, {
	  success: function(object) {
      // object is an instance of Parse.Object.
        alert(object.get("make") + "," + object.get("model"));
  	  },

  	  error: function(object, error) {
      // error is an instance of Parse.Error.
  	  }
    });
  };

}