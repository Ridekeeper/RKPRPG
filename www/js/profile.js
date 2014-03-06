function profile() {

	this.initialize = function() {
		//var User = new user().currentUser();
		var username = Parse.User.current().get("username");
		var email = Parse.User.current().get("email");
		var phone = Parse.User.current().get("phone");
		$("#username").val(username);
		$("#email").val(email);
		$("#phone").val(phone);
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
