const mongo = require('mongoose')



const UsersSchema = new mongo.Schema({
    Full_Name: String,
    Num_of_actions: Number
})

module.exports = mongo.model('user', UsersSchema, 'users')

