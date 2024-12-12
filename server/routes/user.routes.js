import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

// Routes for user creation and listing
router
  .route('/api/users')
  .post(userCtrl.create) // Create a new user
  .get(userCtrl.list); // List all users

// Routes for specific user operations
router
  .route('/api/users/:userId')
  .get(authCtrl.requireSignin, userCtrl.read) // Get user details
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update) // Update user details
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove); // Delete user

// Parameter middleware for user ID
router.param('userId', userCtrl.userByID);

export default router;
