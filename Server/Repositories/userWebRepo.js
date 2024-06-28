const axios = require("axios")

url = "https://jsonplaceholder.typicode.com/users"

const getAllusers = () => {
    return axios.get(url)
}

const getbyUsername = async (username) => {
    return axios.get(url + "/?username=" + username) 
}

module.exports={
    getAllusers,
    getbyUsername
}