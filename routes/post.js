const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const Post = require('../models/posts');


// Adds a Post with empty content
/* Request body contains:
   - userID of poster
   Response:
   - post_id: the added post's objectID
   message: success or error message
   status: error or success */
router.post('/addPost', (req, res, next) => {
    console.log('received request to add a new post with empty content', req.body);
    const userID = req.body.post_userID;

    // create and configure the new post document with empty content
    let newPost = new Post({
        // Mixed Type is available either through Schema.Types.Mixed or by passing an empty object literal
        // - can be any type, see post Schema
        content: [],
        post_userID: userID
    });

    // add the post object document to the posts collection in mongodb and return Object ID of the post to sender
    newPost.save().then(function (returnedPost) {
        console.log('saved Post:', returnedPost);
        res.json({status: 'success', message: 'Success adding post with empty content', post_id: returnedPost._id});
    }).catch(function (error) {
        console.log('error received', error);
        res.json({status: 'error', message: 'Error adding post'});
    });
});


/* Add Post with non-empty content, similar to /AddPost above, but a content array is provided
* Request body contains:
    - userID of poster
    - content array with each item in the array containing these properties:
        - mediaObj: The media buffer
        - mediaType: Type of the media
        - userMediaTitle: Title of the media content
        - userMediaDescription: Description of the media content
        - authorUserID: the originating author of this media
   Response:
   - post_id: the added post's objectID
   - message: success or error message
   - status: error or success
   - the post document
   */
router.post('/addPostWithContent', (req, res, next) => {
    console.log('received request to add a new post with content', req.body);

    const userID = req.body.post_userID;
    // retrieve content array from request body
    const mediaContent = req.body.content;

    // create and configure the new post document with empty content
    let newPost = new Post({
        // Mixed Type is available either through Schema.Types.Mixed or by passing an empty object literal
        // - can be any type, see post Schema
        content: mediaContent,
        post_userID: userID
    });

    // add the post object document to the posts collection in mongodb and return Object ID of the post to sender
    newPost.save().then(function (returnedPost) {
        console.log('saved Post:', returnedPost);
        res.json({
            status: 'success',
            message: 'Success adding post with non-empty content',
            post_id: returnedPost._id,
            post: returnedPost
        });
    }).catch(function (error) {
        console.log('error received', error);
        res.json({status: 'error', message: 'Error adding post with non-empty content'});
    });
});


/* Add content to the post content[] array by objectID
 * Request body contains:
    - postObjID: objectID of the post
    - mediaObj: he media buffer
    - mediaType: of the media
    - userMediaTitle: of the media content
    - userMediaDescription: of the media content
    - authorUserID: the originating author of this media
 * Response body returned:
    - error if present
    - if no error, then the saved Post
    - the post Object ID
*/
router.post('/addContentMedia', (req, res, next) => {
    console.log('received request to add content to saved post content[] array', req.body);

    const postObjID = req.body.postObjID;

    const mediaBuff = req.body.mediaObj;
    const mediaType = req.body.mediaType;
    const mediaTitle = req.body.userMediaTitle;
    const mediaDesc = req.body.userMediaDescription;
    const authorUserID = req.body.authorUserID;

    // content object to add to the post's content[] array
    const contentObj = {
        mediaObj: mediaBuff,
        mediaType: mediaType,
        userMediaTitle: mediaTitle,
        userMediaDescription: mediaDesc,
        authorUserID: authorUserID
    };

    // index into post with postObjID and add to content array
    // using Post Model, find the corresponding post object
    Post.findOne({'_id': postObjID}, '', function (err, post) {
        if (err) return res.json({status: 'error', message: err});
        console.log('returned Post from mongoDB: ', post);

        // add content to post's content[] array by using $push operator
        post.update({$push: {content: contentObj}}, function (error, returnedPost) {
            if (error) {
                console.log(error);
                res.json({
                    status: 'error',
                    message: error
                });
            } else {
                console.log('Saved Post ', returnedPost);
                res.json({
                    status: 'success', message: 'success adding content to Post',
                    post_id: returnedPost._id,
                    post: returnedPost
                });
            }
        });
    });
});

// Retrieving Post from user endpoint todo


// Save edited post endpoint todo


module.exports = router;
