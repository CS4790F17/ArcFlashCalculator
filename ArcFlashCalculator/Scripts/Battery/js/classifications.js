var Classifications = {

   classifications : IntervalTree.build({
      // text
      'liioncommercial' : '4.1b',
      'liionsinglecell' : '4.2b',
      'liionmulticell' : '4.3b',

      // watts
      '< 100' : '4.0',
      '100-1000' : '4.1a',
      '1000-30000' : '4.2a',
      '> 30000' : '4.3a'
   }),
   
   lookup : function(wattsOrType) {
      "use strict";
      return Classifications.classifications.get(wattsOrType).data();
   }
};
