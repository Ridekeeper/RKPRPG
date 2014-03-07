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

  function onPicSuccess(imageURI){
		$('#profile-image').attr('src',imageURI); 
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
