const express = require('express');
const router = express.Router();
const { getCompanies, createCompany } = require('../controllers/companyController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getCompanies).post(protect, createCompany);

module.exports = router;
