const mongoose = require('mongoose');

// Create a customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  balance: Number
});

// Create a transaction schema
const transactionSchema = new mongoose.Schema({
  senderId: mongoose.Schema.Types.ObjectId,
  recipientId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  timestamp: Date
});

// Create customer and transaction models
const Customer = mongoose.model('Customer', customerSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);


module.exports={Customer,Transaction};