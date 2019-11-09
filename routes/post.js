const express = require('express');
const router = express.Router();
//const User = require('../models/user');
const Post = require('../models/posts');
const mongoose = require('mongoose');

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

// search functionality - matches a term to a Posts content title or description
router.post('/searchPosts', async (req, res, next) => {
    console.log('received request to search for Posts with matching term:', req.body.term);
    const term = req.body.term;

    const PostResults = [];
    let resultSet = [];
    /* search Posts Collection of documents by content array nested document properties 'userMediaTitle' and
    * 'userMediaTitle', resultSet contain a set of embedded documents that match (as substring) EITHER of these
    * two properties */
    /* Perform logical operator OR to regex expression on both properties and project fields  */
    resultSet = await Post.find({
        $or: [{
            'content.userMediaTitle': {$regex: term, $options: 'i'}
        },
            {'content.userMediaDescription': {$regex: term, $options: 'i'}}],
    }, {'content.userMediaTitle': 1, 'content.userMediaDescription': 1});

    console.log('resultSet from search: ', JSON.stringify(resultSet));

    // map() results to include small set of properties and not actual content file objects, include first item info
    resultSet.map((item) => {
        return {
            _id: item._id,
            userMediaTitle: item.content[0].userMediaTitle,
            userMediaDescription: item.content[0].userMediaDescription
        };
    });

    console.log('final resultSet: ', JSON.stringify(resultSet));


    res.send(resultSet);

});

// Retrieving Post by _id, does return the actual BLOB of content (i.e. files uploaded)
router.get('/getPostById', async (req, res, next) => {
        console.log('recvd request to get Post by ID: ', req.query.id);
        const _id = req.query.id;

        const document = await Post.findOne({'_id': mongoose.Types.ObjectId(_id)});
        console.log('document retrieved: ', document);

        res.send(document);
    }
);

// Save edited post endpoint todo


module.exports = router;
