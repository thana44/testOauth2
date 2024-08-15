const express = require('express')
const userModel = require('../model/user.model')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/api/register', async (req, res)=>{
    const {username, email, password} = req.body
    try{
        if(!username || !password || !email){
            return res.json({msg: "please add all felid"})
        }
        const name = await userModel.findOne({username})
        const mail = await userModel.findOne({email})
        if(name) {
            return res.json({msg: "the name is used"})
        }
        if(mail){
            return res.json({msg: "the email is used."})
        }
        const salt = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(password, salt)
        const user = await userModel.create({username, email, password: hash_password})
        return res.json(user)
    }catch(err){
        console.log(err)
    }
});
router.post('/api/login', async (req, res)=>{
    const {email, password} = req.body
    try{
        console.log(email, password)
        if(!password || !email){
            return res.json({msg: "please add all felid"})
        }
        const mail = await userModel.findOne({email})
        if(mail){
           const check_password = await bcrypt.compare(password, mail.password)
            if(!check_password){
                return res.json({msg: "Wrong email or password."})
            }
            const token = jwt.sign({_id: mail._id, username: mail.username, profileImg: mail.profileImg}, process.env.jwt_secret,{expiresIn:'1h'})
            const PTauth = jwt.sign({msg:'test_test'},process.env.jwt_secret,{expiresIn:'1h'})
            res.cookie('PTauth', PTauth, {maxAge: 1000 * 60 * 60})
            return res.cookie('token', token,{sameSite:'strict',httpOnly:true, secure: process.env.node_env === 'production', maxAge: 1000 * 60 * 60}).json(token)
        }
        return res.json({msg: "Wrong email or password."})
    }catch(err){
        console.log(err)
    }
});

module.exports = router;