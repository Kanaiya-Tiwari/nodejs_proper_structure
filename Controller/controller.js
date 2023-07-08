let customers = [
    { id: 1, name: 'Customer 1', balance: 100000 },
    { id: 2, name: 'Customer 2', balance: 5000000 }
  ];

  let transactionsdata = [];
const customer=async(req,res)=>{
    res.status(200).json(customers);
}
const transfer=async(req,res)=>{
    const { senderId, recipientId, amount } = req.body;
  
    const sender = customers.find(c => c.id === parseInt(senderId));
    const recipient = customers.find(c => c.id === parseInt(recipientId));
    
    if (!sender || !recipient) {
      res.status(404).json({ message: 'Invalid sender or recipient' });
    } else if (sender.balance < amount) {
      res.status(400).json({ message: 'Insufficient balance' });
    } else {
      sender.balance -= amount;
      recipient.balance += amount;
      
      transactionsdata.push({
        senderId,
        recipientId,
        amount,
        timestamp: new Date()
      });
      
      res.status(200).json({ message: 'Transfer successful' });
    } 
}

const transactions=async(req,res)=>{
    res.status(200).json(transactionsdata);
}

module.exports={customer,transfer,transactions}