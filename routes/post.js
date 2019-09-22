const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const Post = require('../models/posts');


// Adds a Post with empty content
/* Request body contains:
   - userID of poster
   Response:
   - the added post's objectID */
router.post('/addPost', (req, res, next) => {
    console.log('received request to add a new post', req.body);
    const userID = req.body.post_userID;

    // create and configure the new post document with empty content
    let newPost = new Post({
        // Mixed Type is available either through Schema.Types.Mixed or by passing an empty object literal
        // - can be any type, see post Schema
        content: [{}],
        post_userID: userID
    });

    // add the post object document to the posts collection in mongodb and return Object ID of the post to sender
    newPost.save().then(function(returnedPost) {
        console.log('saved Post:',  returnedPost);
        res.json({message: 'Success adding empty post document', post_id: returnedPost._id});
    });
});


/* todo: adding content to the post content[] array by objectID
 * Request body contains:
   - the media buffer
   - userID of poster
   - mediaType of the media
   - userMediaTitle of the media content
   - userMediaDescription of the media content
*/
router.post('/addContentMedia', (req, res, next) => {
    console.log('received request to add content to saved post content[] array')

    /*const mediaBuff = req.body.mediaObj;
    const mediaType = req.body.mediaType;
    const mediaTitle = req.body.mediaTitle;
    const mediaDesc = req.body.mediaDescription;*/

    // todo
});

// Retrieving Post from user endpoint todo


// Save edited post endpoint todo


module.exports = router;
