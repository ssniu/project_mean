const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var Post = require('./post');

//user schema
const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
});


//export the UserSchema
const User = module.exports = mongoose.model('User', UserSchema);

//methods
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
    //hash the password here by bcryptjs
    bcrypt.genSalt(10, (err, salt) => (
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    ));
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}
