const express = require('express');
const {
  createBrand,
  getBrand,
  getAllBrands,
  deleteBrand,
  updateBrand,
} = require('../controller/brandCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBrand);
router.put('/:id', authMiddleware, isAdmin, updateBrand);
router.get('/:id', getBrand);
router.get('/', getAllBrands);
router.delete('/:id', authMiddleware, isAdmin, deleteBrand);

module.exports = router;
