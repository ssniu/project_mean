const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//add users from models folder
const User = require('../models/user');


//set routers
/*
router.get('/users', (req, res, next) => {
    res.send('user page');
});
*/


//register, the /register will automatically added to /users
//register, the /register will automatically added to /users
router.post('/register', (req, res, next) => {
    //res.send("register site");
    // create new user
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
    });
    //add new user
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'failed to register user'});
        }else {
            res.json({success: true, msg:'user registered'});
        }
    });

    /*
    module.exports.addUser = function(newUser, callback){
        //hash the password here by bcryptjs
        bcrypt.genSalt(10, (err, salt) => (
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                if(err) throw err;
                newUser.password = hash;
                newUser.save(callback);
            })
        )); */
});

//authentication
router.post('/authenticate', (req, res, next) => {
    //res.send("authentication site");
    const username = req.body.username;
    const password = req.body.password;
/*
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}*/
    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        //check user
        if(!user){
            return res.json({success: false, msg: 'user not found'});
        }
/*
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
*/
        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;

            if(isMatch){
                const token=jwt.sign({data: user}, 'secret', {
                    expiresIn: 6048000 //the token will expire in 6400
                });
                //if the password matches, return this
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
                //otherwise return false
            }else {
                return res.json({success: false, msg: 'wrong password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    //res.send("profile site");
    res.json({user: req.user});
    //res.send(req.user);
});

module.exports = router;



/*
//user registeration
router.post('/register', (req, res, next) => {
    //create new user
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
   res.send('register page');
    //add the new user
    User.addUser(newUser, (err, user) => {
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                newUser.password = hash;
                if(err) throw err;
                newUser.password = hash;
                newUser.save((err, user)=>{
                    if(err) {
                        res.json({success: false, msg: 'failed to register user!'});
                    }else {
                        res.json({success: true, msg: 'user registered!'});
                    }
                });
            });
        });
    });
});

//user authentication
router.post('/authenticate', (req, res,next) =>{
    //res.send('authenticate');
    const username = req.body.username;
    const password = req.body.password;

res.send('register page');
    User.getUserByUsername(username, (err, user) =>{
        const query = { username: username }
        User.findOne(query, (err, user) =>{
            if(err) throw err;
            if(!user) {
                return res.json({success: false, msg: 'user not found'});
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) throw err;
                    if(isMatch) {
                        const token = jwt.sign({data: user}, 'secret', {
                            expiresIn: 6048000//token will expire in 6048000
                        });
                        //if the password matches
                        res.json({
                            success: true,
                            token: 'JWT ' + token,
                            user: {
                                id: user._id,
                                name: user.name,
                                username: user.username,
                                email: user.email
                            }
                        });
                        //does not match

                    } else {
                        return res.json({success: false, msg: 'password is incorrect!'});
                    }
                });
            });
        });
   });
});

//profile page
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    res.send('profile page');
});
*/
