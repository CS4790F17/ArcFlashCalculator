var requiredTraining = new TrainingCourseList(['ES100', 'ES200', 'ES400', 'ES600', 'ES601', 'ES602', 'ES630', 'ES604', 'ES700']); 

var SafetyRequirements = {
   
   data : {
      // blue
      '1.0' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None')
      },

      // green
      '1.1' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None')
      },

      // yellow
      '1.2a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // red
      '1.3a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      },

      // red
      '1.3b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      },

      // maroon
      '1.4' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      },

      // maroon
      '1.5' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '1' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      }
   },
   
   lookup : function(classification, mode) {
      "use strict";
      return SafetyReqs.lookup(SafetyRequirements.data, classification, mode);
   }
};