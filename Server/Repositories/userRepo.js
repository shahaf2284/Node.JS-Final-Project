const userModel = require('../Models/usersModel')



//---------Get Requests---------

//Get all request
const getAllUsers = async () => {
    return await userModel.find({})
}


//Get by id
const getUserById = async (id) => {
    const user =  await userModel.findById(id)
    return user
}

//Get by name
const getUserByname = async (Username) => {
    const temp = await userModel.find({Full_Name: Username})
    return temp[0]
}

//---------Post Request---------

//create user
const createUser = async (newUser) => {
    const user = new userModel(newUser)
    await user.save()
    return "Created ...."
}


//---------Put Request----------

//updet user
const updateUser = async (id, User)=>{
    await userModel.findOneAndUpdate({_id:id}, User)
    return "Updated ...."
}


//---------Delete Request----------

//delete user
const deleteUser = async (id)=>{
    await userModel.findOneAndDelete({id:id})
    return "Deleted ...."
}


module.exports = {
            getAllUsers, 
            getUserById,
            createUser, 
            updateUser, 
            deleteUser,
            getUserByname,
    }
