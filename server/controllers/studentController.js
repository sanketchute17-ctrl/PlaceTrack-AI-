const Student = require('../models/Student');
const Company = require('../models/Company');
const { calculateScore } = require('../utils/scoreEngine');

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('userId', 'name email');
    res.json(students);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createStudent = async (req, res) => {
  try {
    const student = await Student.create({ ...req.body, userId: req.user._id });
    res.status(201).json(student);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Smart Feature 1: Resume Score
const generateScore = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    const company = await Company.findById(req.body.companyId);
    if (!student || !company) return res.status(404).json({ message: 'Student or Company not found' });
    
    const score = calculateScore(student.skills, company.eligibility);
    student.resumeScore = score;
    await student.save();
    
    res.json({ score, student });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Smart Feature 2: Recommendations
const getRecommendations = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const companies = await Company.find();
    const recommendations = companies.map(company => ({
      company,
      matchScore: calculateScore(student.skills, company.eligibility)
    })).filter(rec => rec.matchScore >= 40) // Match threshold
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json(recommendations);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { getStudents, createStudent, getStudentById, generateScore, getRecommendations };
