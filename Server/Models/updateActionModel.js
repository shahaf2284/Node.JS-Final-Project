const mongo = require('mongoose')


const ActionSchema = new mongo.Schema({
    id: String,
    actions: Number
})

const Actions = mongo.model('Action', ActionSchema, 'Actions')

module.exports = Actions;