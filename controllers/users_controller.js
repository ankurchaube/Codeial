const User = require("../models/user");

module.exports.profile = function (req, res) {

 
  User.findById(req.params.id, function(err, user){
        console.log(user);
          return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
         })
         
          })
    
    

};
module.exports.userProfile = function (req, res) {

 
  User.findById(req.user.id, function(err, user){
        console.log(user);
          return res.render('user_profile', {
            title: "User Profile",
            profile_user: user
         })
         
          })
    
    

};
module.exports.update = async function(req, res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
  //     return res.redirect('back');
  //   } );
  // }else{
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.params.id){
   try {
    
    let user = await User.findById(req.params.id);
    User.uploadedAvtar(req, res, function(err){
      if (err) {
        console.log('*****Multer Error ' , err)};

        user.name = req.body.name;
        user.email = req.body.email;

        if(req.file){
          // this is saving avtarpath
          user.avtar = User.avtarPath + '/' + req.file.filename
        }
      
         user.save();  
         return res.redirect('back');
    });

   } catch (err) {
    req.flash('error' , err);
    return res.redirect('back');
   }
  } else{
    req.flash('error', 'Unauthorized')
    return res.status(401).send('Unauthorized');
  }

}
// ~ Render Sign up

module.exports.signup = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }
  return res.render("user_sign_up", {
    title: "Codeial | Sign Up",
  });
};

// ~ Render Sign In

module.exports.signin = function (req, res) {
  if(req.isAuthenticated()){
   return res.redirect('/users/profile');
  }

  return res.render("user_sign_in", {
    title: "Codeial | Sign In",
  });
};

// * get sign-up data

module.exports.create = function (req, res) {
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      console.log("error in finding user in signing up");
      return;
    }
    if (!user) {
      User.create(req.body, function (err, user) {
        if (err) {
          console.log("error in creating  user while signing up");
          return;
        }
        return res.redirect("/users/sign-in");
      });
    } else {
      return res.redirect("back");
    }
  });
};

// * get sign-in and create session
module.exports.createSession = function(req,res){
  req.flash('success', 'Logged in Successfully' );
  return res.redirect('/')
}

module.exports.distroySession = function(req, res){
  req.logout();
  req.flash('success', 'Logged Out Successfully' );
  return res.redirect('/');
}
