const PDFDocument =
  require("pdfkit");

const Transaction =
  require(
    "../models/Transaction"
  );

async function generateReport(
  req,
  res
) {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    const totalIncome =
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

    const totalExpenses =
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

    const balance =
      totalIncome -
      totalExpenses;

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Financial_Report.pdf"'
    );

    doc.pipe(res);

    doc
      .fontSize(28)
      .text(
        "Finova AI Financial Report",
        {
          align: "center",
        }
      );

    doc.moveDown();

    doc
      .fontSize(18)
      .text(
        `Total Income: $formatCurrency(totalIncome}`
      );

    doc
      .fontSize(18)
      .text(
        `Total Expenses: $formatCurrency(totalExpenses}`
      );

    doc
      .fontSize(18)
      .text(
        `Current Balance: $formatCurrency(balance}`
      );

    doc
      .fontSize(18)
      .text(
        `Transactions: formatCurrency(transactions.length}`
      );

    doc.moveDown();

    doc
      .fontSize(22)
      .text("Transactions");

    doc.moveDown();

    transactions.forEach(
      (transaction) => {
        doc
          .fontSize(14)
          .text(
            `formatCurrency(transaction.type.toUpperCase()} | formatCurrency(transaction.category} | $formatCurrency(transaction.amount}`
          );
      }
    );

    doc.end();
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  generateReport,
};