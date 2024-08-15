const passport = require('passport');

const GitHubStrategy = require('passport-github2');
const userModel = require('./model/user.model');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;

passport.use(new OAuth2Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.frontend_domain}/auth/google/callback`,
    scope: ['profile', 'email'],
  },
  async(accessToken, refreshToken, profile, done) =>{
    try{
        const user = {profile, type: 'google'}
        const googleId = profile.id
        await userModel.findOne({googleId})
        .then(async(data)=>{
            if(!data){
                await userModel.create({
                    googleId: profile.id,
                    username: profile.displayName,
                    profileImg: profile.picture
                })
            }
        })
        return done(null, user)
    }catch(err){
        console.log(err)
        return done(err,null)
    }
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.frontend_domain}/auth/github/callback`,
    scope: ['profile', 'email']
  },
  async(accessToken, refreshToken, profile, done) =>{
    try{
        const user = {profile, type: 'github'}
        const githubId = profile.id
        await userModel.findOne({githubId})
        .then(async(data)=>{
            if(!data){
                await userModel.create({
                    githubId: profile.id,
                    username: profile.username,
                    profileImg: profile.photos[0].value
                })
            }
        })
        return done(null, user)
    }catch(err){
        console.log(err)
        return done(err,null)
    }
  }
));

passport.serializeUser((user, done)=>{
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    done(null, user);
})