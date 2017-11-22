var UI = {
   evaluate : function(evt) {
      "use strict";
      var batteryType = $('#battery-type-input').val(),
          volts = parseFloat($('#volts-input').val()),
          amps = parseFloat($('#amps-input').val()),
          duration = parseFloat($('#duration-input').val()),
          watts = volts * amps,
          mode,
          classification,
          joules;

      UI.setWorkModeOptions(batteryType);
      // get the mode here just incase setWorkModeOptions changed the selected value
      mode = $('#work-mode-input').val();
      
      if (batteryType !== '' && volts && amps && duration && mode !== '') {
         if (batteryType === 'leadacid') {
            classification = Classifications.lookup(watts);
         }
         else {
            classification = Classifications.lookup(batteryType);
         }

         if (duration > 2.0) {
            duration = 2.0;
         }

         joules = volts * amps * duration;

         // $('#system-information').removeClass('span4').removeClass('offset4').addClass('span3');
         // $('#system-information').removeClass('system-information-side').addClass('system-information-centered');
         UI.show('#form-actions');
         
         $('#results-wrapper').removeClass('results-wrapper-hidden').addClass('results-wrapper-visible');
         $('#results-wrapper').css('display', 'block');
         $('#results-wrapper').css('opacity', '1');
         UI.show('#results-wrapper');

          $('#navBtm').removeClass('hidden');
         
         UI.showSummary(classification);
         UI.showNotes(batteryType);
         $('#watts-display').text(Boundaries.toDisplayKilo(watts, 'Watts', 'kilowatts'));
         $('#joules-display').text(Boundaries.toDisplayKilo(joules, 'Watt-seconds (Joules)', 'kilowatt-seconds (kilojoules)'));
         UI.showSafetyRequirements(classification, mode);
         UI.showBoundaries(volts);
         UI.showArcFlash(volts, amps, duration);
         UI.showPPEFreeSpace(mode, volts, amps, duration, classification);
         UI.showPPEEnclosed(mode, volts, amps, duration, classification);

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
         UI.hide('#form-actions');
         
         $('#results-wrapper').removeClass('results-wrapper-visible').addClass('results-wrapper-hidden');
         UI.hide('#results-wrapper');
         $('#results-wrapper').css('display', 'none');
         $('#results-wrapper').css('opacity', '0');
      }
   }, 

   setWorkModeOptions : function(batteryType) {
      var sel = $('#work-mode-input');
      
      if ('leadacid' === batteryType && !sel.hasClass('lead-acid-options')) {
         sel.empty().append($('<option>').attr('value', '').text('Select a mode'));
         sel.removeClass('li-ion-options').addClass('lead-acid-options');
         sel.append($('<option>').attr('value', '2').text('Mode 2 - Testing, troubleshoot, tune and adjust')).append($('<option>').attr('value', '3').text('Mode 3 - Energized, Energized Electrical Work Permit (EEWP) to modify, repair or adjust'));
      }
      else if (('liionsinglecell' === batteryType || 'liionmulticell' === batteryType || batteryType ==='liioncommercial') && !sel.hasClass('li-ion-options')) {
         sel.empty().append($('<option>').attr('value', '').text('Select a mode'));
         sel.addClass('li-ion-options').removeClass('lead-acid-options');
         sel.append($('<option>').attr('value', 'whilecharging').text('While Charging'));
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

   showNotes : function(batteryType) {
      $('.lead-acid-note, .lithium-ion-non-commercial-note').hide();
      if ('leadacid' === batteryType) {
         $('.lead-acid-note').show();
      }
      else if ('liionsinglecell' === batteryType || 'liionmulticell' === batteryType) {
         $('.lithium-ion-non-commercial-note').show();
      }
   },
   
   showSafetyRequirements : function(classification, mode) {
      "use strict";
      var reqs = SafetyRequirements.lookup(classification, mode);
      if (reqs) {
         $('#safety-req-workers-display').text(reqs.qualifiedWorkers);
         $('#safety-req-work-control-display').text(reqs.workControl);
         $('#safety-req-ppe-display').text(reqs.ppe);
      }
   },
   
   showBoundaries : function(volts) {
      "use strict";
      var boundaries = DCShockBoundaries.lookup(volts);
      if (boundaries) {
         $('#limited-approach-fixed-circuit-display').text(boundaries.limitedApproachFixedCircuitPart);
         $('#restricted-approach-display').text(boundaries.restrictedApproach);
         $('#prohibited-approach-display').text(boundaries.prohibitedApproach);
      }
   },
   
   showArcFlash : function(volts, amps, seconds) {
      "use strict";
      if ((volts > 100) && (amps > 500)) {
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

   riskOfArcFlash : function(mode, volts) {
      return volts < 100 || mode === '0';
   },

   showPPEFreeSpace : function(mode, volts, amps, seconds, classification) {
      if (UI.riskOfArcFlash(mode, volts)) {
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
      if (UI.riskOfArcFlash(mode, volts)) {
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

   show2 : function(selector) {
      $(selector).show();
      return UI;
   },

   hide2 : function(selector) {
      $(selector).hide();
      return UI;
   },
   
   reset : function(evt) {
      "use strict";
      evt.preventDefault();
      $('#volts-input, #amps-input, #battery-type-input, #work-mode-input, #duration-input').val('');
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
   $('#volts-input, #amps-input, #duration-input').bind('textchange', UI.evaluate);
   $('#battery-type-input, #work-mode-input').bind('change', UI.evaluate);
   
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
});