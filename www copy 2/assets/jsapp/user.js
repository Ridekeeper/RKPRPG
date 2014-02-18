function _initParseSession(sessionToken)
{
	$.parse.init({  
		session_token: sessionToken
	});
	
	return true;
}	

function _resetPassword() 
{
	$.parse.requestPasswordReset(
		$("#reset_username").val(), 
		function(e) // Success
		{
			console.log("success:",e);	
			window.location.hash = "signin";	
			
			setTimeout(function() 
			{ 
				showMessage("<h2>Success!</h2>Instructions for resetting your password have been sent to your email address successfully! Don't forget to check your spam.<br><br><a href='#' class='button-positive' onclick='hideMessage();return false;'>Okay</a>");
					
			}, 1);
			
		},
		function(e) // Fail
		{
			window.location.hash = "forgotpass";
			doFail(e);
		}
	);
}

function _login(email,pass) 
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
}

function generateRandomSeed(length){
	var today = new Date();
	var seed = today.getSeconds();
	var random = Math.floor(Math.random(seed) * length);

	return random;
}

function _signupQuickBloxUser(username,password,email){
	//Register user with QuickBlox
	//1. Generate random username
	var random_seed = generateRandomSeed(99999);
	var qbUsername = username + random_seed + "rkpr";

	//Signup the User in QuickBlox
	QB.user.create(
		{
			login:qbUsername,
			email:email,
			password:GLOBAL.QUICKBLOX_DUMMY_PASSWORD
		},
		function(err,result){
			if(result){
				alert(result.user);
			}else{
			    alert("Critical: Unable to register chat service. Please re-login.");
			}
		}
	);
}

function _signup() 
{
	GLOBAL.noACL = 1;
	var username = $("#signup_username").val();
	var email = $("#signup_email").val();
	var pass = $("#signup_password").val();

	//remove white spaces (if any)
	email = $.trim(email);
	username = $.trim(username);
	pass = $.trim(pass);
	
	//Check for characters other than Alphanumeric in username
	if(GLOBAL.ALPHANUMERIC_PATTERN.test(username) == false){
		alert("Username cannot contain special characters or spaces.");
		return;
	}
	//Check for characters other than Alphanumeric in username
	if(GLOBAL.EMAIL_PATTERN.test(email) == false){
		alert("A valid formatted email address must be given.");
		return;
	}

	if (username.length == 0 || username.length > 20){
		alert("Username must be between 1 - 20 characters");
		btSignin.setEnabled(true);
		return;
	}
	
	if (password.length < 5 || password.length > 20 ){
		alert("Password must be between 5 - 20 characters");
		return;
	}
				
	//TESTING
	_signupQuickBloxUser(username,password,email);
	return;


	$.parse.signup({ 
			username : username, 
			password : pass, 
			email : email
		},
		function(e) // Success
		{
			_signupQuickBloxUser(username,password,email);

			console.log("success:",e);	
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
}

function _loadSignupForm()
{
	alert('in here loadsign');
	//var signupForm = tmpl("signup_tmpl");
	//$("#mainwrap").html(signupForm);
	$("#signup_submit").bind('tapone', function() { _signup(); });
	$("#log_submit").bind('tapone',function() {
		_login($("#log_username").val(), $("#log_password").val());
	});
	$("#reset_submit").bind('tapone', function() { _resetPassword(); });
}

function _editAccount() {
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
}

function _logout() 
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
}

function _logininit(sessionid,userid) 
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
}	

var hide_checked_count_timer;

function refresh()
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
}

function requiresQCat(){
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
}

