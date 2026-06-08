const {
  generateChatResponse,
} = require(
  "../services/chatService"
);

async function chatWithAI(
  req,
  res
) {
  try {
    const { message } =
      req.body;

    if (!message) {
      return res.status(400).json({
        message:
          "Message is required",
      });
    }

    const response =
      await generateChatResponse(
        message,
        req.user._id
      );

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

module.exports = {
  chatWithAI,
};