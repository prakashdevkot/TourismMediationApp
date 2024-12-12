import Booking from "../models/booking.model.js";
import extend from "lodash/extend.js";
import errorHandler from "../helpers/dbErrorHandler.js";
import formidable from "formidable";
import fs from "fs";

const create = (req, res, next) => {
  let form = formidable({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Image could not be uploaded",
      });
    }
    Object.keys(fields).forEach((key) => (fields[key] = fields[key][0]));
    Object.keys(files).forEach((key) => (files[key] = files[key][0]));
    let booking = new Booking(fields);
    booking.service = req.service;
    if (files.image) {
      booking.image.data = fs.readFileSync(files.image.filepath);
      booking.image.contentType = files.image.mimetype;
    }
    try {
      let result = await booking.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const bookingByID = async (req, res, next, id) => {
  try {
    let booking = await Booking.findById(id)
      .populate("service", "_id name")
      .exec();
    if (!product)
      return res.status("400").json({
        error: "Booking not available",
      });
    req.booking = booking;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve to book",
    });
  }
};

const photo = (req, res, next) => {
  if (req.booking.image.data) {
    res.set("Content-Type", req.booking.image.contentType);
    return res.send(req.booking.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return null;
};

const read = (req, res) => {
  req.booking.image = undefined;
  return res.json(req.product);
};

const update = (req, res) => {
  let form = formidable({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "Sorry! Photo could not be uploaded",
      });
    }
    Object.keys(fields).forEach((key) => (fields[key] = fields[key][0]));
    Object.keys(files).forEach((key) => (files[key] = files[key][0]));
    let booking = req.booking;
    booking = extend(booking, fields);
    booking.updated = Date.now();
    if (files.image) {
      booking.image.data = fs.readFileSync(files.image.filepath);
      booking.image.contentType = files.image.mimetype;
    }
    try {
      let result = await booking.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const remove = async (req, res) => {
  try {
    let booking = req.booking;
    let deletedBooking = await booking.deleteOne({ _id: booking._id });
    res.json(deletedBooking);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const listByService = async (req, res) => {
  try {
    let bookings = await Booking.find({ shop: req.shop._id })
      .populate("service", "_id name")
      .select("-image");
    res.json(bookings);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  bookingByID,
  photo,
  defaultPhoto,
  read,
  update,
  remove,
  listByService,
};


