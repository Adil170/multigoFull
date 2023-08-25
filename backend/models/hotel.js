const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [sizeSchema], // Array of size objects
  desc: { type: String },
});

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  desc: { type: String },
  items: [itemSchema], // Array of items inside the hotel
});

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
