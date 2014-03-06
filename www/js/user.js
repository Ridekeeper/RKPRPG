function convertUser(parseUser) {
  var userObject = {};
  const fields = ["username", "email", "name", "phone"];
  for (var i = 0; i < fields.length; i++) {
    userObject[fields[i]] = parseUser.get(fields[i]);
  }
  return userObject;
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


  this.resetPassword = function () 
  {
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
  }

  this.currentUser = function () {
    var currentUser = Parse.User.current();
    alert(currentUser.id);
    if (currentUser) {
      // do stuff with the user
      return currentUser;
    } else {
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

  this.removeUser = function (objectId)
  {
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

//Update doesnt work currently
  this.updateUser = function(field, newVal) {
    var currentUserId = "NzvhMJDNZS";
    var User = Parse.Object.extend("User");
    var query = new Parse.Query(User);
    query.equalTo("objectId", currentUserId);
    query.first({
      success: function(object) {
        object.set(field, newVal);
        object.save();
      }
    });

  };

  this.updateUsername = function(newUsername) {
    //Check if valid username
    this.updateUser("username", newUsername);
  };

  this.updateUserEmail = function(newEmail) {

    this.updateUser("email", newEmail);
  };

  this.updatePhone = function(newPhone) {

    this.updateUser("phone", newPhone);
  };

  this.updateName = function(newName) {

    this.updateUser("name", newName);
  };

}
