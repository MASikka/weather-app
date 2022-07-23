const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router({ mergeParams: true });

router.post('/post_city', controller.postCity);
router.post('/delete_city', controller.deleteCity);
router.get('/get_cities', controller.getCities);

module.exports = router;