
const Post = require('../models/post');

const User = require('../models/user');

module.exports.home =  async function(req, res){
   
   

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: 'Codial | Home',
    //         posts : posts
    //     })
    // })
//  Popilate the user
    let posts = await  Post.find({}).populate('user')
    .sort('-createdAt')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });

   let users =  await User.find({});
   return res.render('home', {
    title: 'Codial | Home',
    posts : posts,
    all_users: users
    })
}
    


//~ modules.exports.actionName = function(req, res)()