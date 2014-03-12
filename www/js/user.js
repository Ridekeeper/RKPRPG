function convertUser(parseUser) {
  var userObject = {};
  const fields = ["username", "email", "name", "phone"];
  for (var i = 0; i < fields.length; i++) {
    userObject[fields[i]] = parseUser.get(fields[i]);
  }
  return userObject;
}

function convert(parseObject) {
  var vehicleObject = {};
  const fields = ["license", "make", "model", "ownerId", "pos", "year"];
  for (var i = 0; i < fields.length; i++) {
    vehicleObject[fields[i]] = parseObject.get(fields[i]);
  }
  vehicleObject["objectId"] = parseObject.id;
  geoPoint = parseObject.get("pos");
  if (geoPoint){
    vehicleObject["location"] = new google.maps.LatLng(geoPoint.latitude, geoPoint.longitude);
  }
  return vehicleObject;
}

function user() {

  /*this.initParseSession = function (sessionToken)
  {
    $.parse.init({  
      session_token: sessionToken
    });
  
    return true;
  }; */

  Parse.initialize(ParseApplicationId, "Ov2QPnkFZJ6UkrewLGck9fsyqaakk89RwT1w7VgQ");


  this.resetPassword = function () {
    $.parse.requestPasswordReset(
      $("#reset_username").val(), 
      function(e) // Success
      {
        console.log("success:",e);  
        window.location.hash = "signin";  
      
        setTimeout(function() 
        { 
          showMessage("Success! Instructions for resetting your password have been sent to your email address successfully! Don't forget to check your spam.");
          
        }, 1);
      
      },
      function(e) // Fail
      {
        window.location.hash = "forgotpass";
        doFail(e);
      }
    );
  };

  this.isValidEmail = function (email)
  {
    return /^[a-z0-9]+([-._][a-z0-9]+)*@([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,4}$/.test(email)
        && /^(?=.{1,64}@.{4,64}$)(?=.{6,100}$).*/.test(email);
  };

/////////////////////////////////////////////
  this.signUp = function (username, password, name, email, phone) {
    var User = new Parse.User();
    User.set("username", username);
    User.set("password", password);
    User.set("name", name);
    User.set("email", email);
    User.set("phone", phone);
    //user.save();
    // other fields can be set just like with Parse.Object
    User.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        Ridekeeper.registration.goToLogin();
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  this.login = function (username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
        alert("Login success!");
        window.location.hash = 'profile';
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("Login failed");
      }
    });
  };

  this.logout = function () {
    Parse.User.logOut();
    var currentUser = Parse.User.current();  // this will now be null
    if (currentUser)
      alert("Error, user logout failure.");
    else
      window.location.hash = 'login';

  }

  this.currentUser = function () {
    var currentUser = Parse.User.current();
    //alert(currentUser.id);
    if (currentUser) {
      // do stuff with the user
      return currentUser;
    } else {
      return NULL;
      // show the signup or login page
    }
  };

  /*this.getUserById = function (objectId, fun) {
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.get(objectId, {
      success: function(object) {
        // object is an instance of Parse.Object.
        //alert(object.get("username") + ", " + object.get("email") + ", " + object.get("name") + ", " + object.get("phone"));
        var userObject = convertUser(object);
        fun(userObject);
      },

      error: function(object, error) {
      // error is an instance of Parse.Error.
      }
    });
  };*/

  this.removeUser = function (objectId) {
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.get(objectId, {
      success: function(object) {
        // object is an instance of Parse.Object.
          object.destroy({
            success: function(object) {
              // The object was deleted from the Parse Cloud.
              //alert(object.get("make") + "," + object.get("model") + "was removed.");
            },
            error: function(object, error) {
              // The delete failed.
              // error is a Parse.Error with an error code and description.
              alert('Error: object.destroy in removeUser failed');
            }
        });
      },
      error: function(object, error) {
        // error is an instance of Parse.Error.
        alert('Error: Query.get in removeUser failed');
      }
    });
  };

  this.updateUser = function(name, email, phone) {
    Ridekeeper.user.currentUser().set("name", name);
    Ridekeeper.user.currentUser().set("email", email);
    Ridekeeper.user.currentUser().set("phone", phone);
  };

  this.addVehicle = function (license, make, model, year, successFun, errorFun)
  {
    var userId = Ridekeeper.user.currentUser().id;
    var Vehicle = Parse.Object.extend("Vehicle");
    var newVehicle = new Vehicle();
    newVehicle.set("license", license);
    newVehicle.set("make", make);
    newVehicle.set("model", model);
    newVehicle.set("ownerId", userId);
    newVehicle.set("year", year);

    newVehicle.save(null, 
    {
      success: successFun,
      error: errorFun
    });
  };

  
  this.removeVehicle = function (objectId, successFun, errorFun)
  {
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.get(objectId, {
      success: function(object) {
        // object is an instance of Parse.Object.
          object.destroy({
            success: successFun,
            error: errorFun
        });
      },

      error: errorFun
    });   

  };

  this.getUserVehicleList = function (fun)
  {
    //Lists the user's vehicles
    var userId = Ridekeeper.user.currentUser().id;
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.equalTo("ownerId", userId);
    query.find({
      success: function(results) 
      {
        // Do something with the returned Parse.Object values
        var vehicleArray = [];
        for (var i = 0; i < results.length; i++) {
          vehicleArray.push(convert(results[i]));
        }
        fun(vehicleArray);
      },
      error: function(error) 
      {
        alert("Error: getUserVehicleList failed");
      }
    });
    ///////Ridekeeper.user
  };

  this.getStolenVehicleList = function (latitude, longitude, fun)
  {
    //(1/60) of a degree is about a mile
    var southwestOfUser = new Parse.GeoPoint(latitude-(1/60), longitude-(1/60));
    var northeastOfUser = new Parse.GeoPoint(latitude+(1/60), longitude+(1/60));
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.equalTo("alertLevel", "STOLEN");
    query.withinGeoBox("pos", southwestOfUser, northeastOfUser);
    query.find({
      success: function(results) 
      {
        var vehicleArray = [];
        for (var i = 0; i < results.length; i++) {
          vehicleArray.push(convert(results[i]));
        }
        fun(vehicleArray);
      },
      error: function(error) 
      {
        alert("Error: getStolenVehicleList failed");
      }
    });
  };
  
  this.setVehiclePosition = function(lat, long, objectId) 
  {
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.get(objectId, {
      success: function(object) {
        var pos = new Parse.GeoPoint({latitude: lat, longitude: long});
        object.set("pos", pos);
        object.save();
      },
      error: function() {
        alert("Error in setVehicleStolen");
      }
    });
  };

  this.setVehicleStolen = function(objectId)
  {
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.get(objectId, {
      success: function(object) {
        object.set("alertLevel", "STOLEN");
        object.save();
        alert(object.id + "was set to " + object.get("alertLevel"));
      },
      error: function() {
        alert("Error in setVehicleStolen");
      }
    });
  };

  this.getVehicle = function (objectId, successFun, errorFun)
  {
    ////Currently alerts the vehicle make haha
    //var myId = "g5teWNiFl5";
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.get(objectId, {
      success: function(object) {
        // object is an instance of Parse.Object.
        //alert(object.get("make") + "," + object.get("model"));
        var vehicleObject = convert(object);
        successFun(vehicleObject);
      },

      error: errorFun
    });
  };

  this.updateVehicle = function(vehicleId, newValues, successFun, errorFun) {
    var Vehicle = Parse.Object.extend("Vehicle");
    var query = new Parse.Query(Vehicle);
    query.equalTo("objectId", vehicleId);
    query.find().then(function(list) {
        if (list.length == 0) {
          return Parse.Promise.error(new Parse.Error(1,"Vehicle not found"));
        }
        var object = list[0];
        for (var i = 0; i < newValues.length; i++) {
          object.set(newValues[i].field, newValues[i].value);
        }
        return object.save();
      }).then(function(object) {
        successFun();
      }, function(error) {
        errorFun(undefined, error);
      });

  };

//Dont think these are used
  this.updateVehicleLicense = function(newLicense) {
    this.updateVehicle("license", newLicense);
  };

  this.updateVehicleMake = function(newMake) {
    //Check if valid username
    this.updateVehicle("make", newMake);
  };

  this.updateVehicleModel = function(newModel) {

    this.updateVehicle("model", newModel);
  };

  this.updateVehicleYear = function(newYear) {

    this.updateVehicle("year", newYear);
  };
}

