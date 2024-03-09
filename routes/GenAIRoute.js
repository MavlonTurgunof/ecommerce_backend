const express = require('express');
const { upload } = require('../controller/GenAICtrl');
const { detectColorsAndRecommendProducts } = require('../controller/GenAICtrl');

const router = express.Router();

router.post(
  '/recommend-products',
  upload.single('image'),
  detectColorsAndRecommendProducts
);

module.exports = router;
