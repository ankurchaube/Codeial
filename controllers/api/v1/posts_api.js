
const Post = require('../../../models/post');

module.exports.index = async function(req, res){

    let posts = await  Post.find({})
    .populate('user')
    .sort('-createdAt')
    .populate({
        path: 'comments',
        populate: { 
            path: 'user'
        }
    });

    return res.json(200,  {
       message: "List of posts",
       posts: posts
    })
}