const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    content: [
        {
            id: {
                type: String,
                unique: true
            }
        }
    ]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
    const query = {username: username};
    User.findOne(query, callback);
};

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
};


/* Stores a Post's Object ID in the User's content[] array */
module.exports.addPostID = function (userID, postObjID, callback) {
    User.findOne({username: userID}, '', function (err, User) {
        if (err) return res.json({status: 'error', message: err});
        console.log('returned User from mongoDB: ', User);

        // add content to post's content[] array by using $push operator
        User.update({$push: {content: {id: postObjID}}}, callback);
    });
};
