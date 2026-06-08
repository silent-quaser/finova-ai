const Goal =
  require("../models/Goal");

async function createGoal(
  req,
  res
) {
  try {
    const {
      title,
      targetAmount,
    } = req.body;

    const goal =
      await Goal.create({
        user: req.user._id,
        title,
        targetAmount,
      });

    res.status(201).json(
      goal
    );
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
}

async function getGoals(
  req,
  res
) {
  try {
    const goals =
      await Goal.find({
        user: req.user._id,
      });

    res.json(goals);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
}

async function contributeToGoal(
  req,
  res
) {
  try {
    const { amount } =
      req.body;

    const goal =
      await Goal.findById(
        req.params.id
      );

    if (!goal) {
      return res.status(404).json({
        message:
          "Goal not found",
      });
    }

    goal.currentAmount +=
      Number(amount);

    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
}

module.exports = {
  createGoal,
  getGoals,
  contributeToGoal,
};