$(function() {

  //console.log(Modernizr.borderradius, Modernizr.opacity, Modernizr.textshadow, Modernizr.cssanimations, Modernizr.cssgradients, Modernizr.csstransforms, Modernizr.csstransitions);

  var supportsAll = Modernizr.borderradius 
                 && Modernizr.opacity
                 && Modernizr.textshadow
                 && Modernizr.cssanimations
                 && Modernizr.cssgradients
                 && Modernizr.csstransforms
                 && Modernizr.csstransitions
  if (supportsAll) {
     $('#support-warning').hide();
  }
  else {
     $('#support-warning').show();
  }
});