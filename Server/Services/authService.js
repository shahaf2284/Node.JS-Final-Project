const userRepo = require("../Repositories/userWebRepo")



const getAllusers = async () => {
    return await userRepo.getAllusers()
}


const getUserByUsername = async (username, email) => {
    const {data:user} = await userRepo.getbyUsername(username)
    if (user[0].email === email) {
        return {succsse: true, data :user[0]}
    }
    else{
        return {succsse: false, erorr: "email does not match"}
    }
}

module.exports = {
    getAllusers,
    getUserByUsername
}