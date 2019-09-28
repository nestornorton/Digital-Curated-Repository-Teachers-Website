const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Content = require('../models/posts');

// Register
router.post('/register', (req, res, next) => {
    console.log(req);
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    /* Check if username already exists in db - if true, don't register this user */
    User.getUserByUsername(newUser.username, (err, user) => {
        if (err) throw err;
        if (user) {
            console.log('user already registered', user);
            res.json({success: false, msg: 'User already Registered'});
            res.end();
        }
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user'});
        } else {
            res.json({success: true, msg: 'User registered'});
            res.end();
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 86400 //1 day
                });

                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


/* Stores a Post's Object ID in the User's content[] array
* request must contain unique username of user  */
router.post('/storePostID', (req, res, next) => {
    console.log('received request for storing a Post Obj ID: ', req.body);
    User.addPostID(req.body.userID, req.body.ObjID, function (error, User) {
        if (error) {
            console.log('error adding Post ID: ', error);
            res.json({status: 'error', message: error})
        } else {
            console.log('Success adding Post ID: ', User);
            res.json({status: 'success', message: 'Post added to User', post: User})
        }
    });
});


/* Retrieve the list of Posts Object IDs
* request must contain unique username of user
* GET request contains username as query parameter in URL (syntax ':' to denote query param) */
router.get('/getPostIDs', (req, res, next) => {
    console.log('received request for getting User Post IDs: ', req.query);
    User.getAllPostIDs(req.query.userID, (error, User) => {
        if (error || User === null) {
            console.log('error retrieving List of PostIDs: ', error);
            res.json({status: 'error', 'message': error})
        } else {
            console.log('Success retriving List of  PostIDs: ', User);
            res.json({
                status: 'success',
                message: 'Successfully retrieved User\'s Content array of Post IDs',
                content: User.content
            });
        }
    })
});


module.exports = router;
