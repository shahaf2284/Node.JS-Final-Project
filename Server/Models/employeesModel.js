const mongo = require('mongoose');

const EmployeesSchema = new mongo.Schema({
    id: String,
    First_Name: String,
    Last_Name: String,
    Start_Work_Year: Number,
    DepartmentID : Number 
})

const employees = mongo.model('employee', EmployeesSchema, 'employees')

module.exports = employees;