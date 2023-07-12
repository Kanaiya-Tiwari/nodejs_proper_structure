const { Customer, Transaction } = require("../model/model");
const customer = async (req, res) => {
  try {
    let result = await Customer.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching customers" });
  }
};
const transfer = async (req, res) => {
  try{
    const { senderId, recipientId, amount } = req.body;
    const sender  = await Customer.findById(senderId);
    const recipient= await Customer.findById(recipientId);
     if (!sender || !recipient) {
       res.status(404).json({ message: "Invalid sender or recipient" });
     } else if (sender.balance < amount) {
       res.status(400).json({ message: "Insufficient balance" });
     } else {
       const newTransaction = new Transaction({
         senderId,
         recipientId,
         amount,
         timestamp: new Date()
       });
     await  Promise.all([
         newTransaction.save(),
         Customer.findByIdAndUpdate(senderId, { $inc: { balance: -amount } }),
         Customer.findByIdAndUpdate(recipientId, { $inc: { balance: amount } })
       ]);
       res.status(200).json({ message: "Transfer successful" });
     }
  } catch(err){
    res.status(400).json({ message: err.message });
  }

};

const transactions = async (req, res) => {
  try {
    let result = await Transaction.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Error fetching Transaction" });
  }
};

module.exports = { customer, transfer, transactions };
