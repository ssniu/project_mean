const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');


//set up passport
module.exports = function(passport){
    let opts = {};


    //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        //console.log(jwt_payload); //use this to print the infor in console,
        // jwt_payload._id does not work, should be
        //User.getUserById(jwt_payload._id, (err, user) => {
        User.getUserById(jwt_payload.data._id, (err, user) => {
            if(err) {
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }else {
                return done(null, false);
            }
        });
    }));
}
