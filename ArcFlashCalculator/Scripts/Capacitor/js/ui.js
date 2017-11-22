var UI = {
   evaluate : function(evt) {
      "use strict";
      var input = UI.processInput($('#capacitance-input').val(), $('#voltage-input').val(), $('#work-mode-input').val());

      if (input.isComplete) {
         // $('#system-information').removeClass('span4').removeClass('offset4').addClass('span3');
         // $('#system-information').removeClass('system-information-side').addClass('system-information-centered');
         UI.show('#form-actions');
         
         $('#results-wrapper').removeClass('results-wrapper-hidden').addClass('results-wrapper-visible');

          $('#results-wrapper').css('display', 'block');
          $('#results-wrapper').css('opacity', '1');

          $('#navBtm').removeClass('hidden');

          UI.show('#results-wrapper');
         
         UI.showNotes(input.classification);
         UI.showSummary(input.classification);
         $('#joules-display').text(Boundaries.toDisplayKilo(input.joules, 'Joules', 'kilojoules'));
         UI.showSafetyRequirements(input.classification, input.mode);
         UI.showBoundaries(input.voltage);
         UI.showArcFlash(input.voltage, input.joules);
         UI.showPPE(input.mode, input.voltage, input.classification, input.joules);

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
          $('#results-wrapper').css('display', 'none');
          $('#results-wrapper').css('opacity', '0');
         UI.hide('#results-wrapper');
      }
   }, 

   processInput : function(capacitanceString, voltageString, workModeString) {
      var capacitance = parseFloat(capacitanceString) / 1000000, // convert from microfarads to Farads
          voltage = parseFloat(voltageString),
          mode = workModeString,
          joules = 0.5 * capacitance * (voltage * voltage),
          classification = Classifications.lookup(voltage, joules);

      return {
         capacitance: capacitance,
         voltage: voltage,
         mode: mode,
         joules: joules,
         classification: classification,
         isComplete: capacitance && voltage && ('' !== mode)
      };
   },
   
   showNotes : function(classification) {
      $('.note').hide();
      if (classification === '3.2a' || classification === '3.3a' || classification === '3.4a') {
         $('#note-3-x-a').show();
      }
      else if (classification === '3.2b' || classification === '3.3b' || classification === '3.4b') {
         $('#note-3-x-b').show();
      }

      if ('3.4b' === classification) {
         $('#note-3-4-b').show();
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
      var reqs = SafetyRequirements.lookup(classification, mode);
      if (reqs) {
         $('#safety-req-workers-display').text(reqs.qualifiedWorkers);
         $('#safety-req-work-control-display').text(reqs.workControl);
         //$('#safety-req-ppe-display').text(reqs.ppe);
         $('#safety-req-energy-removal-display').text(reqs.energyRemoval);
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
   
   showArcFlash : function(voltage, joules) {
      "use strict";
      var cm, distance, tbody, tableJoules, tableCal;

      if ((voltage >= 100) && (joules >= 10000)) {
         $('#arc-flash-display').text(Boundaries.arcFlash(joules));
         $('#incident-energy-display').html(Boundaries.incidentEnergyAt18FromJoulesDisplay(joules) + ' cal/cm<sup>2</cm>');
         $('#distances-table-wrapper').show();

         tbody = $('#distances-table tbody');
         tbody.empty();
         cm = Boundaries.arcFlashCm(joules);
         for (distance = 30.48; distance < cm; distance = distance + 30.48) { // 30.48 cm in 1 foot

            tableJoules = (3 * joules) / (4 * 3.14 * (distance * distance));
            tableCal = tableJoules / 4.184;

            tbody.append(
               $('<tr>')
                  .append($('<td>').text(Boundaries.toDisplay(distance)))
                  .append($('<td>').text(tableCal.toFixed(3)))
            );
         }
      }
      else {
         $('#arc-flash-display').text('Not applicable');
         $('#incident-energy-display').text('Not applicable');
         $('#distances-table-wrapper').hide();
      }
   },
   
   showPPE : function(mode, volts, hazardClass, joules) {
      
      if (mode === '0') {
         $('#ppe-requirements').hide();
         $('#ppe-requirements-voltage-too-high').hide();
      }
      else {
         var ie = Boundaries.incidentEnergyAt18FromJoules(joules)
         if (volts <= 54000 && ie <= 40) {
            
            $('#ppe-requirements').show();
            $('#ppe-requirements-voltage-too-high').hide();

            $('#glove-class-display').text(SafetyReqs.gloveClassDC(volts));

            if ((volts >= 100) && (joules >= 10000)) {
               $('.arc-flash-ppe').show();
               $('.general-ppe').hide();

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
               $('.general-ppe').show();
            }
         }
         else {
            $('#ppe-requirements').hide();
            $('#ppe-requirements-voltage-too-high').show();
         }
      }
   },

   reset : function(evt) {
      "use strict";
      evt.preventDefault();
      $('#capacitance-input').val('');
      $('#voltage-input').val('');
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
   $('#capacitance-input, #voltage-input').bind('textchange', UI.evaluate);
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
});