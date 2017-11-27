var requiredTraining = new TrainingCourseList(['ES100', 'ES200', 'ES400', 'ES600', 'ES601', 'ES602', 'ES630', 'ES604', 'ES700', 'ES603']);
var doNotPerformTraining = new TrainingCourseList(['Do Not Perform']);

var SafetyRequirements = {
      
   data : {

      // blue
      '3.0' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a')
      },

      // green
      '3.1*' : {
         '0' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '1' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '2' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a'),
         '3' : SafetyReqs.newReq('Alone', BlueAndGreenCourses, 'None', 'None', 'n/a')
      },

      // yellow
      '3.2a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Eye, No jewelry', 'Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, No jewelry', 'Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, No jewelry', 'Hard Ground Hook')
      },
      '3.2b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock', 'Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Shock', 'Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP, EEWP', 'Shock', 'Hard Ground Hook')
      },
      '3.2c' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Alone', requiredTraining, 'SOP', 'Shock', 'Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Shock', 'Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Shock', 'Hard Ground Hook')
      },

      // red
      '3.3a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Soft Ground Hook followed by Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, No jewelry', 'Soft Ground Hook followed by Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, No jewelry', 'Soft Ground Hook followed by Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Eye, No jewelry', 'Soft Ground Hook followed by Hard Ground Hook')
      },
      '3.3b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Soft Ground Hook followed by Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, Shock', 'Soft Ground Hook followed by Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, Shock', 'Soft Ground Hook followed by Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Eye, Shock', 'Soft Ground Hook followed by Hard Ground Hook')
      },
      '3.3c' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, Ear, Shock', 'Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye, Ear, Shock', 'Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Do Not Perform', doNotPerformTraining, 'Do Not Perform', 'Do Not Perform', 'Do Not Perform')
      },
      '3.3d' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Hard Ground Hook'),
         '1' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye', 'Soft Ground Hook followed by Hard Ground Hook'),
         '2' : SafetyReqs.newReq('Two people', requiredTraining, 'SOP', 'Eye', 'Soft Ground Hook followed by Hard Ground Hook'),
         '3' : SafetyReqs.newReq('Do Not Perform', doNotPerformTraining, 'Do Not Perform', 'Do Not Perform', 'Do Not Perform')
      },

      // maroon
      '3.4a' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Remote Soft Discharge'),
         '1' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, No jewelry', 'Remote Soft Discharge'),
         '2' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, No jewelry', 'Remote Soft Discharge'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Eye, No jewelry', 'Remote Soft Discharge')
      },
      '3.4b' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Remote Soft Discharge'),
         '1' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, Ear, Shock, Arc Flash', 'Remote Soft Discharge'),
         '2' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, Ear, Shock, Arc Flash', 'Remote Soft Discharge'),
         '3' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP, EEWP', 'Eye, Ear, Shock, Arc Flash', 'Remote Soft Discharge')
      },
      '3.4c' : {
         '0' : SafetyReqs.newReq('Alone', requiredTraining, 'None', 'None', 'Remote Soft Discharge'),
         '1' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, Ear, Shock, Arc Flash', 'Remote Soft Discharge'),
         '2' : SafetyReqs.newReq('Safety watch', requiredTraining, 'SOP', 'Eye, Ear, Shock, Arc Flash', 'Remote Soft Discharge'),
         '3' : SafetyReqs.newReq('Do Not Perform', doNotPerformTraining, 'Do Not Perform', 'Do Not Perform', 'Do Not Perform')
      }
   },
   
   lookup : function(classification, mode) {
      "use strict";
      return SafetyReqs.lookup(SafetyRequirements.data, classification, mode);
   }
};