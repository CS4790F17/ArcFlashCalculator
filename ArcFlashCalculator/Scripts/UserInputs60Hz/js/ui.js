var UI = {
    evaluate: function (evt) {
        "use strict";
        var input = UI.processInput($('#voltage-input').val(), $('#transformer-size-input').val(), $('#equipment-type-input').val(),
           $('#short-circuit-current-input').val(), $('#fault-clearing-time-input').val(), $('#work-mode-input').val());

        // show/hide transformer field
        if (input.shouldShowTransformerField) {
            $('#transformer-size-field').show();
        }
        else {
            $('#transformer-size-field').hide();
        }

        // show/ hide equipment type
        if (input.shouldShowEquipmentTypeField) {
            $('#equipment-type-field').show();
        }
        else {
            $('#equipment-type-field').hide();
        }

        // show/hide some other fields
        if (input.shouldShowAdditionalFields) {
            $('#short-circuit-current-field').show();
            $('#fault-clearning-time-field').show();
            $("#toggle-impedance").show();

        }
        else {
            $('#short-circuit-current-field').hide();
            $('#fault-clearning-time-field').hide();
            $("#toggle-impedance").hide();
        }

        if (input.isComplete) {

            //$('#system-information').removeClass('span4').removeClass('offset4').addClass('span3');
            //$('#system-information').removeClass('system-information-side').addClass('system-information-centered');

            // scroll user down to results
            var amps = $("#short-circuit-current-input").val() * 1000; 
            var mode = $('#work-mode-input').val();
            var seconds = parseFloat($('#fault-clearning-time-field').val());

            // show reset button
            UI.show('#form-actions');

            $('#results-wrapper').removeClass('results-wrapper-hidden').addClass('results-wrapper-visible');
            $('#results-wrapper').css('display', 'block');
            $('#results-wrapper').css('opacity', '1');

            $('#navBtm').removeClass('hidden');

            UI.showSummary(input.classification);
            UI.showSafetyRequirements(input.classification, input.mode);
            UI.showBoundaries(input.volts);
            UI.showArcFlashBoundaries(input.mode, input.volts, input.equipmentType, input.classification);
            UI.showTables(input.volts, input.classification, input.safetyTableId);
            UI.showArcFlash(input.volts, amps, input.faultClearingTime, input.equipmentType);
            UI.showPPEFreeSpace(input.mode, input.volts, amps, input.faultClearingTime, input.classification);
            UI.showPPEEnclosed(input.mode, input.volts, amps, input.faultClearingTime, input.classification);
            
            // scroll to results
            // target element
            var $id = $("#results-wrapper");

            // top position relative to the document
            var pos = $id.offset().top - 60;

            // animated top scrolling
            $('body, html').animate({ scrollTop: pos });


        }
        else {
            //$('#system-information').removeClass('span3').addClass('span4').addClass('offset4');
            //$('#system-information').removeClass('system-information-centered').addClass('system-information-side');
            UI.hide('#form-actions');

            $('#results-wrapper').removeClass('results-wrapper-visible').addClass('results-wrapper-hidden');
            $('#results-wrapper').css('display', 'none');
            $('#results-wrapper').css('opacity', '0');
        }
    },

    processInput: function (voltageInput, transformerSizeInput, equipmentTypeInput, shortCircuitCurrentInput, faultClearingTimeInput, modeInput) {
        var volts = parseFloat(voltageInput),
            kva = parseFloat(transformerSizeInput),
            shortCircuitCurrent = parseFloat(shortCircuitCurrentInput),
            faultClearingTime = parseFloat(faultClearingTimeInput),
            mode = modeInput,
            classification,
            shouldShowTransformerField = false,
            shouldShowEquipmentTypeField = false,
            shouldShowAdditionalFields = false,
            areAdditionalFieldsValid = true,
            safetyTableId;

        if (volts && volts > 50 && volts <= 600) {
            shouldShowTransformerField = true;
            shouldShowAdditionalFields = true;

            if (volts > 50 && volts <= 240) {
                classification = Classifications60Hz.lookup(volts, kva);

                // it will always be this equipment type
                shouldShowEquipmentTypeField = false;
                equipmentTypeInput = 'panelboards-240';
            }
            else {
                classification = Classifications60Hz.lookup(volts);
                shouldShowEquipmentTypeField = true;
            }

            // validate additional fields
            areAdditionalFieldsValid = !isNaN(shortCircuitCurrent) && !isNaN(faultClearingTime) && equipmentTypeInput !== '';

            if (areAdditionalFieldsValid) {
                if (equipmentTypeInput === 'panelboards-240') {
                    safetyTableId = (shortCircuitCurrent <= 25 && faultClearingTime <= 0.03) ? 'panelboards-240-table' : 'contact-ahj-table';
                }
                else if (equipmentTypeInput === 'panelboards-240-600') {
                    safetyTableId = (shortCircuitCurrent <= 25 && faultClearingTime <= 0.03) ? 'panelboards-240-600-table' : 'contact-ahj-table';
                }
                else if (equipmentTypeInput === 'mcc-65') {
                    safetyTableId = (shortCircuitCurrentInput <= 65 && faultClearingTime <= 0.03) ? 'mcc-table-65' : 'contact-ahj-table';
                }
                else if (equipmentTypeInput === 'mcc-42') {
                    safetyTableId = (shortCircuitCurrentInput <= 42 && faultClearingTime <= 0.33) ? 'mcc-table-42' : 'contact-ahj-table';
                }
                else if (equipmentTypeInput === 'switchgear') {
                    safetyTableId = (shortCircuitCurrentInput <= 35 && faultClearingTime <= 0.5) ? 'switchgear-table' : 'contact-ahj-table';
                }
                else if (equipmentTypeInput === 'other') {
                    safetyTableId = (shortCircuitCurrentInput <= 65 && faultClearingTime <= 0.03) ? 'other-table' : 'contact-ahj-table';
                }
            }
        }
        else if (volts && volts > 600) {
            shouldShowAdditionalFields = false;
            classification = Classifications60Hz.lookup(volts);
        }
        else {
            classification = Classifications60Hz.lookup(volts);
        }

        return {
            volts: volts,
            kva: kva,
            mode: mode,
            classification: classification,
            shouldShowTransformerField: shouldShowTransformerField,
            shouldShowAdditionalFields: shouldShowAdditionalFields,
            shouldShowEquipmentTypeField: shouldShowEquipmentTypeField,
            safetyTableId: safetyTableId,
            equipmentType: equipmentTypeInput,
            isComplete: classification && mode !== '' && areAdditionalFieldsValid
        };
    },

    showSummary: function (classification) {
        "use strict";
        $('.classification').hide();
        if (classification) {
            $('.classification-display').text(classification);
            var subclass = /\.\d/.exec(classification)[0].replace(/\./, '');
            $('#class-' + subclass).show();
        }
    },

    showSafetyRequirements: function (classification, mode) {
        "use strict";
        var reqs = SafetyRequirements.lookup(classification, mode);
        if (reqs) {
            $('#safety-req-workers-display').text(reqs.qualifiedWorkers);
            $('#safety-req-work-control-display').text(reqs.workControl);
            $('#safety-req-ppe-display').text(reqs.ppe);
        }
    },

    showBoundaries: function (volts) {
        "use strict";
        var boundaries = Boundaries60hz.lookup(volts);
        if (boundaries) {
            $('#limited-approach-fixed-circuit-display').text(boundaries.limitedApproachFixedCircuitPart);
            $('#restricted-approach-display').text(boundaries.restrictedApproach);
            $('#prohibited-approach-display').text(boundaries.prohibitedApproach);
        }
    },

    isHazard: function (mode, classification, volts) {
        return volts < 100 || mode === '0' || classification === '2.0' || classification === '2.1' || classification === '2.2a' || classification === '2.2b';
    },

    showPPEFreeSpace: function (mode, volts, amps, seconds, classification) {
        if (UI.isHazard(mode, classification, volts)) {
            $('#ppe-requirements').hide();
            $('#ppe-requirements-voltage-too-high').hide();
        }
        else {
            var ie = Boundaries.incidentEnergyAt18(volts, amps, seconds);
            if (volts <= 54000 && ie <= 40) {

                $('#ppe-requirements').show();
                $('#ppe-requirements-voltage-too-high').hide();

                $('#glove-class-display').text(SafetyReqs.gloveClassDC(volts));

                if ((volts > 100) && (amps > 500)) {
                    $('.arc-flash-ppe').show();

                    if (ie <= 8) {
                        $('#ppe-low').show();
                        $('#ppe-high').hide();
                    }
                    else {
                        $('#ppe-low').hide();
                        $('#ppe-high').show();
                    }

                    var ppeCalRating = SafetyReqs.ppeCalRating(ie);
                    if (ppeCalRating) {
                        $('#ppe-cal-rating').text(ppeCalRating);
                    }
                }
                else {
                    $('.arc-flash-ppe').hide();
                }
            }
            else {
                $('#ppe-requirements').hide();
                $('#ppe-requirements-voltage-too-high').show();
            }
        }
    },

    showPPEEnclosed: function (mode, volts, amps, seconds, classification) {
        if (UI.isHazard(mode, classification, volts)) {
            $('#enclosed-ppe-requirements').hide();
            $('#enclosed-ppe-requirements-voltage-too-high').hide();
        }
        else {
            var ie = 3 * Boundaries.incidentEnergyAt18(volts, amps, seconds);
            if (volts <= 54000 && ie <= 40) {

                $('#enclosed-ppe-requirements').show();
                $('#enclosed-ppe-requirements-voltage-too-high').hide();

                $('#enclosed-glove-class-display').text(SafetyReqs.gloveClassDC(volts));

                if ((volts > 100) && (amps > 500)) {
                    $('.enclosed-arc-flash-ppe').show();

                    if (ie <= 8) {
                        $('#enclosed-ppe-low').show();
                        $('#enclosed-ppe-high').hide();
                    }
                    else {
                        $('#enclosed-ppe-low').hide();
                        $('#enclosed-ppe-high').show();
                    }

                    var ppeCalRating = SafetyReqs.ppeCalRating(ie);
                    if (ppeCalRating) {
                        $('#enclosed-ppe-cal-rating').text(ppeCalRating);
                    }
                }
                else {
                    $('.enclosed-arc-flash-ppe').hide();
                }
            }
            else {
                $('#enclosed-ppe-requirements').hide();
                $('#enclosed-ppe-requirements-voltage-too-high').show();
            }
        }
    },

    showArcFlash: function (volts, amps, seconds, equipmentTypeInput) {
        "use strict";
        if ((volts > 208) && (amps > 700)) {
            // free space
            //var freeSpaceCal = Boundaries.incidentEnergyAt18OpenDisplay(volts, amps, seconds);
            var freeSpaceCal = 0; 
            
            var arcingCurrentFree = 0;
            var arcingCurrentEnclosed = 0;
            var kFreeSpace = -0.153;
            var kEnclosed = -0.097;
            var conductorGap = 0;
            var incidentEnergy = 0;
            var k1OpenAir = -0.792;
            var k1Enclosed = -0.555;
            var k2 = -0.113;
            var calculationFactor = 1.5;
            var distExponent = 0; 

            if (equipmentTypeInput === 'panelboards-240-600') {
                conductorGap = 25;
                distExponent = 1.641; 
            }
            else if (equipmentTypeInput === 'mcc-65') {
                conductorGap = 25;
                distExponent = 1.641; 
            }
            else if (equipmentTypeInput === 'mcc-42') {
                conductorGap = 25;
                distExponent = 1.641;
            }
            else if (equipmentTypeInput === 'switchgear') {
                conductorGap = 32;
                distExponent = 1.473; 
            }
            else if (equipmentTypeInput === 'other') {
                conductorGap = 32;
                distExponent = 1.473;
            }

            arcingCurrentFree = kFreeSpace + (.662 * Math.log($("#short-circuit-current-input").val())) + 0.0966 * volts + 0.000526 * conductorGap + 0.5588 * volts * Math.log($("#short-circuit-current-input").val()) - 0.00304 * conductorGap * Math.log($("#short-circuit-current-input").val());
            arcingCurrentFree = Math.log(arcingCurrentFree); 
           
            incidentEnergy = k1OpenAir + k2 + 1.081 * arcingCurrentFree + 0.001 * conductorGap;
            incidentEnergy = Math.log(incidentEnergy);

            incidentEnergy = Math.pow(10, incidentEnergy);

            freeSpaceCal = 4.184 * calculationFactor * incidentEnergy * ($("#fault-clearing-time-input").val() / 0.2) * (Math.pow(610, distExponent) / Math.pow(458, distExponent));

            $('#arc-flash-free-space-incident-energy').html(freeSpaceCal + ' cal/cm<sup>2</sup>');
            $('#arc-flash-display-free-space').text(Boundaries.arcFlashOpen(volts, amps, seconds));

            // enclosed space
            var cal = Boundaries.incidentEnergyAt18Display(volts, amps, seconds);
            $('#arc-flash-incident-energy').html(cal + ' cal/cm<sup>2</sup>');
            $('#arc-flash-display-enclosed-space').text(Boundaries.arcFlashEnclosed(volts, amps, seconds));
        }
        else {
            $('#arc-flash-incident-energy').text('Not applicable');
            $('#arc-flash-display-enclosed-space').text('Not applicable');
            $('#arc-flash-free-space-incident-energy').text('Not applicable');
            $('#arc-flash-display-free-space').text('Not applicable');
        }
    },

    showArcFlashBoundaries: function (mode, volts, equipmentType, classification) {
        if (mode === '0' || '1.0' === classification || '1.1' === classification || '1.2a' === classification) {
            $('#arc-flash-boundaries').hide();
        }
        else {
            $('#arc-flash-boundary-display-container').show();
            $('#arc-flash-voltage-too-high').hide();

            if (volts <= 600) {
                if (equipmentType === "panelboards-240-600") {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(30)));
                }
                else if (equipmentType === "mcc-65") {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(53)));
                }
                else if (equipmentType === "mcc-42") {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(165)));
                }
                else if (equipmentType === "switchgear") {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(233)));
                }
                else if (equipmentType === "other") {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(53)));
                }
                else {
                    $('#arc-flash-boundary-display').text(Boundaries.toDisplay(Boundaries.toCm(19)));
                }
            }
            else {
                $('#arc-flash-voltage-too-high').show();
                $('#arc-flash-boundary-display-container').hide();
            }

            $('#arc-flash-boundaries').show();
        }
    },

    showTables: function (volts, classification, safetyTableId) {
        var subclass = /\.\d/.exec(classification)[0].replace(/\./, ''),
            tableSelector = '#' + safetyTableId,
            thSelector = tableSelector + ' th',
            thClass = 'class-' + subclass;

        $('#glove-class-display').text(SafetyReqs.gloveClassAC(volts));

        $('.table-130').hide();
        if (safetyTableId) {
            $('#safety-tables').show();
            $(tableSelector).show();

            $(thSelector + ', #ppe-requirements th').removeClass('class-0').removeClass('class-1').removeClass('class-2').removeClass('class-3').removeClass('class-4').removeClass('class-5').addClass(thClass);;

            if ('contact-ahj-table' === safetyTableId) {
                $('#ppe-requirements').hide();
            }
            else {
                $('#ppe-requirements').show();
            }
        }
        else {
            $('#safety-tables').hide();
            $('#ppe-requirements').hide();
        }
    },

    reset: function (evt) {
        "use strict";
        evt.preventDefault();
        $('#voltage-input').val('');
        $('#transformer-size-input').val('');
        $('#equipment-class-input').val('');
        $('#work-mode-input').val('');
        UI.evaluate();
    },

    show: function (selector) {
        $(selector).css({ 'opacity': '1', 'height': 'auto' });
    },

    hide: function (selector) {
        $(selector).css({ 'opacity': '0', 'height': '0' });
    }
};

