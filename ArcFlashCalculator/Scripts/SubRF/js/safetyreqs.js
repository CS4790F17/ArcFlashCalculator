var requiredCourses = new TrainingCourseList(['ES100', 'ES200', 'ES400', 'ES600', 'ES601', 'ES602', 'ES603', 'ES604', 'ES630', 'ES700']);

var SubRFSafetyRequirements = {
      
   data : {
      // green
      '6.1*' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None')
      },

      // yellow
      '6.2a' : {
         '0' : SafetyReqs.newReq('Alone', requiredCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredCourses, 'SOP', 'Insulated tools, gloves'),
         '2' : SafetyReqs.newReq('Two people', requiredCourses, 'SOP', 'Insulated tools, gloves'),
         '3' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP, EEWP', 'Insulated tools, gloves')
      },
      '6.2b' : {
         '0' : SafetyReqs.newReq('Alone', requiredCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Two people', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP, EEWP', 'Shock Hazard Analysis')
      },
      '6.2c' : {
         '0' : SafetyReqs.newReq('Alone', requiredCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Alone', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Two people', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // red
      '6.3' : {
         '0' : SafetyReqs.newReq('Alone', requiredCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP', 'Shock Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP, EEWP', 'Shock Hazard Analysis')
      },

      // maroon
      '6.4' : {
         '0' : SafetyReqs.newReq('Alone', requiredCourses, 'None', 'None'),
         '1' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP', 'Shock and Arc-Flash Hazard Analysis'),
         '2' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP', 'Shock and Arc-Flash Hazard Analysis'),
         '3' : SafetyReqs.newReq('Safety watch', requiredCourses, 'SOP, EEWP', 'Shock and Arc-Flash Hazard Analysis')
      }
   },
   
   lookup : function(classification, mode) {
      "use strict";
      return SafetyReqs.lookup(SubRFSafetyRequirements.data, classification, mode);
   }
};