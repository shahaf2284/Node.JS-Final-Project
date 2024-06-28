
const updateActionModel = require('../Models/updateActionModel.js')


//---------Get Requests---------

const getActionById = async (id) => {
    return await updateActionModel.find({id:id})
}

module.exports = {
    getActionById
}
