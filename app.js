const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

User = require('./models/user');

//set the routes file
const appRoutes = require('./routes/app');
const users = require('./routes/users');
const posts = require('./routes/posts');

const app = express();
const port = 3000;
//connect the mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/myblog', { useMongoClient: true, promiseLibrary: global.Promise });

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


require('./config/passport')(passport);

app.use('/users', users);
app.use('/posts', posts);
app.use('/', appRoutes),
/*
app.get('/users/all', (req, res) =>{
    User.getUsers((err, users) => {
        if(err) {
            throw err;
        }
        res.json(users);
    });
});

app.get('/users/:_id', (req, res) => {
    var id = req.params._id;

    User.getUserById(id, (err, user) => {
        User.findById(id, (err, user) => {
            if(err) throw err;
            res.json(user);
        });
    });
});
*/

app.listen(port, ()=>{
    console.log('Server started on port ' + port);
});


module.exports = app;
