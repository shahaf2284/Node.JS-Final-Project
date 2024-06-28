const departmentModel = require('../Models/departmentsModel')



//---------Get Requests---------

//Get all request
const getAllDepartment = async () => {
    return await departmentModel.find({})
}

//Get by id
const getDepartmentById = async (id) => {
    const department = await departmentModel.find({departmentID: id})
    return department[0]
}



//---------Post Request---------

//create department
const createDepartment = async (newDepartment) => {
    const department = new departmentModel(newDepartment)
    await department.save()
    return "Created ...."
}

//updet department
const updetDepartment = async (id, newDepartment) => {
    const department = await departmentModel.findOneAndUpdate({departmentID: id}, newDepartment)
    return "Updated ...."
}


//deleted department
const deleteDepartment = async (id) => {
    const department = await departmentModel.findOneAndDelete({departmentID: id})
    return "Deleted ...."
}


module.exports = {getAllDepartment, getDepartmentById, createDepartment, updetDepartment, deleteDepartment}