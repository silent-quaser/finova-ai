const Budget = require(
  "../models/Budget"
);

const Transaction = require(
  "../models/Transaction"
);

async function createBudget(
  req,
  res
) {
  try {
    const {
      category,
      limit,
    } = req.body;

    if (
      !category ||
      !limit
    ) {
      return res.status(400).json({
        message:
          "Please fill all fields",
      });
    }

    const budget =
      await Budget.create({
        user: req.user._id,
        category,
        limit,
      });

    res.status(201).json(
      budget
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function getBudgets(
  req,
  res
) {
  try {
    const budgets =
      await Budget.find({
        user: req.user._id,
      });

    const transactions =
      await Transaction.find({
        user: req.user._id,
        type: "expense",
      });

    const updatedBudgets =
      budgets.map((budget) => {
        const spent =
          transactions
            .filter(
              (transaction) =>
                transaction.category.toLowerCase() ===
                budget.category.toLowerCase()
            )
            .reduce(
              (
                acc,
                transaction
              ) =>
                acc +
                transaction.amount,
              0
            );

        return {
          ...budget._doc,
          spent,
        };
      });

    res.json(updatedBudgets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  createBudget,
  getBudgets,
};