const passport = require('passport');
const googleStreatgy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const user = require('../models/user');
const User = require('../models/user');

// tell passport to use new strategy
passport.use(new googleStreatgy({
    clientID: "117629751327-s79inja59pqllcknp9ht30frg4d6unc2.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
},
    function(accessToken, refreshToken,profile,done){
        
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in Google strategy-passport', err );
                return; }

                console.log(profile);
                
                if(user){
                    return done(null, user);
                }else{
                    User.create({
                        name : profile.displayName,
                        email : profile.emails[0].value,
                        password : crypto.randomBytes(20).toString('hex')
                    }, function(err, user){
                        if(err){
                            console.log('Error in Creating user', err );
                            return; }

                            return done(null, user);
                    });
                }
        
        });
    }

));



module.exports = passport;