const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


//add users from models folder
const Post = require('../models/post');
const User = require('../models/user');

//set routers

router.get('/', (req, res, next) => {
    //res.send('posts page');
    Post.findAllPosts(posts, (err, posts) =>{
        if(err) {
            res.send(err);
        }
        res.json(posts);
    });
});

router.get('/:id', (req, res, next) => {
    //res.send('posts page');
    const id = req.params.id;
    Post.getPostById(id, (err, posts) =>{
        if(err) {
            res.send(err);
        }
        res.json(posts);
    });
});

router.post('/', (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        keywords: req.body.keywords,
        content: req.body.content,
        user: req.body.user
    })

    Post.addPost(newPost, (err, user) => {
        if(err){
            res.json({success: false, msg: 'failed to submit the posts'});
        }else {
            res.json({success: true, msg:'success'});
        }
    });
});

router.put('/:id', (req, res, next) =>{
    const id = req.params.id;
    Post.updatePost(id, (err, posts) =>{
        if(err) {
            res.send(err);
        }
        res.json(posts);
    });
});

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id;
    Post.deletePost(id, (err, posts) =>{
        if(err) {
            res.send(err);
        }
        res.json(posts);
    });
});



module.exports = router;

//get all posts
/*
router.get('/', (req, res, next) =>{
    Post.find()
    .populate('title')
    .exec((err, posts) =>{
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(200).json({
            message: 'Success',
            obj: posts //used in angular
        });
    });
});



module.exports = router;*/
