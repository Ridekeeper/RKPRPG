function image_upload() {

  var uploadPic = null;

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
        callback.call(this, dataURL, url);
        canvas = null; 
    };
    img.src = url;
  }

  function onPicSuccess(imageURI) {
    convertImgToBase64(imageURI, uploadPic);
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

  this.newPicture = function(successFun) {
    uploadPic = successFun;
    // Prompt for gallery or camera as source
    navigator.notification.confirm('Select a source for the new image', sourceSelected , 'Image Source', ["Camera","Gallery"]);
  }
}
