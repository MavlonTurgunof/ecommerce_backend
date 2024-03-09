const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv').config();
const fs = require('fs');

const fileToGenerativePart = (path, mimeType) => {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString('base64'),
      mimeType,
    },
  };
};

const detectColors = async (imagePath) => {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY_AI);
  const model = await genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
  const prompt =
    'give me only colors in this format: color1, color2, color3, ...';
  const imageParts = [fileToGenerativePart(imagePath, 'image/jpeg')];
  const result = await model.generateContent([prompt, imageParts]);
  const response = await result.response;
  const text = response.text();
  return text.split(', ').map((color) => color.trim());
};

module.exports = { detectColors };
