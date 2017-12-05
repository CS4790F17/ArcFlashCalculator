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

    $("#workersPopover").popover({
        trigger: 'hover',
        title: '<h3>Workers Definitions</h3>',
        content: "<strong>Alone</strong> - No other workers required.<br/><strong>Two Person</strong> - An additional worker qualified to work on energized circuits, understanding the work activities and the hazards present, and trained to know what to do in case of an electrical accident involving the other worker. Must be within eyesight of the hazardous task.<br/><strong>Safety Watch</strong> - The safety watch should be a worker qualified to work on energized circuits who accepts responsibility for monitoring qualified worker(s) performing high-hazard electrical work. Must be actively working with/beside the primary worker and have the same PPE and training.",
        html: true
    });

    $("#workerControlPopover").popover({
        trigger: 'hover',
        title: '<h3>Training Definitions</h3>',
        content: "<strong>EEWP</strong> - Energized Electrical Work Permit, higher level signing authority required<br/><strong>SOP</strong> - Standard Operating Procedure",
        html: true
    });

    $("#arcFlashBoundariesPopover").popover({
        trigger: 'hover',
        content: "From:<p>Arc Flash Calculations for Exposures to DC Systems - Daniel R. Doan, Senior Member, IEEE - IEEE TRANSACTIONS ON INDUSTRY APPLICATIONS, VOL. 46, NO. 6, NOVEMBER/DECEMBER 2010</p><p>DC Arc Flash Calculations – Arc-InOpen-Air &amp; Arc-In-A-Box Using a Simplified Approach, Fontaine &amp; Walsh Electrical Safety Workshop (ESW), 2012 IEEE IAS, Date: Jan. 31 2012-Feb. 3 2012</p>",
        html: true
    });

    $("#freeSpaceIncidentPopover").popover({
        trigger: 'hover',
        content: "<p>Free space incident energy at a standard working distance of 18&quot;. Assumes worst case of all energy being converted into radiant heat.</p><p>Calculated from:<br/>Incident Energy = 0.005 * Volts * Current * Time / 46<sup>2</sup><br/>(46cm = 18&quot;)</p><p>Any questions should be referred to an electrical safety expert.</p>",
        html: true
    });

    $("#freeSpaceArcFlashPopover").popover({
        trigger: 'hover',
        content: "<p>Free space threshold distance for 2<sup>nd</sup> degree burn where the worker is exposed to 1.2 cal/cm<sup>2</sup> (5 J/cm<sup>2</sup>) utilizing a multiplying factor of 3 * Free Space. Assumes absolute worst case of all energy being converted into radiant heat.</p><p>Calculated from:<br/> Distance (cm) = sqrt((0.005 / 1.2) * Volts * Current * Time)</p><p>PPE is not required when working at or greater than this distance.</p>",
        html: true
    });

    $("#enclosedBoxIncidentPopover").popover({
        trigger: 'hover',
        content: "<p>Enclosed Box incident energy at a standard working distance of 18&quot;. Assumes worst case of all energy being converted into radiant heat.</p><p>Calculated from:<br/>Incident Energy = 3 * 0.005 * Volts * Current * Time / 46<sup>2</sup><br/>(46cm = 18&quot;)</p><p>A safety factor of 3 * Incident Energy is utilized to account for box energy focusing effects. Any questions should be referred to an electrical safety expert.</p>",
        html: true
    });

    $("#enclosedBoxArcFlashPopover").popover({
        trigger: 'hover',
        content: "<p>Enclosed Box threshold distance for 2<sup>nd</sup> degree burn where the worker is exposed to 1.2 cal/cm<sup>2</sup> (5 J/cm<sup>2</sup>) utilizing a multiplying factor of 3 * Free Space. Assumes absolute worst case of all energy being converted into radiant heat.</p><p>Calculated from:<br/> Distance (cm) = sqrt((0.005 / 1.2) * 3 * Volts * Current * Time)</p><p>PPE is not required when working at or greater than this distance.</p>",
        html: true
    });

    $("#workerModePopover").popover({
        title: 'Work Modes',
        trigger: 'hover',
        content: '<strong>Mode 0</strong> - Electrically safe work condition<br/><strong>Mode 1</strong> - De-energize and verify a safe work condition exists<br/><strong>Mode 2</strong> - Testing, troubleshoot, tune and adjust<br/><strong>Mode 3</strong> - Energized, Energized Electrical Work Permit (EEWP) to modify, repair or adjust"',
        html: true
    });

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