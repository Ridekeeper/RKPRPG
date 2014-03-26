function profile() {

	this.initialize = function() {
		var User = Ridekeeper.user.currentUser();

		if (User) {
		  var name = User.get("name");
		  var email = User.get("email");
		  var phone = User.get("phone");

      if (name && email && phone)
      {
		    $("#name").val(name);
		    $("#email").val(email);
		    $("#phone").val(phone);
      } else {
        // For some reason cache is empty, login again
        Ridekeeper.user.logout();
      }

      // Set user photo if it exists
      var UserObject = Parse.Object.extend("User");
      var query = new Parse.Query(UserObject);
      query.get(User.id, {
        success: function(user) {
          // The object was retrieved successfully.

          var picture = user.get("avatar");
          console.log(picture);
          if (picture){
            document.getElementById("profile-image").src = picture.url();
            console.log("Profile image set from parse");
          } else {  
            console.log("User profile picture doesn't exist, continue with default");
          }

        },
        error: function(object, error) {
          console.log("Failed to query for user photo, using default.  ERROR: " + error.message);
        }
      });
		}
		  // Register buttons
		$('#change-profile-image-button').click(function(){
      Ridekeeper.image_upload.newPicture(onPicSuccess)});
		$('#logout-button').click(function(){Ridekeeper.user.logout()});
		$('#save-button').click(function(){Ridekeeper.profile.saveProfile()});
	}

    this.saveProfile = function() {
        var User = Ridekeeper.user.currentUser();
        
        User.set("name", $("#name").val());
		    User.set("email", $("#email").val());
		    User.set("phone", $("#phone").val());        
        User.save(null, {
        	success: function(User) {
        		alert("Save Successful");
        	},
        	error: function(user, error) {
        		alert("Save Unsuccessful:\n"+error.message);
        		console.log(error.message);
        	}
        });
    }

  function onPicSuccess(base64, imageURI){
    var file = new Parse.File("avatar.jpg", { base64: base64 });

    if (file == null)
    {
      showMessage('Invalid picture, please try again');
    }

    file.save().then(function() {
      var User = Ridekeeper.user.currentUser();
      User.set("avatar",  file);
      User.save(null, {
        success: function(User) {
          showMessage("Picture changed");
          $('#profile-image').attr('src',imageURI); 
        },
        error: function(user, error) {
          showMessage("Picture could not be uploaded:\n"+error.message);
          console.log(error.message);
        }
      });
    }, function(error)  {
      onPicFail(error);
      return;
    });
	}

}
