
function showMessage(msg)
{
  navigator.notification.alert(
   msg,
   function(){},
   'Message',
   'Done' 
  )
}

function hideLoader()
{
  $(".overlay").css("display", "none"); 
}

function showLoader()
{
  $(".overlay").css("display", "inline");
}
