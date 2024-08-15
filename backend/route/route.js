const express = require('express')
const router = express.Router()
const modelDB = require('../model/model')
const middleW = require('../middleware/protect.api')

router.get('/getall',middleW,async(req, res)=>{
    try{
        //code
        const getall = await modelDB.find({})
        res.json(getall)
    }catch(err){
        console.log(err)
    }
})

router.post('/create',middleW, async(req, res)=>{
    try{
        //cocde
        const postdt = await modelDB(req.body).save()
        res.json(postdt)
    }catch(err){
        console.log(err)
    }
})

router.get('/getid/:id', middleW,async(req, res)=>{
    try{
        //code
        const id = req.params.id
        const getid = await modelDB.findOne({_id:id})
        res.json(getid)
    }catch(err){
        console.log(err)
    }
})

router.put('/update/:id',middleW, async(req, res)=>{
    try{
        //code
        const id = req.params.id
        const putdt = await modelDB.findOneAndUpdate({_id:id},(req.body),{new:true})
        res.json(putdt)
    }catch(err){
        console.log(err)
    }
})

router.delete('/delete/:id', middleW,async(req, res)=>{
    try{
        //code
        const id = req.params.id
        const del = await modelDB.findOneAndDelete({_id:id})
        res.json(del)
    }catch(err){
        console.log(err)
    }
})

module.exports = router