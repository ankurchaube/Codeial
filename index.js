const express = require('express');
const env = require('./config/environment');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

const MongoStore = require('connect-mongo');

const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
// setup for chat server
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log("Chat server is running on port 5000");
const path = require('path')





app.use(sassMiddleware({
    src: path.join(__dirname, env.asset_path, 'scss'),
    dest: path.join(__dirname, env.asset_path, 'css'),
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'

}))
app.use(express.urlencoded());
// Make Uploads Path Avail to browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(cookieParser());

app.use(express.static(env.asset_path));
app.use(expressLayouts);
// ~ extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true );
app.set('layout extractScripts', true );



// ! set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// * mongo store is used to store the session cookie in the db

app.use(session({
 name: 'codeial',
//  change the secret in production
 secret: env.session_cookie_key,
 saveUninitialized: false,
 resave: false,
 cookie : {
     maxAge: (1000 * 60 * 100)
 },
 store:MongoStore.create({

     mongoUrl : 'mongodb://localhost/codeial_dovelopment',
     autoRemove : 'disabled'
 },
  function(err){
      console.log(err || 'Connect-MongoDB setup ok');
  }
 )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(customMware.setFlash);


// & Use Express Router
app.use('/', require('./routes'));



app.listen(port, function(err){
    if (err) {
        console.log(`Error in running server : ${port}`);
    }

    console.log(`server is up and running on port ${port}`);
});