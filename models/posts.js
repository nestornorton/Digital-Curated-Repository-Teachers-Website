const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    // each post in the post array content array, who posted it (post_userID)
    content: [
        { 
            // pdf, doc, etc encoded as mixed type (any)
            // Mixed is available either through Schema.Types.Mixed or by passing an empty object literal
            mediaObj: {},
            // mediaType: e.g. pdf, doc, youtube link
            mediaType: String,
            // the user title of the media (user's written title of the pdf, doc, etc)
            userMediaTitle: String,
            // the user description of the media (user's written description of the pdf, doc, etc)
            userMediaDescription: String,
        }],
    // corresponding user ID who made the post
    post_userID: {
        type: String,
        required: true,
        index: true
    },
});

const Post = module.exports = mongoose.model('Post', postSchema);


