const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVTAR_PATH = path.join('/uploads/users/avtar');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password : {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    
    avtar: {
        type: String
    },
    
    friendships: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Friendship' 
        }
    ]

    
},
{
    timestamps: true
});

const  storage = multer.diskStorage({
    destination: function(req,file, cb){
      cb (null, path.join(__dirname, '..', AVTAR_PATH)); 

    },
    filename:  function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//  static

userSchema.statics.uploadedAvtar = multer({storage: storage}).single('avtar');


userSchema.statics.avtarPath = AVTAR_PATH;

const User = mongoose.model('User', userSchema);

module.exports = User;



