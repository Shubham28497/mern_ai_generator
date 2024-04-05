const asyncHandler=require("express-async-handler")
const axios=require("axios")
// Ensure this is securely stored

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Assuming the response includes a message from the assistant
    const content = response?.data?.choices[0]?.message?.content?.trim();

    res.status(200).json({
      status: "success",
      data: content,
    });
  } catch (error) {
    res.status(429);
    throw new Error(error);
  }
});
module.exports={
    openAIController
}