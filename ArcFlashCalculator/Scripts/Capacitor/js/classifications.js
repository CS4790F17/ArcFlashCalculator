var Classifications = {

   classifications : IntervalTree.build({
      // volts
      '< 100' : {
         '< 100' : '3.1a', // joules
         '100-1000' : '3.2a', // joules
         '1000-10000' : '3.3a', // joules
         '> 10000' : '3.4a'
      },

      // volts
      '100-400' : {
         '< 1' : '3.1b', // joules
         '1-100' : '3.2b', // joules
         '100-10000' : '3.3b', // joules
         '> 10000' : '3.4b' // joules
      },

      // volts
      '> 400' : {
         '< 0.25' : '3.1d', // joules
         '0.25-50' : '3.2c', // joules
         '50-1000' : '3.3c', // joules
         '1000-10000' : '3.3d', // joules
         '> 10000' : '3.4c'
      }
   }),
   
   lookup : function(voltage, joules) {
      "use strict";
      return Classifications.classifications.get(voltage).get(joules).data();
   }
};
