import express from "express";
import bookingCtrl from "../controllers/booking.controller.js";
import authCtrl from "../controllers/auth.controller.js";
import serviceCtrl from "../controllers/service.controller.js";

const router = express.Router();

router
  .route("/api/bookings/by/:serivceId")
  .post(authCtrl.requireSignin, serviceCtrl.isOwner, bookingCtrl.create)
  .get(bookingCtrl.listByService);

router.route("/api/bookings/:bookingId").get(bookingCtrl.read);

router
  .route("/api/booking/image/:bookingId")
  .get(bookingCtrl.photo, bookingCtrl.defaultPhoto);
router.route("/api/booking/defaultphoto").get(bookingCtrl.defaultPhoto);

router
  .route("/api/booking/:serviceId/:bookingId")
  .put(authCtrl.requireSignin, serviceCtrl.isOwner, bookingCtrl.update)
  .delete(authCtrl.requireSignin, serviceCtrl.isOwner, bookingCtrl.remove);

//router.param("serviceId", serviceCtrl.serviceByID);
router.param("bookingId", bookingCtrl.bookingByID);

export default router;


