const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// trip collection
router
    .route('/trips')
    .get(tripsController.tripsList);

// single trip
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;
