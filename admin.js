// Keith Hough, keithsportfolio.com, 2017

"use strict";

// create constant
const LOCAL_STORAGE_KEY = "asu-courses";

var getById = function (id) { return document.getElementById(id); };

// list of classes array
var courses = [];

// user initiates
var addClass = function() {
    // create object
    var course = {};
    // capture user input
    var courseName = getById("course-name").value;
    var courseNumber = getById("course-number").value.toUpperCase();
    var courseDate = getById("course-date").value;
    var courseLength = getById("course-length").value;
    var courseDay = getById("course-day").value;
    var courseTime = getById("course-time").value;
    var courseDescription = getById("course-desc").value;

    // validate user input
    // boolean traced in validateInput function
    if (validateInput(courseName, courseNumber, courseDate, courseDescription) === true) {

        // object accepts properties/values
        course = {
                name: courseName,
                number: courseNumber,
                date: courseDate,
                length: courseLength,
                day: courseDay,
                time: courseTime,
                description: courseDescription
            };

            // course object added to courses array
            courses.push(course);
            // add course object/s to local storage
            addLocalStorage();
            // course object displayed on screen
            addCourseToTable(courseName, courseNumber, courseDate, courseLength, courseDay, courseTime, courseDescription);
            // form is cleared and re-focused
            refreshForm();
    };
};

// receive all user input
var addCourseToTable = function(courseName, courseNumber, courseDate, courseLength, courseDay, courseTime, courseDescription) {
        getById("table-body-courses").innerHTML += "<tr><td>" + courseName + "</td><td>" + courseNumber + "</td><td>" + courseDate + "</td><td>" + courseLength + "</td><td>" + courseDay + "</td><td>" + courseTime + "</td><td>" + courseDescription + "</td></tr>";
};

// add array of object/s to local storage
var addLocalStorage = function() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
};

// check local storage for saved courses
var getLocalStorage = function() {
    var storage = localStorage.getItem(LOCAL_STORAGE_KEY);
        // if there are saved courses
        if (storage !== null) {
        // and converts back to objects in global array
        courses = JSON.parse(storage);

        // update table
        for (var i = 0; i < courses.length; i++) {
            // pass each object
            addCourseToTable(courses[i].name, courses[i].number, courses[i].date, courses[i].length, courses[i].day, courses[i].time, courses[i].description);
        }
    }
};

// javascript 31 days for each month, isValidDate matches months with max day
var isValidDate = function(year, month, day) {
    month = month - 1;
    var d = new Date(year, month, day);
    if (d.getFullYear() == year && d.getMonth() == month && d.getDate() == day) {
        return true;
    }
    return false;
};

var refreshForm = function() {
    getById("course-name").value = "";
    getById("course-number").value = "";
    getById("course-date").value = "";
    getById("course-desc").value = "";
    getById("course-name").focus();
};

// receive user input that needs validation
var validateInput = function(courseName, courseNumber, courseDate, courseDescription) {

    // for tracking if all input is valid
    var isValid = true;
    // reset any input error text to clear single messages
    getById("error-course-name").innerHTML = "";
    getById("error-course-number").innerHTML = "";
    getById("error-course-start").innerHTML = "";
    getById("error-course-description").innerHTML = "";

    // input is left empty
    if (courseName === "") {
        getById("error-course-name").innerHTML = "Enter a Class Name";
        getById("course-name").focus();
        isValid = false;
    }

    // input is left empty
    if (courseNumber === "") {
        getById("error-course-number").innerHTML = "Enter a Class Number";
        if (isValid === true) {
            getById("course-number").focus();
            isValid = false;
        }
    }
    // input needs to be abc-123 formatted by user
    else {

        var courseNumberPattern = /^[A-Z]{3}-\d{3}$/;

        if (courseNumberPattern.test(courseNumber) === false) {
            getById("error-course-number").innerHTML = "Must be ABC-123 Format";
            if (isValid === true) {
                getById("course-number").focus();
                isValid = false;
            }
        }
    }
    // if left empty
    if (courseDate === "") {
        getById("error-course-start").innerHTML = "Enter a Start Date";
        if (isValid === true) {
            getById("course-date").focus();
            isValid = false;
        }
    }
    // if date is not empty
    else {

        var courseDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;

        if (courseDatePattern.test(courseDate) === false) {
            getById("error-course-start").innerHTML = "Must be XX/XX/XXXX Format";
            if (isValid === true) {
                getById("course-date").focus();
                isValid = false;
            }
        }
        // else date format is valid
        else {

            var month = courseDate.substr(0, 2);
            var day = courseDate.substr(3, 2);
            var year = courseDate.substr(6, 4);

            // check if date is valid
            if (isValidDate(year, month, day) === false) {
                getById("error-course-start").innerHTML = "Enter a Valid Date";
                if (isValid === true) {
                    getById("course-date").focus();
                    isValid = false;
                }
            }
            // date object is valid
            else {
                // make sure the user date is in future

                var courseDateObject = new Date(courseDate);

                var today = new Date();
                var dateDifference = courseDateObject.getTime() - today.getTime();

                if (dateDifference < 0) {
                    getById("error-course-start").innerHTML = "Enter a Future Date";
                    if (isValid === true) {
                        getById("course-date").focus();
                        isValid = false;
                    }
                }
            } // else date object is valid
        } // else date format is valid
    } // else date not empty

    // check for empty input
    if (courseDescription === "") {
        getById("error-course-description").innerHTML = "Enter a Class Description";
        if (isValid === true) {
            getById("course-desc").focus();
            isValid = false;
        }
    }
    return isValid;
};

window.onload = function() {
    getLocalStorage();
    getById("add-class").onclick = addClass;
    getById("course-name").focus();
}
