(function(GLOBAL, $, tmpl) {
	
	//dom cache
	var item_list, new_item, new_itemCode, parse_log;

	function _initParse()
	{
		$.parse.init();
		
		return true;
	}


	function _initQuickBlox(){
		// initalise the environmenet with my application id, authentication key and authentication secret
		new QuickBlox():
		QuickBlox.init();
	}

	function init()
	{
		//cache vars in module
		//item_list = $("#item_list");
		//new_item = $("#new_item");
		//item_table = $("#item_table");
		//parse_log = $("#parse_log");
		app.initialize();
		GLOBAL.userid = "";
		GLOBAL.EMAIL_PATTERN = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
		GLOBAL.ALPHANUMERIC_PATTERN = "^.*[^a-zA-Z0-9 ].*$";

		alert('init me ');
		_initParse();
		_initQuickBlox();
		_loadSignupForm();	

		GLOBAL.uploadTestFile = "";
		
		$('#uploadTest').bind("change", function(e) {
			var files = e.target.files || e.dataTransfer.files;
			GLOBAL.uploadTestFile = files[0];
		});	

		return GLOBAL.items;
	}	
	
	GLOBAL.items = 
	{
		init: init,
		get: getItems
	};


	//doc ready init
	$(init);
	
	window.location.hash = "signin";
	
	if(amplify.store("logininfo"))
	{	
		var user = amplify.store("logininfo");				
		_login(user.email,user.password);		
		$("#edit_username").val(user.email);
		$("#edit_password").val(user.password);
		$("#log_username").val(user.email);
		$("#log_password").val(user.password);
	}
	
	/* Go fastclick go!
	window.addEventListener('load', 
		function() {
			FastClick.attach(document.body);
		}, false);
	*/
	
	$("a").click(function(e) 
	{					
		e.preventDefault();
		e.stopImmediatePropagation();		
		e.stopPropagation();
		return false;
	});
	
	$(document).ajaxStart(function() {
		showLoader();
	});
	
	$(document).ajaxStop(function() {
		hideLoader();
	});	

})(window, jQuery, tmpl);

function doFail(e) 
{
	hideLoader();
	error = jQuery.parseJSON(e.responseText);
	
	if(typeof error.error !== 'undefined')
	{
		error = error.error;
	}
	
	if(!error) {		
		alert("Oops, there was a problem. Please try again.", function() {}, "Error");
	} else {
		alert(error, function() {}, "Error");	
	}
}