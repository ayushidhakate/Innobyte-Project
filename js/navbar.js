$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
          $("header").css("background" , "#212529");
        }
  
        else{
            $("header").css("background" , "transparent");  	
        }
    })
  })