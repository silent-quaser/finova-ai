const Transaction = require(
  "../models/Transaction"
);

async function createTransaction(
  req,
  res
) {
  try {
    const {
      type,
      category,
      amount,
      description,
      date,
    } = req.body;

    if (
      !type ||
      !category ||
      !amount
    ) {
      return res.status(400).json({
        message:
          "Please fill required fields",
      });
    }

    const transaction =
      await Transaction.create({
        user: req.user._id,
        type,
        category,
        amount,
        description,
        date,
      });

    res.status(201).json(
      transaction
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getTransactions(
  req,
  res
) {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      }).sort({
        date: -1,
      });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function deleteTransaction(
  req,
  res
) {
  try {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message:
          "Transaction not found",
      });
    }

    if (
      transaction.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await transaction.deleteOne();

    res.json({
      message:
        "Transaction deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function updateTransaction(
  req,
  res
) {
  try {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message:
          "Transaction not found",
      });
    }

    if (
      transaction.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(
      updatedTransaction
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};