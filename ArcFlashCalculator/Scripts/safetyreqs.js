var SafetyReqs = {
   newReq : function(qualifiedWorkers, trainingStatus, workControl, ppe, energyRemoval) {
      "use strict";
      return {
         qualifiedWorkers : qualifiedWorkers,
         trainingStatus : trainingStatus,
         workControl : workControl,
         ppe : ppe,
         energyRemoval : energyRemoval
      };
   },

   lookup : function(data, classification, mode) {
      "use strict";
      var classificationResults, key, regexStr, regex;

      // try a direct lookup first
      classificationResults = data[classification];

      // if we didn't find it, try to match on the regex
      if (!classificationResults) {
         for (key in data) {
            // turn key into regex
            regexStr = key.replace(/\./, '\\.').replace(/\*/, '\\w');
            regex = new RegExp(regexStr, 'g');
            
            // check if classification matches regex key
            if (regex.test(classification)) {
               classificationResults = data[key];
               break;
            }
         }
      }

      return classificationResults ? classificationResults[mode] : null;
   },

   gloveClassAC : function(volts) {
      if (volts <= 500) {
         return 'Class 00';
      }
      else if (volts <= 1000) {
         return 'Class 0';
      }
      else if (volts <= 7500) {
         return 'Class 1';
      }
      else if (volts <= 17000) {
         return 'Class 2';
      }
      else if (volts <= 26500) {
         return 'Class 3';
      }
      else if (volts <= 36000) {
         return 'Class 4';
      }
      else {
         return null;
      }
   },

   gloveClassDC : function(volts) {
      if (volts <= 750) {
         return 'Class 00';
      }
      else if (volts <= 1500) {
         return 'Class 0';
      }
      else if (volts <= 11250) {
         return 'Class 1';
      }
      else if (volts <= 25500) {
         return 'Class 2';
      }
      else if (volts <= 39750) {
         return 'Class 3';
      }
      else if (volts <= 54000) {
         return 'Class 4';
      }
      else {
         return null;
      }
   },

   ppeCalRating : function(ie) {
      if (ie <= 4) {
         return 4;
      }
      else if (ie <= 8) {
         return 8;
      }
      else if (ie <= 25) {
         return 25;
      }
      else if (ie <= 40) {
         return 40;
      }
      else {
         return null;
      }
   }
};