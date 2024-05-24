$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 10) {
          $("nav").css("background" , "#0a1828");
        }
  
        else{
            $("nav").css("background" , "transparent");  	
        }
    })
  })