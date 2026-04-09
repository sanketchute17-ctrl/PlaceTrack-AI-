const Company = require('../models/Company');

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = { getCompanies, createCompany };
