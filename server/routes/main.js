const express = require('express');
const controller = require('../controllers/mainController');
const router = express.Router({ mergeParams: true });

router.post('/post_city', controller.postCity);
router.post('/delete_city', controller.deleteCity);
router.get('/get_cities', controller.getCities);
router.post('/update_weather', controller.manualUpdate);

module.exports = router;