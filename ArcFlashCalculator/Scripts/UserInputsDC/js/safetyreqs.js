var requiredTraining = new TrainingCourseList(['ES100', 'ES200', 'ES400', 'ES600', 'ES601', 'ES602', 'ES630', 'ES604', 'ES700', 'ES603']); 

var DCSafetyRequirements = {
      
   data : {

      // blue
      '2.0' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None')
      },

      // Green
      '2.1*' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None')
      },

      // yellow
      '2.2a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Insulated tools, gloves'),
         '2' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Insulated tools, gloves'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Insulated tools, gloves')
      },

      // yellow
      '2.2b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Insulated tools, gloves'),
         '2' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Insulated tools, gloves'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Insulated tools, gloves')
      },

      // yellow
      '2.2c' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // yellow
      '2.2d' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // red
      '2.3a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      },

      // red
      '2.3b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Two Person', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // maroon
      '2.4' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None'),
         '1' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety Watch', requiredTraining, 'SOP', 'Shock Hazard Analysis and Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Shock Hazard Analysis and Flash Hazard Analysis')
      }
   },
   
   lookup : function(classification, mode) {
      "use strict";
      return SafetyReqs.lookup(DCSafetyRequirements.data, classification, mode);
   }
};