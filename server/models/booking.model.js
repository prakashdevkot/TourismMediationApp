import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
  },
  quantity: {
    type: Number,
    required: "Quantity is required",
  },
  price: {
    type: Number,
    required: "Price is required",
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
  service: { type: mongoose.Schema.ObjectId, ref: "Service" },
});

export default mongoose.model("Booking", BookingSchema);



