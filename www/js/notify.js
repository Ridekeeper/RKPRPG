
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
  $(".overlay .overlay-loader").hide(); 
  hideOverlay();  
}

function showLoader()
{
  $(".overlay .overlay-loader").show();
}
