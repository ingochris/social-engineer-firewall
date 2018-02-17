$(document).ready(function() {
  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollToMain').hide();
    } else {
      $('.scrollToMain').show();
    }
  });
});
