// const GenAI = require('../models/GenAIModel');
// const asyncHandler = require('express-async-handler');
// const validateMongoDbId = require('../utils/validateMongodbId');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const fs = require('fs');
// const dotenv = require('dotenv').config();

// // Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// // Converts local file information to a GoogleGenerativeAI.Part object.
// function fileToGenerativePart(path, mimeType) {
//   return {
//     inlineData: {
//       data: Buffer.from(fs.readFileSync(path)).toString('base64'),
//       mimeType,
//     },
//   };
// }

// async function detectColors() {
//   // For text-and-image input (multimodal), use the gemini-pro-vision model
//   const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });

//   const prompt = 'give me only colors in this format red, blue, brown';

//   const imageParts = [fileToGenerativePart('image2.jpeg', 'image/jpeg')];

//   const result = await model.generateContent([prompt, imageParts]);
//   const response = await result.response;
//   const text = response.text();
//   const colors = text.split(', ');
// }

// const getProducts = asyncHandler(async (req, res) => {});

const multer = require('multer'); // Import multer for image upload
const Product = require('../models/productModel');
const GenAI = require('../models/GenAIModel');
const asyncHandler = require('express-async-handler'); // Configure multer for image storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Change 'uploads' to your desired upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const detectColorsAndRecommendProducts = asyncHandler(async (req, res) => {
  try {
    // Access uploaded image from request
    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const colors = await GenAI.detectColors(image.path);
    const matchingProducts = await Product.find({ color: { $in: colors } });
    res.json({ message: 'Success', products: matchingProducts });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error detecting colors or retrieving products' });
  }
});

// Add this route to your main app file
module.exports = {
  upload,
  detectColorsAndRecommendProducts,
};
