const BlogPost = require('../schema/post');
const { StatusCodes } = require("http-status-codes");

async function allBlogPosts(req, res) {
    return await BlogPost.find({}, null, { sort: {datePosted: -1} }, function (err, result) {
        if (err)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ response: 'something went wrong' })
        return res.status(StatusCodes.OK).json({ response: result });
    })
}

module.exports = allBlogPosts;