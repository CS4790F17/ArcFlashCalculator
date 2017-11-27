var batteryBlueAndGreenTraining = new TrainingCourseList(['ES100', 'ES200']);
var batteryYellowRequiredTraining = new TrainingCourseList(['ES100', 'ES200', 'ES301', 'ES600', 'ES601', 'ES602', 'ES630','ES700']);
var batteryRedRequiredTraining = new TrainingCourseList(['ES100', 'ES200', 'ES301', 'ES400', 'ES600', 'ES601', 'ES602', 'ES630', 'ES700']);

var SafetyRequirements = {
      
   data : {

      // blue
      '4.0' : {
         '2' : SafetyReqs.newReq('Alone', batteryBlueAndGreenTraining, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', batteryBlueAndGreenTraining, 'None', 'None')
      },

      // green
      '4.1a' : {
         '2' : SafetyReqs.newReq('Alone', batteryBlueAndGreenTraining, 'None', 'No jewelry'),
         '3' : SafetyReqs.newReq('Alone', batteryBlueAndGreenTraining, 'None', 'No jewelry')
      },
      '4.1b' : {
         'whilecharging' : SafetyReqs.newReq('Alone', batteryBlueAndGreenTraining, "Charge per manufacturer's instructions using the supplied charger.", 'None')
      },

      // yellow
      '4.2a' : {
         '2' : SafetyReqs.newReq('Two people', batteryYellowRequiredTraining, 'SOP', 'Eye, no jewelry'),
         '3' : SafetyReqs.newReq('Safety watch', batteryYellowRequiredTraining, 'SOP, EEWP', 'Eye, no jewelry')
      },
      '4.2b' : {
         'whilecharging' : SafetyReqs.newReq('Alone', batteryYellowRequiredTraining, 'SOP', 'None')
      },

      // red
      '4.3a' : {
         '2' : SafetyReqs.newReq('Safety watch', batteryRedRequiredTraining, 'SOP', 'Eye, no jewelry'),
         '3' : SafetyReqs.newReq('Safety watch', batteryRedRequiredTraining, 'SOP, EEWP', 'Eye, no jewelry, special battery tools')
      },
      '4.3b' : {
         'whilecharging' : SafetyReqs.newReq('Alone', batteryRedRequiredTraining, 'SOP', 'Containment, monitor temp using thermocouples')
      }
   },
   
   lookup : function(classification, mode) {
      "use strict";
      return SafetyReqs.lookup(SafetyRequirements.data, classification, mode);
   }
};