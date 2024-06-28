const shiftModel = require('../Models/shiftsModel')


//---------Get Requests---------

//just admin can do it
const getAllShifts = async () => {
    return await shiftModel.find({})
}


//Get by id
const getShiftById = async (id) => {
    return await shiftModel.find({employeeID: id},{_id:0, employeeID:0})
}

//Get by id
const getAllShiftById = async (id) => {
    return await shiftModel.find({employeeID: id})
}

//---------Post Request---------
const createShift = async (newShift) => {
    const shift = new shiftModel(newShift)
    await shift.save()
    return "Created ...."
}

//---------Put Request---------
const updateShift = async (id, newShift) => {
    await shiftModel.findByIdAndUpdate(id, newShift)
    return "Updated ...."
}

//---------deleted Request---------
const deleShift = async (id)=>{
    await shiftModel.findByIdAndDelete(id)
    return "Deleted ...."
}


module.exports = {getAllShifts, getAllShiftById, getShiftById, createShift, updateShift, deleShift}