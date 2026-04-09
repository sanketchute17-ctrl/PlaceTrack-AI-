const Placement = require('../models/Placement');
const Student = require('../models/Student');

const getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().populate('studentId').populate('companyId');
    res.json(placements);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const createPlacement = async (req, res) => {
  try {
    const placement = await Placement.create(req.body);
    
    // Automatically trickle down the placement state to the main student body document if updated here.
    if (req.body.status) {
      await Student.findByIdAndUpdate(req.body.studentId, { placementStatus: req.body.status });
    }
    
    res.status(201).json(placement);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = { getPlacements, createPlacement };
