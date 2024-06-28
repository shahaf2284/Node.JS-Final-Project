const employeeModel = require('../Models/employeesModel')


//---------Get Requests---------

//Get all request
const getEmployees = async () => {
    return await employeeModel.find({})
}

//Get by id 
const getEmployeeById = async (id) => {
    const employee = await employeeModel.find({id: id})
    return employee[0]
}

const getEmployeesBydepartemtId = async (departemtId) =>{
    const employees = await employeeModel.find({DepartmentID: departemtId})
    return employees
} 


//---------Post Request---------
const createEmployee = async (newEmployee) => {
    const employee = new employeeModel(newEmployee)
    await employee.save()
    return "Created ...."
}

//---------Put Request---------
const updateEmployee = async (id, newEmployee) => {
    const employee = await getEmployeeById(id)
    await employeeModel.findByIdAndUpdate(employee._id, newEmployee)
    return "Updated ...."
}

//---------deleted Request---------
const deleteEmployee = async (id) => {
    const employee = await getEmployeeById(id)
    await employeeModel.findByIdAndDelete(employee._id)
    return "Deleted ...."
}

module.exports = {getEmployees, 
                  getEmployeeById, 
                  createEmployee, 
                  updateEmployee, 
                  deleteEmployee, 
                  getEmployeesBydepartemtId}


