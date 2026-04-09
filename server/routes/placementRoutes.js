const express = require('express');
const router = express.Router();
const { getPlacements, createPlacement } = require('../controllers/placementController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getPlacements).post(protect, createPlacement);

module.exports = router;
