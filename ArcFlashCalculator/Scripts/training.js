var TrainingCourseList = function(courses) {
    this.courses = courses;
};

TrainingCourseList.prototype.toDisplay = function() {
    // var display = '<ul>', course;
    // for (i in this.courses) {
    //     course = this.courses[i];
    //     display += '<li>' + this.titleLookup[course] + ' (' + course + ')</li>';
    // }
    // display += '</ul>'
    // return display;

    var fullNames = [], course;
    for (i in this.courses) {
        course = this.courses[i];

        if (this.titleLookup[course] == null) {
            fullNames.push(course);
        }
        else {
            fullNames.push(this.titleLookup[course] + ' (' + course + ')');
        }
    }
    return fullNames.join(', ');
}

TrainingCourseList.prototype.titleLookup = {
    'ES100': 'Electrical Hazards in R&D Labs',
    'ES200': 'Working with Electrical Equipment',
    'ES301': 'Battery Safety',
    'ES400': 'Electrical Safety for High Voltage, High Current and High Power R&D',
    'ES600': 'Use a Digital Multi-meter Safely',
    'ES601': 'Repair / Replace Power Cords & Plugs',
    'ES602': 'Selection, Care, Use, and Testing of Electrical PPE',
    'ES603': 'Selection, Inspection, and use of Personnel Safety Ground',
    'ES604': 'Lock Out Tag Out - LOTO',
    'ES630': 'Design and Inspection of Electrical Equipment for Electrical Safety',
    'ES700': 'Task Specific Selection of PPE',
    'Do Not Perform' : null
};

var BlueAndGreenCourses = new TrainingCourseList(['ES100', 'ES200', 'ES600']);