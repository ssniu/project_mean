const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User = require('./user');

//post schema
var PostSchema = new Schema({
    title: { type: String, required: true },
    keywords: { type: String },
    content: { type: String, required: true },
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

//export the UserSchema
const Post = module.exports = mongoose.model('Post', PostSchema);

//methods
module.exports.getAllPosts = function(callback){
    Post.find(callback);
}

module.exports.getPostById = function(id, callback){
    Post.findById(id, callback);
}

module.exports.addPost= function(newPost, callback){
    newPost.save(callback);
}

module.exports.updatePost = function(id, callback){
    Post.findByIdAndUpdate(id, callback);
}

module.exports.deletePost = function(id, hash, callback){
    Post.findByIdAndRemove(callback);
}
