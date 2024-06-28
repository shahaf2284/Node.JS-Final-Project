const authServices = require('../Services/authService');
const userService = require('../Services/userService');
const express = require('express');
const jwt = require('jsonwebtoken');


const router = express.Router();



// Post request {username, email} to get user by username
router.post('/', async (req, res) => {
    try
    {
        console.log("user log-in: "+ req.body.username)
        const username= req.body.username 
        const email= req.body.email 
        const user = await userService.getUserByUsername(username)
        if(!user) return res.json({success: false, erorr: "User not found"})
        const userWeb = await authServices.getUserByUsername(username,email);
        if(!userWeb.succsse){
            return res.json(userWeb)
        }
        const token =  jwt.sign({name: userWeb.data.name, email: email, id: user._id}, "secret")
        return res.json({ success: true, token: token })
    }
    catch(e)
    {
        return res.json({ success: false, erorr: e})
    }
})



module.exports = router;