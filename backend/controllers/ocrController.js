const Tesseract =
  require("tesseract.js");

async function scanReceipt(
  req,
  res
) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message:
          "No image uploaded",
      });
    }

    const result =
      await Tesseract.recognize(
        req.file.path,
        "eng"
      );

    const text =
      result.data.text;

    const amountMatch =
      text.match(
        /\$?\d+\.\d{2}/
      );

    const amount =
      amountMatch
        ? parseFloat(
            amountMatch[0].replace(
              "$",
              ""
            )
          )
        : null;

    const lines =
      text
        .split("\n")
        .filter(
          (line) =>
            line.trim() !== ""
        );

    const merchant =
      lines[0] || "Unknown";

    let category =
      "Other";

    const lowerText =
      text.toLowerCase();

    if (
      lowerText.includes(
        "restaurant"
      ) ||
      lowerText.includes(
        "food"
      ) ||
      lowerText.includes(
        "burger"
      ) ||
      lowerText.includes(
        "pizza"
      )
    ) {
      category = "Food";
    } else if (
      lowerText.includes(
        "uber"
      ) ||
      lowerText.includes(
        "taxi"
      ) ||
      lowerText.includes(
        "fuel"
      )
    ) {
      category = "Transport";
    } else if (
      lowerText.includes(
        "netflix"
      ) ||
      lowerText.includes(
        "spotify"
      )
    ) {
      category =
        "Entertainment";
    }

    res.json({
      success: true,

      extractedText: text,

      extractedData: {
        merchant,
        amount,
        category,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  scanReceipt,
};