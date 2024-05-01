const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001', // SECURITY - ALLOW REQ. FROM FRONTEND - DIFFERENT URL
}));


const port = 3000;

// INITIALIZE GENAI WITH API KEY 
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// SETTINGS
const generationConfig = {
    temperature: 1,
    top_p: 0.95,
    top_k: 0,
    max_output_tokens: 8192,
};

const systemInstruction = {
    parts: [
        {
            text: "response contain only table no need extra text"
        }
    ]
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

// ENDPOINT - http://localhost:3000/generate-data - GET METHOD
app.get('/generate-data', async (req, res) => {
    try {
        // INITIALIZE GEN AI MODEL
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            generationConfig,
            systemInstruction,
            safetySettings,
        });

        // PROMPT
        const prompt = "Generate synthetic data for a machine learning model aimed at predicting Boston house prices. Include 2 features in the dataset. Please provide the data in JSON format, containing at least 3 rows. Ensure that the response does not include any special formatting symbols, such as ``` or ```.";

        const result = await model.generateContent(prompt);
        const generatedData = result.response.text(); 

        console.log('Generated data:', generatedData);

        // RETURN JSON RESPONSE
        res.json({ data: generatedData });
    } catch (error) {
        console.error('Error generating synthetic data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



// START THE SERVER
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
