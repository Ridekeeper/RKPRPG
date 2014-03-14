function profile() {

	this.initialize = function() {
		var User = Ridekeeper.user.currentUser();
		if (User) {
		  var name = User.get("name");
		  var email = User.get("email");
		  var phone = User.get("phone");
		  $("#name").val(name);
		  $("#email").val(email);
		  $("#phone").val(phone);

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
		$('#change-profile-image-button').click(function(){Ridekeeper.profile.newPicture()});
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

  function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/jpg');
        callback.call(this, dataURL);
        canvas = null; 
    };
    img.src = url;
  }

  function onPicSuccess(imageURI){
    convertImgToBase64(imageURI, function(base64){
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
    });
	}

	function onPicFail(message){
		showMessage('Failed to set picture: ' + message);
	}
	
	function newGalleryPicture() {
	navigator.camera.getPicture(onPicSuccess, onPicFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: true,
    targetWidth: 200,
    targetHeight: 200,
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    saveToPhotoAlbum: false
    });
	}

	function newCameraPicture() {
	navigator.camera.getPicture(onPicSuccess, onPicFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI,
    allowEdit: true,
    targetWidth: 200,
    targetHeight: 200,
    sourceType: Camera.PictureSourceType.CAMERA,
    saveToPhotoAlbum: false
    });
	}

	function sourceSelected( buttonIndex ) {
		if (buttonIndex == 1)
			newCameraPicture();

		if (buttonIndex == 2)
			newGalleryPicture();
		// Do nothing, the user exited the dialog
	}

	this.newPicture = function() {
			// Prompt for gallery or camera as source
			  navigator.notification.confirm('Select a source for the new image', sourceSelected , 'Image Source', ["Camera","Gallery"]);
  }

}
