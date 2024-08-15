const jwt = require('jsonwebtoken')

const middleW = async(req, res, next)=>{
    try{
        const tk = req.cookies?.token
        const pttk = req.cookies?.PTauth
        if(pttk){
            const testdeconded = jwt.verify(pttk, process.env.jwt_secret)
        }
        if(tk){
            const decoded = jwt.verify(tk, process.env.jwt_secret)
            req.test = decoded
            return next()
        }
        if(req.isAuthenticated()){
            return next()
        }
        const cookieLists = ['PTauth', 'connect.sid','token']
        cookieLists.forEach((c)=>{
            res.clearCookie(c)
        })
        return res.status(401).json('no token.')
    }catch(err){
        const cookieLists = ['PTauth', 'connect.sid','token']
        cookieLists.forEach((c)=>{
            res.clearCookie(c)
        })
        return res.status(401).json('token wrong.')
    }
}
module.exports = middleW;