const express = require("express");

const multer = require("multer");

const authMiddleware = require("../middleware/authMiddleware");

const router =
  express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/scan",
  authMiddleware,
  upload.single("receipt"),
  async (req, res) => {
    try {
      res.json({
        merchant:
          "Starbucks",
        amount: 24.99,
        category:
          "Food",
      });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "OCR processing failed",
        });
    }
  }
);

module.exports = router;