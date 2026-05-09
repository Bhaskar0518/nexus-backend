const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id:    { type: Number },
  name:  { type: String, required: true },
  brand: { type: String },
  price: { type: Number, required: true },
  qty:   { type: Number, required: true, default: 1 },
  img:   { type: String },
}, { _id: false });

const customerSchema = new mongoose.Schema({
  fname:   { type: String, required: true },
  lname:   { type: String },
  email:   { type: String, required: true },
  phone:   { type: String },
  address: { type: String },
  city:    { type: String },
  zip:     { type: String },
  country: { type: String },
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber:   { type: String, required: true, unique: true },
  customer:      { type: customerSchema, required: true },
  items:         { type: [orderItemSchema], required: true },
  paymentMethod: { type: String, enum: ['card', 'paypal', 'apple'], default: 'card' },
  subtotal:      { type: Number, required: true },
  shipping:      { type: Number, default: 0 },
  total:         { type: Number, required: true },
  status:        { type: String, enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'placed' },
  placedAt:      { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
