const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/transactionsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const transactionSchema = new mongoose.Schema({
  id: String,
  date: Number,
  sender: {
    firstName: String,
    lastName: String,
    dateOfBirth: String,
    IDNumber: String,
  },
  recipient: {
    firstName: String,
    lastName: String,
    email: String,
    accountNumber: String,
    bank: String,
  },
  Amount: Number,
  CurrencyCd: String,
  Comments: String,
  status: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

app.get('/api/transactions', async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate).getTime(),
        $lte: new Date(endDate).getTime(),
      },
    }).sort({ date: -1 });

    const filteredTransactions = transactions.filter(transaction =>
      ["COMPLETED", "IN PROGRESS", "REJECTED"].includes(transaction.status)
    );

    res.json(filteredTransactions);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
