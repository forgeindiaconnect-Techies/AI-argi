const Cultivation = require('../models/Cultivation');

// @desc    Get user's cultivations
// @route   GET /api/cultivations
// @access  Private
const getCultivations = async (req, res) => {
  try {
    const cultivations = await Cultivation.find({ user: req.user._id }).populate('farm', 'name location');
    res.json(cultivations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new cultivation
// @route   POST /api/cultivations
// @access  Private
const createCultivation = async (req, res) => {
  try {
    const { farm, cropName, expectedHarvestDate, notes } = req.body;

    const cultivation = new Cultivation({
      user: req.user._id,
      farm,
      cropName,
      expectedHarvestDate,
      notes
    });

    const createdCultivation = await cultivation.save();
    res.status(201).json(createdCultivation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update cultivation status
// @route   PUT /api/cultivations/:id
// @access  Private
const updateCultivation = async (req, res) => {
  try {
    const cultivation = await Cultivation.findById(req.params.id);

    if (cultivation) {
      if (cultivation.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized' });
      }

      Object.assign(cultivation, req.body);
      const updatedCultivation = await cultivation.save();
      res.json(updatedCultivation);
    } else {
      res.status(404).json({ message: 'Cultivation not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getCultivations, createCultivation, updateCultivation };
