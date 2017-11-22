var Classifications60Hz = {

   classifications : IntervalTree.build({
      // all in volts
      '< 15' : '1.0',
      '15-50' : '1.1',
      '50-240' : {
         '< 125' : '1.2a', // kVA
         '> 125' : '1.3a' // mA
      },
      '240-600' : '1.3b',
      '> 600' : '1.5'
   }),
   
   lookup : function(val1, val2) {
      "use strict";
      var classification;
      if (val2) {
         classification = Classifications60Hz.classifications.get(val1).get(val2).data();
      }
      else {
         classification = Classifications60Hz.classifications.get(val1).data();
      }

      return classification;
   }
};
