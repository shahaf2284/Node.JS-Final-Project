const express = require('express');
const jwt = require('jsonwebtoken');
const employeeService = require('../Services/employeeService');
const e = require('express');


router = express.Router();

const checkToken = (token) => {
    if(!token) return { success: false, error: "No token provided" }
    const decoded = jwt.verify(token, "secret")
    if(!decoded) return { success: false, error: "Invalid token" }
    return { success: true, data: decoded } 
}


router.get('/', async (req, res) => {
    
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)

    //Get the employee by id to get the department id
    const employee = await employeeService.getEmployeesByID(decoded.data.id)

    //Get the user actions left
    const user = await employeeService.getUserByID(decoded.data.id)

    //Get the department
    const Department = await employeeService.getDepartmentByID(employee.DepartmentID)
    //Get the menager of the department
    const manager = await employeeService.getEmployeesByID(Department.Manager)
    const managername = manager.First_Name+" "+manager.Last_Name

    //list of all the shifts of the employee
    const shifts = await employeeService.getShiftByID(decoded.data.id)

    return res.json({success:true, data: {
                                          employeeName:decoded.data.name,
                                          employeeActionsLeft: user.Num_of_actions,
                                          Departmenat:Department.Name,
                                          departmentManager: managername,
                                          shifts: shifts,
                    }})
})

// just for admin
router.get('/user/:id', async (req, res) => {

    //Get the user actions left
    const user = await employeeService.getUserByID(req.params.id)
    
    //Get the employee by id to get the department id
    const employee = await employeeService.getEmployeesByID(req.params.id)
    //list of all the shifts of the employee
    const shifts = await employeeService.getShiftByID(req.params.id)
    return res.json({success:true, data: {
                                        employeeName: employee.First_Name+" "+employee.Last_Name,
                                        employeeActionsLeft: user.Num_of_actions,
                                        userName: user.Full_Name,
                                        StartWorkYear: employee.Start_Work_Year,
                                        shifts: shifts,
                                        departmentId: employee.DepartmentID
    }})
})

// just for admin
router.get('/info/:userName', async (req, res) => {

    //Get the user info left
    const user = await employeeService.getUserFromWebByUserName(req.params.userName)
    return res.json(user)
})


//just admin get all the employees in the department
router.get('/department', async (req, res) => {
    
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)

    //Get the employee by id to get the department id
    const manager = await employeeService.getEmployeesByID(decoded.data.id)

    // //Get the user actions left
    // const user = await employeeService.getUserByID(decoded.data.id)

    const employees = await employeeService.getAllDepartment(manager.DepartmentID)
    return res.json({success:true, data: {employees :employees}})
})




//just dmin can do it
router.get('/shifts/:id', async (req, res) => {
    return res.json({success:false, error:"You are not authorized to do this action"})})


router.post("/shift", async (req,res)=>{

    //check the token 
    const token = req.headers["token"]
    if(!token) return res.json({success: false, error: "No token provided" })
    const decoded = jwt.verify(token, "secret")
    if(!decoded) return res.json({ success: false, error: "Invalid token" })
        
    //Creating a new shift in the appropriate template
    const newShift ={
        Date: req.body.Date, 
        Start_Time: req.body.Start_Time, 
        End_Time: req.body.End_Time,
        employeeID: decoded.id
    }
    const answer = await employeeService.addShift(newShift)

    //update action
    const updet = await employeeService.updActions(decoded.id)
    
    return res.json({answer: answer+" "+updet})
}) 


router.put("/", async (req,res) => {
    //check the token 
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)

    const answer = await employeeService.updEmployee(decoded.data.id, req.body)
    
    //update action
    const updet = await employeeService.updActions(decoded.data.id)

    return res.json({answer: answer + updet})
})


router.put("/EditShift/:indexShift", async (req,res) => {
    //check the token 
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)

    const index = req.params.indexShift.split("=")
    const answer = await employeeService.updShift(decoded.data.id, +index[1], req.body)


    //update action
    const updet = await employeeService.updActions(decoded.data.id)

    return res.json({answer: answer + updet})
})


router.delete("/", async (req,res) => {

    //check the token 
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)
    
    const answer = await employeeService.deleteEmployee(decoded.id, req.body)
    
    //update action
    const updet = await employeeService.updActions(decoded.data.id)

    return res.json({answer: answer + updet})
})

router.delete("/shift", async (req,res) => {

    //check the token 
    const decoded = checkToken(req.headers["token"])
    if(!decoded.success) return res.json(decoded)
    
    const index = +req.body.index
    const answer = employeeService.deleteShift(decoded.data.id , index)

    //update action
    const updet = await employeeService.updActions(decoded.data.id)
    console.log(updet)
    return res.json({answer: answer + updet})
})


module.exports = router;



