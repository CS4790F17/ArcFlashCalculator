/*
'< X' means LESS THAN OR EQUAL TO X
'X-Y' means GREATHER THAN X and LESS THAN OR EQUAL TO Y
'> X' means GREATER THAN X
*/
var IntervalTree = {
   build : function(data) {
      "use strict";
      
      return {
         get : function(forVal) {
            var node, key, parts;

            for (key in data) {
               parts = key.split(/[\s\-]/);
               if (parts.length === 2) {
                  // assume the key represents a range
                  if ('<' === parts[0]) {
                     if (forVal <= parseFloat(parts[1])) {
                        node = data[key];
                        break;
                     }
                  } else if ('>' === parts[0]) {
                     if (forVal > parseFloat(parts[1])) {
                        node = data[key];
                        break;
                     }
                  } else {
                     if ((forVal > parseFloat(parts[0])) && (forVal <= parseFloat(parts[1]))) {
                        node = data[key];
                        break;
                     }
                  }
               }
               else {
                  // assume the key represents a literal
                  if (key === forVal) {
                     node = data[key];
                     break;
                  }
               }
            }
            
            return IntervalTree.build(node);
         },
         
         data : function() {
            return data;
         }
      };
   }
};