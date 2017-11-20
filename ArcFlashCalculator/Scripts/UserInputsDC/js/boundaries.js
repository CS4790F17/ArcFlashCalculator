var DCShockBoundaries = {
   boundaries : IntervalTree.build({
      // all keys are in volts
      '< 100' : Boundaries.build('Not specified', 'Not specified', 'Not specified'),
      '100-300' : Boundaries.build('1.07m (3\'6")', 'Avoid contact', 'Avoid contact'),
      '300-1000' : Boundaries.build('1.07m (3\'6")', '304.8mm (1\'0")', '25.4mm (0\'1")'),
      '1000-5000' : Boundaries.build('1.53m (5\'0")', '450mm (1\'7")', '100mm (0\'4")'),
      '5000-15000' : Boundaries.build('1.53m (5\'0")', '660.4mm (2\'2")', '178.8mm (0\'7")'),
      '15000-45000' : Boundaries.build('2.5m (8\'0")', '838.2mm (2\'9")', '431.8mm (1\'5")'),
      '45000-75000' : Boundaries.build('2.5m (8\'0")', '1m (3\'2")', '660.4mm (2\'2")'),
      '75000-150000' : Boundaries.build('3m (10\'0")', '1.2m (4\'0")', '1.0m (3\'2")'),
      '150000-250000' : Boundaries.build('4m (11\'8")', '1.7m (5\'8")', '1.6m (5\'2")'),
      '250000-500000' : Boundaries.build('6m (20\'0")', '3.6m (11\'10")', '3.5m (11\'4")'),
      '500000-800000' : Boundaries.build('8m (26\'0")', '5m (16\'5")', '5m (16\'5")')
   }),

   lookup : function(volts) {
      "use strict";
      return DCShockBoundaries.boundaries.get(volts).data();
   }
};