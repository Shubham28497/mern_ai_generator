const asyncHandler=require("express-async-handler")
const axios=require("axios")
const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt,
        max_tokens: 10,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const content = response?.data?.choices[0].text?.trim();

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