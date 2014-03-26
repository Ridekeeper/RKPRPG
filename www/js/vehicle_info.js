var googleMap; // identifier for the Google Map
var pageVehicleId; // identifier for the page's vehicle
var currentVehicle; // contains page's vehicle
var intervalId = null; //identifier for setInterval()
var oldPos = null; //Stores the position of the vehicle last time it was updated
var vehicleStolen; //Indicates whether currentVehicle is stolen

function vehicleInfoInitialize() {
  var errorFun = function(vehicleObject, error) {
    alert('Error retreiving vehicle.\nError Code: ' + error.code);
    if (vehicleStolen) {
      window.open("#/vehicles-stolen", "_self");
    } else {
      window.open("#/vehicles", "_self");
    }
  }
  Ridekeeper.user.getVehicle(pageVehicleId, function(vehicleObject) {
    currentVehicle = vehicleObject;
    $('#top-bar h1').text('Vehicle: ' + getVehicleTitle(vehicleObject));
    $('#make').val(vehicleObject.make);
    $('#model').val(vehicleObject.model);
    $('#year').val(vehicleObject.year);
    $('#license').val(vehicleObject.license);
    if (vehicleObject.photo) {
      document.getElementById("vehicle-image").src = vehicleObject.photo;
    }
  }, errorFun);

  $('#change-vehicle-image-button').click(function(){
    Ridekeeper.image_upload.newPicture(Ridekeeper.vehicles.onPicSuccess);
  });


  $('#back').click(function() {
    if (vehicleStolen) {
      window.open("#/vehicles-stolen", "_self");
    } else {
      window.open("#/vehicles", "_self");
    }
  });

  $('#track').click(function() {
    window.open('#/track', '_self');
  });

  if (vehicleStolen) {
    $('input').attr('readonly', true);
  } else {
    newVehicle.editVehicle();

    // Show buttons
    $('#change-vehicle-image-button').css('display', 'block');
    $('#remove').css('display', 'block');

    $('#remove').click(function() {
      var deleteVehicle = confirm('Do you wish to delete the vehicle?');
      if (deleteVehicle) {
        var successFun = function() {
          window.open('#/vehicles', '_self');
        }
        var errorFun = function(object, error) {
          $('#create-text').html('Failed to remove vehicle.<br>Error Code: ' + error.code);
          $('#create-text').css('color', '#f00');
          document.getElementById("create-text").scrollIntoView();
        }
        Ridekeeper.user.removeVehicle(pageVehicleId, successFun, errorFun);
          $('#create-text').html('Removing vehicle...');
          $('#create-text').css('color', '#');
          document.getElementById("create-text").scrollIntoView();
      }
    });

  }

}

//Test function that is no longer used
var curPos = 0;
function getVehiclePosition() {
  var pos;
  if (pageVehicleId == 1) {
    if (curPos == 0) {
      pos = new google.maps.LatLng(34.068509, -118.445546);
    } else {
      pos = new google.maps.LatLng(34.068509, -118.445667);
    }
  } else {
    if (curPos == 0) {
      pos = new google.maps.LatLng(34.069465, -118.445900);
    } else {
      pos = new google.maps.LatLng(34.069491, -118.445806);
    }
  } 
  curPos = (curPos + 1) % 2;
  return pos
}

// Sets up page when partial is loaded
function setVehiclePage(vehicleIdentifier, stolen) {
  pageVehicleId = vehicleIdentifier;
  vehicleStolen = stolen;
  window.open("#/vehicle-map", "_self");
}

function vehicles() {
  this.onPicSuccess = function(base64, imageURI){
    var file = new Parse.File("photo.jpg", { base64: base64 });

    if (file == null)
    {
      showMessage('Invalid picture, please try again');
    }

    file.save().then(function() {
      var field = [{field: "photo", value: file}];
      var successFun = function(vehicle) {
        showMessage("Picture changed");
        $('#vehicle-image').attr('src',imageURI); 
      }
      var errorFun = function(vehicle, error) {
        showMessage("Picture could not be uploaded:\n"+error.message);
        console.log(error.message); 
      }
      if (Ridekeeper.currentPage == "new-vehicle") {
        // We cannot upload the file yet since the vehicle doesn't exist
        newVehicle.curImage = file;
        $('#vehicle-image').attr('src',imageURI); 
      } else {
        Ridekeeper.user.updateVehicle(pageVehicleId, field, successFun, errorFun);
      }

    }, function(error)  {
      onPicFail(error);
      return;
    });
  };
}
