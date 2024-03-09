const express = require('express');
const {
  createBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBLog,
  updateBlog,
  disLikeBLog,
  uploadImages,
} = require('../controller/blogCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const { uploadPhoto, blogImgResize } = require('../middlewares/uploadImages');

const router = express.Router();

router.post('/', authMiddleware, isAdmin, createBlog);
router.put(
  '/upload/:id',
  authMiddleware,
  isAdmin,
  uploadPhoto.array('images', 2),
  blogImgResize,
  uploadImages
);
router.put('/likes', authMiddleware, isAdmin, likeBLog);
router.put('/dislikes', authMiddleware, isAdmin, disLikeBLog);
router.put('/:id', authMiddleware, isAdmin, updateBlog);
router.get('/:id', getBlog);
router.get('/', getAllBlogs);
router.delete('/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;
