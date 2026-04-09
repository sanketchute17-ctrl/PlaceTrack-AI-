const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  package: { type: String, required: true },
  location: { type: String, default: 'Remote' },
  type: { type: String, enum: ['Full-time', 'Internship'], default: 'Full-time' },
  eligibility: [{ type: String }] // array of required skill keywords
}, { timestamps: true });

module.exports = mongoose.model('Company', companySchema);
