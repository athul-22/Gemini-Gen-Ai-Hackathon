const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(express.json());
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

// ENDPOINT - http://localhost:3000/generate-data - POST METHOD
app.post('/generate-data', async (req, res) => {
    try {
        // INITIALIZE GEN AI MODEL
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            generationConfig,
            systemInstruction,
            safetySettings,
        });

        let prompt = "Generate synthetic data for a machine learning model aimed at predicting Boston house prices. Include CRIM | ZN | INDUS | CHAS | NOX | RM | AGE | DIS | RAD | TAX features in the dataset. Please provide the data in JSON format, containing at least 3 rows. Ensure that the response does not include any special formatting symbols, such as ``` or ```.";
        console.log('Request body:', req.body);

        // CHECK IF REQUEST BODY CONTAINS COLUMN NAMES AND TOP ROWS
        if (req.body && req.body.columnNames && req.body.topRows) {
            console.log('Received column names:', req.body.columnNames)
            console.log('Received top 3 rows:', req.body.topRows)
            const { columnNames, topRows } = req.body;
            prompt = `Generate synthetic data for a machine learning model aimed at predicting Boston house prices. Include ${columnNames} features in the dataset. Please provide the data in JSON format, containing at least 3 rows similar to ${topRows}. Ensure that the response does not include any special formatting symbols.`;
        }
        
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

app.post('/analyze-data', async (req, res) => {
    try {
        const generatedData = req.body.generatedData;
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-pro-latest",
            generationConfig,
            systemInstruction,
            safetySettings,
        });

        let prompt = `Generate analysis based on the provided ${generatedData} with the following components: data types, potential users, models, and a graph data sample. Ensure that the analysis is structured in JSON format with the appropriate tags for each component. Exclude any design elements, symbols, or extra lines.
        `;

        const result = await model.generateContent(prompt);
        const analysis = result.response; 
        const analysisData = analysis.candidates[0].content; 
        console.log('Analysis Data:', analysisData);
        console.log('Analysis:', analysis.response);

        res.json({ analysis: analysisData });
    } catch (error) {
        console.error('Error analyzing data:', error);
        res.status(500).json({ error: error.message }); 
    }
});

app.post('/upload-csv', (req, res) => {
    try {
      const { columnNames, topRows } = req.body;

      console.log('Received column names:', columnNames);
      console.log('Received top 3 rows:', topRows);
  
      res.status(200).json({ message: 'CSV data received successfully.' });
    } catch (error) {
      console.error('Error handling CSV upload:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


// START THE SERVER
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
