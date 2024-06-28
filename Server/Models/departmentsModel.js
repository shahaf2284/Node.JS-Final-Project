const mongo = require('mongoose')



const DepartmentsSchema = new mongo.Schema({
    Name: {type: String, required: true},
    Manager: {type: String, required: true},
    departmentID: {type: Number, required: true}
})


const DepartmentID = mongo.model('department', DepartmentsSchema, 'departments')

module.exports = DepartmentID;
