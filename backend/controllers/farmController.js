const Farm = require('../models/Farm');

// @desc    Get user's farms
// @route   GET /api/farms
// @access  Private
const getFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ user: req.user._id }).populate('soilType', 'name');
    res.json(farms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new farm
// @route   POST /api/farms
// @access  Private
const createFarm = async (req, res) => {
  try {
    const { name, location, landArea, waterAvailability, irrigationMethod, soilType } = req.body;

    const farm = new Farm({
      user: req.user._id,
      name,
      location,
      landArea,
      waterAvailability,
      irrigationMethod,
      soilType
    });

    const createdFarm = await farm.save();
    res.status(201).json(createdFarm);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update farm
// @route   PUT /api/farms/:id
// @access  Private
const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (farm) {
      if (farm.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      Object.assign(farm, req.body);
      const updatedFarm = await farm.save();
      res.json(updatedFarm);
    } else {
      res.status(404).json({ message: 'Farm not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete farm
// @route   DELETE /api/farms/:id
// @access  Private
const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (farm) {
      if (farm.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      await farm.deleteOne();
      res.json({ message: 'Farm removed' });
    } else {
      res.status(404).json({ message: 'Farm not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getFarms, createFarm, updateFarm, deleteFarm };
