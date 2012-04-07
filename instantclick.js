/*
* InstantClick - jQuery Plugin
* bind no-delay click event in mobile browser.
* 
* Copyright (c) 2012 Lee Yeh
* Version: 1.0 (2012/4/7)
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

$.fn.extend({
  instantClick : function(fn,data){
    var TouchSupported = ("createTouch" in document);
    if (TouchSupported) {
      if (document.body._touchStart === undefined) {
        document.body._touchStart = function(event){
          this.isMoved = false ;
          $(this).one("touchmove", function(){this.isMoved = true;});
          $(this).one("touchend", function(){
            if (!this.isMoved){event.data.fn.call(this, event.data.data);}
            
          });
        };
      }
      $("body").on("touchstart",this.selector,{"fn":fn,"data":data},document.body._touchStart);
    }
    else {
      $(this).click(fn,data);
    }
  }
});