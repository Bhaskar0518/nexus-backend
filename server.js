const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const Order    = require('./models/Order');

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());               // allow requests from your HTML file
app.use(express.json());       // parse JSON bodies

// ── MongoDB connection ──────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅  MongoDB connected — nexusdb'))
  .catch(err => { console.error('❌  MongoDB error:', err.message); process.exit(1); });

// ── Routes ──────────────────────────────────────────────────────────────────

// Health check
app.get('/', (req, res) => res.json({ status: 'Nexus backend running 🚀' }));

// POST /api/orders — save a new order
app.post('/api/orders', async (req, res) => {
  try {
    const { orderNumber, customer, items, paymentMethod, subtotal, shipping, total } = req.body;

    if (!orderNumber || !customer || !items || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Missing required order fields.' });
    }

    const order = new Order({ orderNumber, customer, items, paymentMethod, subtotal, shipping, total });
    await order.save();

    console.log(`📦  Order saved: ${orderNumber} — ${customer.email} — $${total}`);
    res.status(201).json({ success: true, orderNumber: order.orderNumber, id: order._id });

  } catch (err) {
    // Duplicate order number guard
    if (err.code === 11000) {
      return res.status(409).json({ success: false, error: 'Duplicate order number.' });
    }
    console.error('Save error:', err.message);
    res.status(500).json({ success: false, error: 'Internal server error.' });
  }
});

// GET /api/orders — list all orders (useful for your own dashboard later)
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ placedAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => console.log(`🌐  Server listening on http://localhost:${PORT}`));
