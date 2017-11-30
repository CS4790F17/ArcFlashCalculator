var Classifications = {

   classifications : IntervalTree.build({
      // volts
      '< 50' : {
         '< 1000' : '6.1a', // watts
         '> 1000' : '6.2a' // watts
      },

      // volts
      '50-250' : {
         '< 5' : '6.1b', // mA
         '> 5' : '6.2b' // mA
      },

      // volts
      '> 250' : {
         '< 5' : '6.1c', // mA
         '5-75' : '6.2c', // mA
         '75-500000' : '6.3', // mA
         '> 500000' : '6.4' // mA
      }
   }),
   
   lookup : function(val1, val2) {
      "use strict";
      return Classifications.classifications.get(val1).get(val2).data();
   }
};
