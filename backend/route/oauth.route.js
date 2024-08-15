const express = require('express');
const passport = require('passport');
const userModel = require('../model/user.model');
const middleW = require('../middleware/protect.api');
const jwt = require('jsonwebtoken')
const router = express.Router()

router.get('/auth/google',passport.authenticate('google', { 
    scope: ['profile','email']
}));
  
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: `${process.env.frontend_domain}/login`}),(req, res)=>{
    const PTauth = jwt.sign({msg:'test_test'},process.env.jwt_secret,{expiresIn:'1h'})
    res.cookie('PTauth', PTauth, {maxAge: 1000 * 60 * 60})
    res.redirect(`${process.env.frontend_domain}/`)
})

router.get('/auth/github',passport.authenticate('github', { 
    scope: ['profile','email']
}));
  
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: `${process.env.frontend_domain}/login`}),(req,res)=>{
    const PTauth = jwt.sign({msg:'test_test'},process.env.jwt_secret,{expiresIn:'1h'})
    res.cookie('PTauth', PTauth, {maxAge: 1000 * 60 * 60})
    res.redirect(`${process.env.frontend_domain}/`)
})

router.get('/logout', async(req, res)=>{
    try{
        req.logout((err)=>{
            if(err){
                return res.json(err)
            }
            req.session.destroy((err)=>{
                if(err) return res.json(err)
                const cookieLists = ['PTauth', 'connect.sid','token']
                cookieLists.forEach((c)=>{
                    res.clearCookie(c)
                })
                res.redirect('http://localhost:5173/login')
            })
        })
    }catch(err){
        console.log(err)
    }
})

router.get('/api/getcurrentuser',middleW, async(req, res)=>{
    try{
        const profile = req.user?.profile
        const type = req.user?.type
        
        if(type === 'github'){
            const currentUser = await userModel.findOne({githubId: profile.id})
            return res.json({
                profileImg: currentUser.profileImg,
                username: currentUser.username
            })
        }
        if(type === 'google'){
            const currentUser = await userModel.findOne({googleId: profile.id})
            return res.json({
                profileImg: currentUser.profileImg,
                username: currentUser.username
            })
        }
        return res.json(req.test)
    }catch(err){
        console.log(err)
    }
})

module.exports = router;