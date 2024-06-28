const userRepo = require('../Repositories/userRepo');



const getUserByUsername = async (username) => {
    return await userRepo.getUserByname(username)
}

const getUserByID = (id) => {
    return userRepo.getUserById(id)
}

module.exports = {getUserByUsername,getUserByID}