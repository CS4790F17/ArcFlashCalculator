var Boundaries60hz = {
   build : function(limitedApproachMovableConductor, limitedApproachFixedCircuitPart, restrictedApproach, prohibitedApproach) {
      var b = Boundaries.build(limitedApproachFixedCircuitPart, restrictedApproach, prohibitedApproach);
      b.limitedApproachMovableConductor = limitedApproachMovableConductor;
      return b;
   },

   boundaries : function() {
      return IntervalTree.build({
      // all keys are in volts
      '< 50' : Boundaries60hz.build('Not specified', 'Not specified', 'Not specified', 'Not specified'),
      '50-300' : Boundaries60hz.build('3.05m (10\'0")', '1.07m (3\'6")', 'Avoid contact', 'Avoid contact'),
      '300-750' : Boundaries60hz.build('3.05m (10\'0")', '1.07m (3\'6")', '304.8mm (1\'0")', '25.4mm (0\'1")'),
      '750-15000' : Boundaries60hz.build('3.05m (10\'0")', '1.53m (5\'0")', '660.4mm (2\'2")', '178.8mm (0\'7")'),
      '15000-36000' : Boundaries60hz.build('3.05m (10\'0")', '1.83m (6\'0")', '787.4mm (2\'7")', '254mm (0\'10")'),
      '36000-46000' : Boundaries60hz.build('3.05m (10\'0")', '2.44m (8\'0")', '838.2mm (2\'9")', '431.8mm (1\'5")'),
      '46000-72500' : Boundaries60hz.build('3.05m (10\'0")', '2.44m (8\'0")', '1.0m (3\'3")', '660mm (2\'2")'),
      '72500-121000' : Boundaries60hz.build('3.25m (10\'8")', '2.44m (8\'0")', '1.29m (3\'4")', '838mm (2\'9")'),
      '121000-145000' : Boundaries60hz.build('3.36m (11\'0")', '3.05m (10\'0")', '1.15m (3\'10")', '1.02m (3\'4")'),
      '145000-169000' : Boundaries60hz.build('3.56m (11\'8")', '3.56m (11\'8")', '1.29m (4\'3")', '1.14m (3\'9")'),
      '169000-242000' : Boundaries60hz.build('3.97m (13\'0")', '3.97m (13\'0")', '1.71m (5\'8")', '1.57m (5\'2")'),
      '242000-362000' : Boundaries60hz.build('4.68m (15\'4")', '4.68m (15\'4")', '2.77m (9\'2")', '2.79m (8\'8")'),
      '362000-550000' : Boundaries60hz.build('5.8m (19\'0")', '5.8m (19\'0")', '3.61m (11\'10")', '3.54m (11\'4")'),
      '550000-800000' : Boundaries60hz.build('7.24m (23\'9")', '7.24m (23\'9")', '4.84m (15\'11")', '4.7m (15\'5")')
   })},

   lookup : function(volts) {
      "use strict";
      return Boundaries60hz.boundaries().get(volts).data();
   }
};