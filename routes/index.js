const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');



console.log('Routers loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments', require('./comment'))

// ~ for any further routes access from here
// & router.use('./routerName',require(./router) );




module.exports = router;