$(function () {
    "use strict";

    // initially hiding optional fields
    $('#transformer-size-field').hide();
    $('#equipment-class-field').hide();

    UI.evaluate();

    // bind form fields
    $('#voltage-input, #transformer-size-input, #short-circuit-current-input, #fault-clearing-time-input').bind('textchange', UI.evaluate);
    $('#equipment-type-input, #work-mode-input').bind('change', UI.evaluate);

    // make sure that the user must re-enter the work mode if they are going to adjust the voltage
    // this will prevent the form submitting if the use is entering a multi digit number
    jQuery('#voltage-input').on('input', function () {
        // do your stuff
        $('#work-mode-input').val('');
    });

    // set button actions
    $('#reset-button').bind('click', UI.reset);

    // when back to top link is pressed send user back to the top
    $('#backToTop').click(function () {
        $('#navBtm').addClass('hidden');
    });

     //when user scrolls to top hide nav bar
    $(window).scroll(function () {
        var top_offset = $(window).scrollTop();
        if (top_offset == 0) {
            $('#navBtm').addClass('hidden');
        }
    });

    var manualImpedance = true;
    $("#manualShortCircuitCurrent").hide();
    $("#toggle-impedance").hide();

    $("#toggle-impedance").click(function () {
        
        if (manualImpedance) {
            manualImpedance = false;
            $("#manualShortCircuitCurrent").show();
            $("#short-circuit-current-field").hide();

        } else {
            manualImpedance = true;
            $("#short-circuit-current-field").show();
            $("#manualShortCircuitCurrent").hide();

        }
    });

    //$(document).scroll(function () {
    //    if ($(window).scrollTop() === 0) {
    //        $('#navBtm').addClass('hidden');
    //        //alert("we are at the top");
    //    } else {
    //        //alert("we are not at the top");
    //        $('#navBtm').removeClass('hidden');
    //    }
    //});

    $('[data-toggle="tooltip"]').tooltip();

    $('[data-toggle="popover"]').popover();

    $("#voltage-input").keyup(function () {
        var value = $("#voltage-input").val();
        if (value > 600 || value < 0) {
            $("#voltage-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#transformer-size-input").keyup(function () {
        var value = $("#transformer-size-input").val();
        if (value > 20000 || value < 0.5) {
            $("#trans-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#short-circuit-current-input").keyup(function () {
        var value = $("#short-circuit-current-input").val();
        if (value > 500 || value < 1) {
            $("#scc-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#fault-clearing-time-input").keyup(function () {
        var value = $("#fault-clearing-time-input").val();
        if (value < 0 || value > 2) {
            $("#fault-clearing-time-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#short-circuit-current-length").keyup(function () {
        var value = $("#short-circuit-current-length").val();
        if (value > 10000 || value < 1) {
            $("#length-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#short-circuit-current-number").keyup(function () {
        var value = $("#short-circuit-current-number").val();
        if (value < 0 || value > 10) {
            $("#number-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#transformer-impedance-input").keyup(function () {
        var value = $("#transformer-impedance-input").val();
        if (value > 20 || value < 1) {
            $("#impedance-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#calculate-SCC").click(function () {
        var voltage = $("#voltage-input").val(); 
        var transImped = $("#transformer-impedance-input").val(); 
        var transSize = $("#transformer-size-input").val(); 
        var cableLength = $("#short-circuit-current-length").val();
        var conductorSize = $("#short-circuit-current-size").val();
        var conductorNumber = $("#short-circuit-current-number").val();
        var conductorType = $("#short-circuit-current-conductor").val();
        var conduitType = $("#short-circuit-current-conduit").val();
        var transShortCircuitCurrent = 0; 
        var shortCircuitCurrent = 0;
        var FLACurrent = 0;
        const sqrtThree = 1.732050;
        var FFactor = 0;
        var C = 0;
        var M = 0;
        var bufferedSCC = 0; 

        C = 1 / (altCurrentResistTable[conductorSize][conductorType][conduitType] / 1000);

        FLACurrent = (transSize * 1000) / (voltage * sqrtThree);
        transShortCircuitCurrent = FLACurrent * (100 / transImped);
        FFactor = (sqrtThree * cableLength * transShortCircuitCurrent) / (conductorNumber * C * voltage);

        M = 1 / (1 + FFactor);

        shortCircuitCurrent = transShortCircuitCurrent * M;

        //Then calculate the SCC
        //Add on a conservatively high estimate for a safety buffer
        bufferedSCC = 1.053 * shortCircuitCurrent; 

        //Display the calculate SCC value, for testing purposes only 
        $("#scc-result").val(bufferedSCC);

        bufferedSCC = bufferedSCC / 1000; 
        //Set the SCC variable to the calculated value
        $("#short-circuit-current-input").val(bufferedSCC); 

    });


    

});
