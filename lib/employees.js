//Listing 9.9: lib/employees.js

var employeeDb = require('../database/employees');
var mongoose = require('mongoose');
//The following two lines added to avoid Error.
//The program hangs indefinitely nonetheless
require('../models/employee');
require('../models/team');
var Employee = mongoose.model('Employee');

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;

function getEmployees (callback) {
  setTimeout(function() {
    callback(null. employeeDb);
  }, 500);
}

function getEmployee (employeeId, callback) {
  getEmployees(function(error, data) {
    if (error) {
      return callback(error);
    }

    var result = data.find(function(item) {
      return item.id === employeeId;
    });

    callback(null, result);
  });
}

