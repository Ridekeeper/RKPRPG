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

  this.login = function (email,pass)
  {
    $.parse.login(
      email,
      pass,
      function(e) // Success
      {
        console.log("success:",e);
        _logininit(e.sessionToken,e.objectId);
      
        amplify.store("logininfo",{ email: email, password: pass });      
      },
      function(e) // Fail
      {
        doFail(e);
        window.location.hash = "signin";
      }
    );
  };


  this.signup = function () 
  {
    GLOBAL.noACL = 1;
    var username = $("#sign_username").val();
    var email = $("#sign_email").val();
    var pass = $("#sign_password").val();
  
    //Trim white space
    username = $.trim(username);
    email = $.trim(email);
    pass  = $.trim(pass);

    //Validate the lengths
    if(username.length < 1 || username.length > 15){
      doAlert("Username must be alphanumeric and between 5-15 characters","Error");
      return;
    }

    if(!isValidEmail(email)){
      doAlert("Please enter a valid email","Error");
      return;
    }

    if(pass.length < 5 || pass.length > 15){
      doAlert("Password must be between 5-15 characters","Error");
      return;
    }

    $.parse.signup({ 
        username : username, 
        password : pass, 
        email : email
      },
      function(e) // Success
      {
        console.log("success:",e);
        //Register QuickBlox
        alert('success here');
      
        _logininit(e.sessionToken,e.objectId);  
      
        amplify.store("logininfo",{ email: email, password: pass});  
      },
      function(e) // Fail
      {
        window.location.hash = "signup";
        doFail(e);
      }
    );
  
    delete GLOBAL.noACL;
  };

  this.loadSignupForm = function ()
  {
    //var signupForm = tmpl("signup_tmpl");
    //$("#mainwrap").html(signupForm);
    $("#sign_submit").bind('tapone', function() { _signup(); });
    $("#log_submit").bind('tapone',function() {
      _login($("#log_username").val(), $("#log_password").val());
    });
  
    $("#reset_submit").bind('tapone', function() { _resetPassword(); });
  };

  this.editAccount = function () {
    GLOBAL.noACL = 1;
  
    $.parse.put("users/" + GLOBAL.userid, 
      { 
        username: $("#edit_username").val(),
        password: $("#edit_password").val(),
        email: $("#edit_username").val()      
      }, 
      function(json) // Success
      {
        refresh();
        window.location.hash = "settings";  
      },
      function(e)  // Fail
      {
        doFail(e);
        window.location.hash = "edit_account";  
      }
    );  
  
    delete GLOBAL.noACL;
  };

  this.logout = function() 
  {
    delete window.some_var;
    delete qCategories; 
    delete qItems; 
  
    delete sessionid;
    delete sessionToken;
    delete GLOBAL.userid;
  
    amplify.store("logininfo", null);
  
    getItems();
    listCategories(); 
  
    window.location.hash = "signin";  
  };

  this.logininit = function(sessionid,userid) 
  {
    //add events
    sessionid = sessionid;
    GLOBAL.userid = userid;
    _initParseSession(sessionid);

    _addItemEvents();
    _addCategoryEvents();

    // Disable back so user can't go back to login form with logging out
    for (var i=0;i<20;i++)
    {
      history.replaceState({nogo: 'back'}, 'NoGoBack', '#');
      history.pushState({nogo: 'back'}, 'NoGoBack', '#');
    }
  
    window.location.hash = "home";

    refresh();
  };

  this.hide_checked_count_timer = null;

  this.refresh = function()
  { 
    showLoader();
  
    delete qCategories; 
    delete qItems; 
    listCategories();
    getItems();

    requiresQCat();
  
    waitForRefresh = setInterval(function() {
      if(typeof qCategories !== 'undefined' && typeof qItems !== 'undefined')
      {
        clearInterval(waitForRefresh);
        _viewCategory($("#cat_view h1.title"),"dontredirect");      
        _addItemEvents();
        addItemCountToCategories();
      }
    } , 100);
  };

  this.requiresQCat = function() {
    clearTimeout(hide_checked_count_timer);

    hide_checked_count_timer = setTimeout(function() {
        if(typeof qCategories != 'undefined' && 
           typeof qItems != 'undefined')
    {     
      _loadItemForm();

      _addCategoryEvents();
      listCategoryItems();
      
      _categoryEditToggle();
      _itemEditToggle();
      
      _addItemEvents();
      refreshClick();
      
      hideLoader();
      
      refreshDateSelect();
    }
    else
    {
      requiresQCat();
    }
    },1);
  };

/////////////////////////////////////////////
  this.signUp2 = function (username, password, email, phone) {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
 
    // other fields can be set just like with Parse.Object
    user.set("phone", phone);
 
    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  this.login2 = function (username, password) {
    Parse.User.logIn(username, password, {
      success: function(user) {
        // Do stuff after successful login.
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    });
  };

  this.logout2 = function () {
    Parse.User.logOut();
    var currentUser = Parse.User.current();  // this will now be null
    if (currentUser)
      alert("Error, user logout failure.");
  }


  this.currentUser = function () {
    var currentUser = Parse.User.current();
    if (currentUser) {
      // do stuff with the user
      return this.getCurrentUser(currentUser.objectId);
    } else {
      // show the signup or login page
    }
  };

  this.getCurrentUser = function (objectId, fun) {
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
