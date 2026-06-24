const Soil = require('../models/Soil');

// @desc    Get all soils
// @route   GET /api/soils
// @access  Public
const getSoils = async (req, res) => {
  try {
    const soils = await Soil.find({});
    res.json(soils);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a soil
// @route   POST /api/soils
// @access  Private/Admin
const createSoil = async (req, res) => {
  try {
    const soil = new Soil(req.body);
    const createdSoil = await soil.save();
    res.status(201).json(createdSoil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a soil
// @route   PUT /api/soils/:id
// @access  Private/Admin
const updateSoil = async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);

    if (soil) {
      Object.assign(soil, req.body);
      const updatedSoil = await soil.save();
      res.json(updatedSoil);
    } else {
      res.status(404).json({ message: 'Soil not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a soil
// @route   DELETE /api/soils/:id
// @access  Private/Admin
const deleteSoil = async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);

    if (soil) {
      await soil.deleteOne();
      res.json({ message: 'Soil removed' });
    } else {
      res.status(404).json({ message: 'Soil not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getSoils, createSoil, updateSoil, deleteSoil };
