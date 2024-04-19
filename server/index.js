require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

// ACCESS API KEYS
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// GENERAL SYSTEM INSTRUCTION  
const systemInstruction = {
    parts: [
      {
        text: "response contain only table no need extra text"
      }
    ]
  };
  

const generationConfig = {
    temperature: 1,
    top_p: 0.95,
    top_k: 0,
    max_output_tokens: 8192,
};

const safetySettings = [
    {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
    {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_MEDIUM_AND_ABOVE",
    },
];


async function run() {

    // INITIALIZE GEN AI MODEL 
    // 🔺 OLD
    //  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    // 🔺 NEW
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-pro-latest",
        generationConfig,
        systemInstruction,
        safetySettings,
    });

    // Implement use case: Generate text from text-only input
    const prompt = "generate synthetic data for my machine learning model with 10 features for Boston house price prediction \ngive me only table no need other text.generate atleast 20 rows";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
}

run();
