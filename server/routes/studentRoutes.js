const express = require('express');
const router = express.Router();
const { getStudents, createStudent, getStudentById, generateScore, getRecommendations } = require('../controllers/studentController');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getStudents).post(protect, createStudent);
router.route('/:id').get(protect, getStudentById);
router.route('/:id/score').post(protect, generateScore);
router.route('/:id/recommendations').get(protect, getRecommendations);

module.exports = router;
