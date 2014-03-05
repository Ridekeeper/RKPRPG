function profile() {

	this.initialize = function() {
		var User = new user();
		User.getCurrentUser("WXO7vi6gjq", function userInfo (parseUser) {
		var username = parseUser.username;
		var email = parseUser.email;
		var phone = parseUser.phone;
		$("#username").append(username);
		$("#email").append(email);
		$("#phone").append(phone);
		$("#phone").append(document.cookie);

		})
		// Register buttons
		$('#change-profile-image-button').click(function(){Ridekeeper.profile.newPicture()});
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
    sourceType: Camera.PictureSourceType.CAMERA,
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

	this.sourceSelected = function( buttonIndex ) {
		if (buttonIndex == 1)
			newCameraPicture();

		if (buttonIndex == 2)
			newGalleryPicture();
		// Do nothing, the user exited the dialog
	}

	this.newPicture = function() {
			// Prompt for gallery or camera as source
			  navigator.notification.confirm('Select a source for the new image', function(buttonIndex){Ridekeeper.profile.sourceSelected(buttonIndex);}, 'Image Source', ["Camera","Gallery"]);
        }

}
