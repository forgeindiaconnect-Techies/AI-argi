const Crop = require('../models/Crop');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

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

// @desc    Get crop recommendation from CSV dataset
// @route   GET /api/crops/recommend?district=COIMBATORE&season=Kharif
// @access  Public
const getCropRecommendation = async (req, res) => {
  try {
    const { district, season } = req.query;

    if (!district || !season) {
      return res.status(400).json({
        message: 'District and season are required',
      });
    }

    const results = [];
    const csvPath = path.join(__dirname, '../../dataset/crop_data.csv');

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        const filtered = results.filter((item) => {
          return (
            item.District_Name &&
            item.Season &&
            item.District_Name.trim().toLowerCase() === district.trim().toLowerCase() &&
            item.Season.trim().toLowerCase() === season.trim().toLowerCase()
          );
        });

        if (filtered.length === 0) {
          return res.status(404).json({
            message: 'No crop data found for this district and season',
          });
        }

        filtered.sort((a, b) => Number(b.Production) - Number(a.Production));

        const bestCrop = filtered[0];

        res.json({
          district,
          season,
          recommendedCrop: bestCrop.Crop,
          area: bestCrop.Area,
          production: bestCrop.Production,
          cropYear: bestCrop.Crop_Year,
          suggestion: `${bestCrop.Crop} is suitable for ${district} in ${season} season based on production data.`,
          topCrops: filtered.slice(0, 5).map((crop) => ({
            crop: crop.Crop,
            area: crop.Area,
            production: crop.Production,
            year: crop.Crop_Year,
          })),
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCrops,
  createCrop,
  updateCrop,
  deleteCrop,
  getCropRecommendation,
};