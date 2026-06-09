export default function HealthScore({
  transactions,
}) {
  const income =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "income"
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

  const expenses =
    transactions
      .filter(
        (transaction) =>
          transaction.type ===
          "expense"
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

  const savings =
    income - expenses;

  let score = 50;

  if (income > 0) {
    const ratio =
      savings / income;

    score =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            ratio * 100
          )
        )
      );
  }

  let status =
    "Needs Improvement";

  if (score >= 75) {
    status = "Excellent";
  } else if (
    score >= 50
  ) {
    status = "Good";
  } else if (
    score >= 30
  ) {
    status = "Average";
  }

  return (
    <div className="glass rounded-[32px] p-8 border border-white/10">

      <div className="flex items-center justify-center mb-10">

        <div className="relative w-64 h-64 rounded-full border-[18px] border-cyan-500/20 flex items-center justify-center">

          <div className="text-center">

            <h2 className="text-7xl font-bold text-cyan-400">
              {score}
            </h2>

            <p className="text-3xl text-zinc-400">
              /100
            </p>

          </div>

        </div>

      </div>

      <h2 className="text-5xl font-bold text-center mb-10">
        Financial Status
      </h2>

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="glass rounded-3xl p-8 border border-white/10 text-center">

          <p className="text-zinc-400 text-xl mb-4">
            Total Income
          </p>

          <h2 className="text-5xl font-bold text-green-400">
            ${income}
          </h2>

        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 text-center">

          <p className="text-zinc-400 text-xl mb-4">
            Total Expenses
          </p>

          <h2 className="text-5xl font-bold text-red-400">
            ${expenses}
          </h2>

        </div>

      </div>

      <div className="flex items-center justify-between mb-4">

        <p className="text-3xl text-zinc-300">
          Health Status
        </p>

        <p className="text-3xl font-bold text-cyan-400">
          {status}
        </p>

      </div>

      <div className="w-full h-6 rounded-full bg-white/5 overflow-hidden">

        <div
          style={{
            width: `${score}%`,
          }}
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        />

      </div>

    </div>
  );
}