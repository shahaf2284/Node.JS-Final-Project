
const mongo = require('mongoose')


const shiftSchema = new mongo.Schema({
    Date: {type: String, required: true},
    Start_Time: {type: String, required: true},
    End_Time: {type: String, required: true},
    employeeID: {type: String, required: true}
})


const Shifts = mongo.model('shift', shiftSchema, 'shifts')

module.exports = Shifts;