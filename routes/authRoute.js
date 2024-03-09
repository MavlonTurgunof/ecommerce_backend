const express = require('express');
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getaUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminCtrl,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createCoupon,
  createOrder,
  getOrders,
  updateOrderStatus,
} = require('../controller/userCtrl');
const { authMiddleware, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();
router.post('/register', createUser);
router.post('/forgot-password-token', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
router.put('/password', authMiddleware, updatePassword);
router.put('/order/updateorder/:id', authMiddleware, updateOrderStatus);

router.post('/login', loginUserCtrl);
router.post('/cart', authMiddleware, userCart);
router.post('/admin-login', loginAdminCtrl);
router.get('/get-orders', authMiddleware, getOrders);
router.get('/all-users', getAllUser);
router.get('/refresh', handleRefreshToken);
router.get('/wishlist', authMiddleware, getWishlist);
router.get('/usercart', authMiddleware, getUserCart);
router.delete('/emptycart', authMiddleware, emptyCart);
router.post('/cart/coupon', authMiddleware, applyCoupon);
router.post('/cart/cash-order', authMiddleware, createOrder);
router.post('/createcoupon', authMiddleware, isAdmin, createCoupon);

router.get('/:id', getaUser);
router.delete('/:id', deleteUser);
router.put('/edit-user', authMiddleware, updateUser);
router.put('/save-address', authMiddleware, saveAddress);
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);

module.exports = router;
