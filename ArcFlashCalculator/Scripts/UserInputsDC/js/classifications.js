var DCData = {

   classifications : IntervalTree.build({
      // volts
      '< 15' : {
         '< 100' : '2.0', // watts
         '100-1000' : '2.1a', // watts
         '> 1000' : '2.2a' // watts
      },

      // volts
      '15-100' : {
         '< 1000' : '2.1b', // watts
         '> 1000' : '2.2b' // watts
      },

      // volts
      '100-400' : {
         '< 40' : '2.1c', // mA
         '40-500000' : '2.2c', // mA
         '> 500000' : '2.3a' // mA
      },

      // volts
      '> 400' : {
         '< 40' : '2.1d', // mA
         '40-200' : '2.2d', // mA
         '200-500000' : '2.3b', // mA
         '> 500000' : '2.4' // mA
      }
   }),
   
   lookup : function(val1, val2) {
      "use strict";
      return DCData.classifications.get(val1).get(val2).data();
   }
};
