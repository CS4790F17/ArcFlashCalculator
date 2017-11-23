var UI = {
   evaluate : function(evt) {
      "use strict";
      var volts = parseFloat($('#maximum-exposed-input').val()),
          amps = parseFloat($('#available-current-input').val()),
          seconds = parseFloat($('#duration-input').val()),
          mode = $('#work-mode-input').val(),
          watts = volts * amps,
          joules,
          classification;

      if (volts < 50) {
         classification = Classifications.lookup(volts, watts); 
      }
      else {
         classification = Classifications.lookup(volts, amps * 1000);
      }

      if (volts && amps && seconds && mode !== '') {
         if (seconds > 2) {
            seconds = 2;
         }

         joules = volts * amps * seconds;

         // $('#system-information').removeClass('span4').removeClass('offset4').addClass('span3');
         // $('#system-information').removeClass('system-information-side').addClass('system-information-centered');
         $('#form-actions').css({'opacity': '1', 'height':'auto'});
         
         $('#results-wrapper').removeClass('results-wrapper-hidden').addClass('results-wrapper-visible');
         $('#results-wrapper').css('opacity', '1');
         $('#results-wrapper').css('display', 'block');

         $('#navBtm').removeClass('hidden');
         
         UI.showSummary(classification);
         $('#watts-display').text(Boundaries.toDisplayKilo(watts, 'Watts', 'kilowatts'));
         $('#joules-display').text(Boundaries.toDisplayKilo(joules, 'Watt-seconds (Joules)', 'kilowatt-seconds (kilojoules)'));
         UI.showSafetyRequirements(classification, mode);
         UI.showBoundaries(volts);
         UI.showArcFlash(volts, amps, seconds);
         UI.showPPEFreeSpace(mode, volts, amps, seconds, classification);
         UI.showPPEEnclosed(mode, volts, amps, seconds, classification);

         // scroll to results
         // target element
         var $id = $("#results-wrapper");

         // top position relative to the document
         var pos = $id.offset().top - 60;

         // animated top scrolling
         $('body, html').animate({ scrollTop: pos });

      }
      else {
         // $('#system-information').removeClass('span3').addClass('span4').addClass('offset4');
         // $('#system-information').removeClass('system-information-centered').addClass('system-information-side');
         $('#form-actions').css({'opacity': '0', 'height': '0'});
         
         $('#results-wrapper').removeClass('results-wrapper-visible').addClass('results-wrapper-hidden');
         $('#results-wrapper').css('opacity', '0');
         $('#results-wrapper').css('display', 'none');
      }
   }, 
   
   showSummary : function(classification) {
      "use strict";
      $('.classification').hide();
      if (classification) {
         $('.classification-display').text(classification);
         var subclass = /\.\d/.exec(classification)[0].replace(/\./, '');
         $('#class-' + subclass).show();
      }
   },
   
   showSafetyRequirements : function(classification, mode) {
      "use strict";
      var reqs = SubRFSafetyRequirements.lookup(classification, mode);
      if (reqs) {
         $('#safety-req-workers-display').text(reqs.qualifiedWorkers);
         $('#safety-req-work-control-display').text(reqs.workControl);
         $('#safety-req-ppe-display').text(reqs.ppe);
      }
   },
   
   showBoundaries : function(volts) {
      "use strict";
      var boundaries = Boundaries60hz.lookup(volts);
      if (boundaries) {
         $('#limited-approach-movable-conductor-display').text(boundaries.limitedApproachMovableConductor);
         $('#limited-approach-fixed-circuit-display').text(boundaries.limitedApproachFixedCircuitPart);
         $('#restricted-approach-display').text(boundaries.restrictedApproach);
         $('#prohibited-approach-display').text(boundaries.prohibitedApproach);
      }
   },
   
   showArcFlash : function(volts, amps, seconds) {
      "use strict";
      if ((volts > 250) && (amps > 500)) {
         // free space
         var freeSpaceCal = Boundaries.incidentEnergyAt18OpenDisplay(volts, amps, seconds);
         $('#arc-flash-free-space-incident-energy').html(freeSpaceCal + ' cal/cm<sup>2</sup>');
         $('#arc-flash-display-free-space').text(Boundaries.arcFlashOpen(volts, amps, seconds));

         // enclused space
         var cal = Boundaries.incidentEnergyAt18Display(volts, amps, seconds);
         $('#arc-flash-incident-energy').html(cal + ' cal/cm<sup>2</sup>');
         $('#arc-flash-display-enclosed-space').text(Boundaries.arcFlashEnclosed(volts, amps, seconds));
      }
      else {
         $('#arc-flash-incident-energy').text('Not applicable');
         $('#arc-flash-display-enclosed-space').text('Not applicable');
         $('#arc-flash-free-space-incident-energy').text('Not applicable');
         $('#arc-flash-display-free-space').text('Not applicable');
      }
   },

   hidePPE : function(mode, classification, volts) {
      return volts < 100 || mode === '0' || classification === '6.1a' || classification === '6.1b' || classification === '6.1c';
   },

   showPPEFreeSpace : function(mode, volts, amps, seconds, classification) {
      if (UI.hidePPE(mode, classification, volts)) {
         $('#ppe-requirements').hide();
         $('#ppe-requirements-voltage-too-high').hide();
      }
      else {
         var ie = Boundaries.incidentEnergyAt18(volts, amps, seconds);
         if (volts <= 54000 && ie <= 40) {
            
            $('#ppe-requirements').show();
            $('#ppe-requirements-voltage-too-high').hide();

            $('#glove-class-display').text(SafetyReqs.gloveClassDC(volts));

            if ((volts > 100) && (amps > 500)) {
               $('.arc-flash-ppe').show();

               if (ie <= 8) {
                  $('#ppe-low').show();
                  $('#ppe-high').hide();
               }
               else {
                  $('#ppe-low').hide();
                  $('#ppe-high').show();
               }
               
               var ppeCalRating = SafetyReqs.ppeCalRating(ie);
               if (ppeCalRating) {
                  $('#ppe-cal-rating').text(ppeCalRating);
               }
            }
            else {
               $('.arc-flash-ppe').hide();
            }
         }
         else {
            $('#ppe-requirements').hide();
            $('#ppe-requirements-voltage-too-high').show();
         }
      }
   },

   showPPEEnclosed : function(mode, volts, amps, seconds, classification) {
      if (UI.hidePPE(mode, classification, volts)) {
         $('#enclosed-ppe-requirements').hide();
         $('#enclosed-ppe-requirements-voltage-too-high').hide();
      }
      else {
         var ie = 3 * Boundaries.incidentEnergyAt18(volts, amps, seconds);
         if (volts <= 54000 && ie <= 40) {
            
            $('#enclosed-ppe-requirements').show();
            $('#enclosed-ppe-requirements-voltage-too-high').hide();

            $('#enclosed-glove-class-display').text(SafetyReqs.gloveClassDC(volts));

            if ((volts > 100) && (amps > 500)) {
               $('.enclosed-arc-flash-ppe').show();

               if (ie <= 8) {
                  $('#enclosed-ppe-low').show();
                  $('#enclosed-ppe-high').hide();
               }
               else {
                  $('#enclosed-ppe-low').hide();
                  $('#enclosed-ppe-high').show();
               }
               
               var ppeCalRating = SafetyReqs.ppeCalRating(ie);
               if (ppeCalRating) {
                  $('#enclosed-ppe-cal-rating').text(ppeCalRating);
               }
            }
            else {
               $('.enclosed-arc-flash-ppe').hide();
            }
         }
         else {
            $('#enclosed-ppe-requirements').hide();
            $('#enclosed-ppe-requirements-voltage-too-high').show();
         }
      }
   },
   
   reset : function(evt) {
      "use strict";
      evt.preventDefault();
      $('#maximum-exposed-input').val('');
      $('#available-current-input').val('');
      $('#duration-input').val('');
      $('#work-mode-input').val('');
      UI.evaluate();
   },

   show : function(selector) {
      $(selector).css({'opacity': '1', 'height':'auto'});
   },

   hide : function(selector) {
      $(selector).css({'opacity': '0', 'height':'0'});
   }
};

$(function() {
   "use strict";

   UI.evaluate();
   
   // bind form fields
   $('#maximum-exposed-input, #available-current-input, #duration-input').bind('textchange', UI.evaluate);
   $('#work-mode-input').bind('change', UI.evaluate);

   // make sure that the user must re-enter the work mode if they are going to adjust the voltage
   // this will prevent the form submitting if the use is entering a multi digit number
   jQuery('#voltage-input').on('input', function () {
     // do your stuff
     $('#work-mode-input').val('');
   });
   
   // set button actions
   $('#reset-button').bind('click', UI.reset);

    // when back to top link is pressed send user back to the top
    $('#backToTop').click(function () {
        $('#navBtm').addClass('hidden');
    });

    //when user scrolls to top hide nav bar
    $(window).scroll(function () {
        var top_offset = $(window).scrollTop();
        if (top_offset == 0) {
            $('#navBtm').addClass('hidden');
        }
    });
   
   // help popovers
   $('[data-toggle="tooltip"]').tooltip();

   $('[data-toggle="popover"]').popover();

   $("#duration-input").keyup(function () {
       var value = $("#duration-input").val();
       if (value > 2 || value < 0.003) {
           $("#duration-warning").removeClass("hidden").addClass("visible");
       }
   });
});