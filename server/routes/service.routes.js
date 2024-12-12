import express from 'express'
import userCtrl from '../controllers/user.controller.js'
import authCtrl from '../controllers/auth.controller.js'
import serviceCtrl from '../controllers/service.controller.js'

const router = express.Router()

// Route to get a service by serviceId
router.route('/api/service/:serviceId')
  .get(serviceCtrl.read)

// Route for services owned by a specific user
router.route('/api/services/by/:userId')
  .post(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.isAdmin, serviceCtrl.create)
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, serviceCtrl.listByOwner)

// Routes to update and delete a specific service
router.route('/api/services/:serviceId')
  .put(authCtrl.requireSignin, serviceCtrl.isOwner, serviceCtrl.update)
  .delete(authCtrl.requireSignin, serviceCtrl.isOwner, serviceCtrl.remove)

// Routes to fetch service logos or default photo
router.route('/api/services/logo/:serviceId')
  .get(serviceCtrl.photo, serviceCtrl.defaultPhoto)

router.route('/api/services/defaultphoto')
  .get(serviceCtrl.defaultPhoto)

// Load service details by serviceId for specific routes
router.param('serviceId', serviceCtrl.serviceByID)  // Uncommented this line to handle serviceId globally
router.param('userId', userCtrl.userByID)

export default router
