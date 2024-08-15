const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    googleId:String,
    githubId:String,
    username:String,
    email:String,
    password:String,
    profileImg: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg'
    }
},{timestamps:true})

module.exports = mongoose.model('userModel', userModel)