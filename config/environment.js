// const { session } = require("passport");

const dovelopment = {
    name: 'dovelopment',
    asset_path: './assets',
    session_cookie_key: 'blajsomething',
    db: 'codeial_dovelopment',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ankurcha98@gmail.com',
            pass: 'wlkrkuxufvofeonr'
        }
    },
    google_clientID: "117629751327-s79inja59pqllcknp9ht30frg4d6unc2.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production',
    asset_path: process.env.port,
    session_cookie_key: 'blajsomething',
    db: 'codeial_production',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'ankurcha98@gmail.com',
            pass: 'kbztxtumfereqywc'
        }
    },
    google_clientID: "117629751327-s79inja59pqllcknp9ht30frg4d6unc2.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://codei/users/auth/google/callback",
    jwt_secret: 'codeial'

}

module.exports = dovelopment;