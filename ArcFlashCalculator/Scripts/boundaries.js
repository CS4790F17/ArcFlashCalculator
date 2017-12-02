var Boundaries = {
   build : function(limitedApproachFixedCircuitPart, restrictedApproach, prohibitedApproach) {
      "use strict";
      return {
         limitedApproachFixedCircuitPart : limitedApproachFixedCircuitPart,
         restrictedApproach : restrictedApproach,
         prohibitedApproach : prohibitedApproach
      };
   },

   // calculates arc flash boundary and returns it in cm
   arcFlashCm : function(joules) {
      "use strict";
      return Math.ceil(Math.sqrt(0.05 * joules));
   },

   // calculates arc flash boundary and returns it formatted for display
   arcFlash : function(joules) {
      "use strict";
      var cm = Boundaries.arcFlashCm(joules);
      return Boundaries.toDisplay(cm);
   },

   arcFlashOpen : function(volts, amps, time) {
       "use strict";
      // var v2 = volts * volts,
      //     rsys = volts / amps,
      //     numerator = 0.005 * (v2/rsys) * time,
      //     cm = Math.ceil(Math.sqrt(numerator / 1.2));
      var cm = Math.ceil(Math.sqrt((0.005/1.2)*volts*amps*time));
      return Boundaries.toDisplay(cm);
   },

    //New calculation for the 60Hz page 
   arcFlashOpen60Hz: function (volts, amps, time) {
       "use strict";
       var cm = Math.ceil(Math.sqrt((0.005 / 1.2) * volts * amps * time));
       return Boundaries.toDisplay(cm);
   },

   arcFlashEnclosed : function(volts, amps, time) {
      "use strict";
      // var v2 = volts * volts,
      //     rsys = volts / amps,
      //     numerator = 0.005 * (v2/rsys) * time,
      //     cm = Math.ceil(3 * Math.sqrt(numerator / 1.2));
      var cm = Math.ceil(Math.sqrt((0.005/1.2)*3*volts*amps*time));
      return Boundaries.toDisplay(cm);
   },

   incidentEnergyAt18 : function(volts, amps, time) {
      "use strict";
      var v2 = volts * volts,
          rsys = volts / amps,
          d2 = 45.72 * 45.72,
          ie = 0.005 * (v2/rsys) * time / d2,
          cal = ie;
      return cal;
   },

   incidentEnergyAt18Display : function(volts, amps, time) {
      "use strict";
      var cal = 3 * Boundaries.incidentEnergyAt18(volts, amps, time);
      cal = parseFloat(cal.toFixed(2));
      return cal;
   },

   incidentEnergyAt18OpenDisplay : function(volts, amps, time) {
      "use strict";
      var cal = Boundaries.incidentEnergyAt18(volts, amps, time);
      cal = parseFloat(cal.toFixed(2));
      return cal;
   },

   incidentEnergyAt18FromJoules : function(joules) {
      "use strict";
      var cal = (3 * joules / 26254) / 4.184;
      return cal;
   },

   incidentEnergyAt18FromJoulesDisplay : function(joules) {
      "use strict";
      var cal = Boundaries.incidentEnergyAt18FromJoules(joules);
      cal = parseFloat(cal.toFixed(2));
      return cal;
   },

   toDisplay : function(cm) {
      var metricDisplay, 
          english = Boundaries.toEnglish(cm);
      if (cm < 100) {
         metricDisplay = cm.toFixed(2) + 'cm';
      }
      else {
         metricDisplay = (cm / 100).toFixed(2) + 'm';
      }
      return metricDisplay +  ' (' + english.feet + "'" + english.inches + '")';
   },
   
   toEnglish : function(cm) {
      "use strict";
      var inches = Math.round(cm * 0.393701);
      return {
         feet: Math.floor(inches / 12),
         inches: inches % 12
      };
   },

   toDisplayKilo : function(value, normalText, kiloText) {
     if (value > 1000) {
       var reduced = value / 1000,
           rounded = parseFloat(reduced.toFixed(3));
       return rounded + ' ' + kiloText;
     }
     else {
       var rounded = parseFloat(value.toFixed(3));
       return rounded + ' ' + normalText;
     }
   },

   toCm : function(inches) {
      return inches / 0.393701;
   }
};