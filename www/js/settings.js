function settings() {

  // Alert constants  
  this.BEEP = 0;
  this.ALERT = 1;
  this.SHRT_VIB = 2;
  this.LNG_VIB = 3;

  // Define defaults
  var defaults = {
    "nearby_stolen": this.BEEP,
    "stolen": this.BEEP,
    "disturbed": this.BEEP
  } 

  // initialize default values
  this.nearby_stolen = defaults.nearby_stolen;
  this.stolen        = defaults.stolen;
  this.disturbed     = defaults.disturbed;
 

  this.initialize = function() {

    // assign callbacks to ui-buttons
    //nearby_stolen
    $('#' + 'nearby_stolen' + '-' + 0).click(function(){Ridekeeper.settings.changeSetting('nearby_stolen', 0);});
    $('#' + 'nearby_stolen' + '-' + 1).click(function(){Ridekeeper.settings.changeSetting('nearby_stolen', 1);});
    $('#' + 'nearby_stolen' + '-' + 2).click(function(){Ridekeeper.settings.changeSetting('nearby_stolen', 2);});
    $('#' + 'nearby_stolen' + '-' + 3).click(function(){Ridekeeper.settings.changeSetting('nearby_stolen', 3);});
     //stolen
    $('#' + 'stolen' + '-' + 0).click(function(){Ridekeeper.settings.changeSetting('stolen', 0);});
    $('#' + 'stolen' + '-' + 1).click(function(){Ridekeeper.settings.changeSetting('stolen', 1);});
    $('#' + 'stolen' + '-' + 2).click(function(){Ridekeeper.settings.changeSetting('stolen', 2);});
    $('#' + 'stolen' + '-' + 3).click(function(){Ridekeeper.settings.changeSetting('stolen', 3);});
    //disturbed
    $('#' + 'disturbed' + '-' + 0).click(function(){Ridekeeper.settings.changeSetting('disturbed', 0);});
    $('#' + 'disturbed' + '-' + 1).click(function(){Ridekeeper.settings.changeSetting('disturbed', 1);});
    $('#' + 'disturbed' + '-' + 2).click(function(){Ridekeeper.settings.changeSetting('disturbed', 2);});
    $('#' + 'disturbed' + '-' + 3).click(function(){Ridekeeper.settings.changeSetting('disturbed', 3);});

    // load from local storage, else continue with defaults
    // get existing values if possible from amplify

    var nearbyStolen = amplify.store('nearby_stolen');
    if(typeof nearbyStolen === "undefined") {
      amplify.store('nearby_stolen',this.nearby_stolen);
    } else {
      this.nearby_stolen = nearbyStolen;
    }
    
    var stolen = amplify.store('stolen');
    if(typeof stolen === "undefined") {
      amplify.store('stolen',this.stolen);
    } else {
      this.stolen = stolen;
    }
    
    var disturbed = amplify.store('disturbed');
    if(typeof disturbed === "undefined") {
      amplify.store('disturbed',this.disturbed);
    } else {
      this.disturbed = disturbed;
    }

    // highlight the active settings
    $('#' + 'nearby_stolen' + "-" + this.nearby_stolen).addClass('active-setting');
    $('#' + 'stolen' + "-" + this.stolen).addClass('active-setting');
    $('#' + 'disturbed' + "-" + this.disturbed).addClass('active-setting');

  }

  this.changeSetting = function(key, value) {
    this.not_default = true;

    var old_setting = amplify.store( key );

    $('#' + key + "-" + old_setting ).removeClass('active-setting');

    amplify.store(key, value);

    this.initialize();
  }

}