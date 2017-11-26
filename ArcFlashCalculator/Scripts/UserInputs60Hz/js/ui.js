var UI = {
    evaluate: function (evt) {
        "use strict";
        var input = UI.processInput($('#voltage-input').val(), $('#transformer-size-input').val(), $('#equipment-type-input').val(),
           $('#short-circuit-current-input').val(), $('#fault-clearing-time-input').val(), $('#work-mode-input').val());

        // show/hide transofmer field
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
        if (value > 2 || value < 0.003) {
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
        if (value < 0 || value < 10) {
            $("#number-range-warning").removeClass("hidden").addClass("visible");
        }
    });

    $("#calculate-SCC").click(function () {
        var cableLength = $("#short-circuit-current-length").val();
        var conductorSize = $("#short-circuit-current-size").val();
        var conductorNumber = $("#short-circuit-current-number").val();
        var conductorType = $("#short-circuit-current-conductor").val();
        var conduitType = $("#short-circuit-current-conduit").val();


    });


    

});
