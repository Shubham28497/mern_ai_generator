const asyncHandler = require("express-async-handler");
const axios = require("axios");

//* OpenAI Controller

const openAIController = asyncHandler(async (req, res) => {
  const { prompt } = req.body;
  try {
    await axios.post("https://api.openai.com/v1/completions", {
      model: "gpt-3.5-turbo",
      prompt,
      max_tokens: 10,
    },{
        
    });
  } catch (error) {}
});
