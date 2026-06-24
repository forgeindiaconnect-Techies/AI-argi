const Crop = require('../models/Crop');

// @desc    Get all crops
// @route   GET /api/crops
// @access  Public
const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({}).populate('suitableSoilTypes', 'name');
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a crop
// @route   POST /api/crops
// @access  Private/Admin
const createCrop = async (req, res) => {
  try {
    const crop = new Crop(req.body);
    const createdCrop = await crop.save();
    res.status(201).json(createdCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
const updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (crop) {
      Object.assign(crop, req.body);
      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404).json({ message: 'Crop not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (crop) {
      await crop.deleteOne();
      res.json({ message: 'Crop removed' });
    } else {
      res.status(404).json({ message: 'Crop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCrops, createCrop, updateCrop, deleteCrop };
