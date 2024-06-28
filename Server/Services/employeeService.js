const employeeRepo = require('../Repositories/employeeRepo');
const departmentRepo = require('../Repositories/departmentRepo');
const shiftRepo = require('../Repositories/shiftsRepo');
const userRepo = require('../Repositories/userRepo');
const userWebRepo = require('../Repositories/userWebRepo');



const getEmployees = async () => {
    try{
        return await employeeRepo.getEmployees()
    }
    catch(e){
        return {error:e}
    }
}

const getEmployeesByID = async (id) => {
    try{
        return await employeeRepo.getEmployeeById(id)
    }
    catch(e){
        return {error:e}
    }
}

const getAllDepartment = (departemtId)=>{
    try{
        return employeeRepo.getEmployeesBydepartemtId(departemtId)
        }
        catch(e){
            return {error:e}
        }
}

const getDepartmentByID = async (id) =>{
    try{
    return await departmentRepo.getDepartmentById(id)
    }
    catch(e){
        return {error:e}
    }
}

const getShiftByID = async (id) =>{
    try{
    return await shiftRepo.getShiftById(id)
    }
    catch(e){
        return {error:e}
    }
}


const getUserByID = async (id) => {
    try{
        return await userRepo.getUserById(id)
    }
    catch(e){
        return {error:e}
    }
}

const getUserFromWebByUserName = async (userName) => {
    try{
        const {data:user} = await userWebRepo.getbyUsername(userName)
        return {succsse: true, data :{userName: user[0].username, 
                                      email: user[0].email, 
                                      address:user[0].address, 
                                      phone:user[0].phone}}
    }
    catch(e){
        return {error:e}
    }
}

const addShift = async  (newShift) => {
    try{
        return await shiftRepo.createShift(newShift)
    }
    catch(e){
        return {error:e}
    }
}

const updActions = async (id) => {
    try{
        const user = await userRepo.getUserById(id)
        user.Num_of_actions--
        const msg = await userRepo.updateUser(id, user)
        return "Actions " + msg
    }
    catch(e){
        return {error:e}
    }
}

const updEmployee = async (id, employee) => {
    try{
        const msg = await employeeRepo.updateEmployee(id, employee)
        return "DB " + msg
    }
    catch(e){
        return {error:e}
    }
}

const updShift = async (id, index, newShift) => {
    try{
        const shifts = await shiftRepo.getAllShiftById(id)
        const msg = await shiftRepo.updateShift(shifts[index]._id, newShift)
        return "DB " + msg
    }
    catch(e){
        return {error:e}
    }
}

const deleteEmployee = async (id) => {
    try{
        return await userRepo.deleteUser(id)
    }
    catch(e){
        return {error:e}
    }
}

const deleteShift = async (id, index) => {
    try{
        const shifts = await shiftRepo.getAllShiftById(id)
        return await shiftRepo.deleShift(shifts[index]._id)
    }
    catch(e){
        return {error:e}
    }
}


module.exports = {
    getEmployeesByID, 
    getDepartmentByID, 
    getShiftByID, 
    getUserByID,
    addShift,
    updActions,
    updEmployee,
    deleteEmployee,
    updShift,
    deleteShift,
    getAllDepartment,
    getUserFromWebByUserName,
    getEmployees
}