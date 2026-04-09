const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  branch: { type: String, required: true },
  skills: [{ type: String }],
  placementStatus: { 
    type: String, 
    enum: ['Unplaced', 'Applied', 'Shortlisted', 'Selected'], 
    default: 'Unplaced' 
  },
  resumeScore: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);
