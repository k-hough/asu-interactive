"use strict";

const LOCAL_STORAGE_KEY = "asu-courses";

var getById = function (id) { return document.getElementById(id); };
var courses = [];

/*
var getLocalStorage = function() {
    if (localStorage.length > 0) {
        console.log(localStorage.length);
    }
};
*/

var addClass = function() {

    //checkLocalStorage();

    var course = {};
    var courseName = getById("course-name").value;
    var courseNumber = getById("course-number").value.toUpperCase();
    var courseDate = getById("course-date").value;
    var courseLength = getById("course-length").value;
    var courseDay = getById("course-day").value;
    var courseTime = getById("course-time").value;
    var courseDesc = getById("course-desc").value;

    if (validateInput(courseName, courseNumber, courseDate, courseDesc) === true) {

        course = {
                name: courseName,
                number: courseNumber,
                date: courseDate,
                length: courseLength,
                day: courseDay,
                time: courseTime,
                description: courseDesc
            };

            courses.push(course);

            addLocalStorage();

            addCourseToTable(courseName, courseNumber, courseDate, courseLength, courseDay, courseTime, courseDesc);

            refreshForm();

    };

};

var validateInput = function(courseName, courseNumber, courseDate, courseDesc) {

    var isValid = true;
    getById("error-course-name").innerHTML = "";
    getById("error-course-number").innerHTML = "";
    getById("error-course-start").innerHTML = "";
    getById("error-course-description").innerHTML = "";

    if (courseName === "") {
        getById("error-course-name").innerHTML = "Enter a Class Name";
        getById("course-name").focus();
        isValid = false;
    }

    if (courseNumber === "") {
        getById("error-course-number").innerHTML = "Enter a Class Number";
        if (isValid === true) {
            getById("course-number").focus();
            isValid = false;
        }
    }
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
    if (courseDate === "") {
        getById("error-course-start").innerHTML = "Enter a Start Date";
        if (isValid === true) {
            getById("course-date").focus();
            isValid = false;
        }
    }
    else {

        var courseDatePattern = /^\d{2}\/\d{2}\/\d{4}$/;

        if (courseDatePattern.test(courseDate) === false) {
            getById("error-course-start").innerHTML = "Must be XX/XX/XXXX Format";
            if (isValid === true) {
                getById("course-date").focus();
                isValid = false;
            }
        }
    }

    var courseDateObject = new Date(courseDate);

    if (courseDateObject.toString() === "Invalid Date") {
        getById("error-course-start").innerHTML = "Enter a Valid Date";
        if (isValid === true) {
            getById("course-date").focus();
            isValid = false;
        }
    }
    else {
        var today = new Date();
        var dateDifference = courseDateObject.getTime() - today.getTime();

        if (dateDifference < 0) {
            getById("error-course-start").innerHTML = "Enter a Future Date";
            if (isValid === true) {
                getById("course-date").focus();
                isValid = false;
            }
        }
    }

    if (courseDesc === "") {
        getById("error-course-description").innerHTML = "Enter a Class Description";
        if (isValid === true) {
            getById("course-desc").focus();
            isValid = false;
        }
    }
    return isValid;
};

var addCourseToTable = function(courseName, courseNumber, courseDate, courseLength, courseDay, courseTime, courseDesc) {
        getById("table-body-courses").innerHTML += "<tr><td>" + courseName + "</td><td>" + courseNumber + "</td><td>" + courseDate + "</td><td>" + courseLength + "</td><td>" + courseDay + "</td><td>" + courseTime + "</td><td>" + courseDesc + "</td></tr>";
};

var addLocalStorage = function() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(courses));
};

var refreshForm = function() {
    getById("course-name").value = "";
    getById("course-number").value = "";
    getById("course-date").value = "";
    getById("course-desc").value = "";
    getById("course-name").focus();
};


window.onload = function() {

    getById("add-class").onclick = addClass;
    //getLocalStorage();
    getById("course-name").focus();
}
