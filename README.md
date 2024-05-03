# Gemini Gen AI Hackathon

👋 Welcome to Gemini-Gen-Ai-Hackathon project! This repository contains code for a synthetic data generator using Google Gemini API, built with React on the client side and Node.js on the server side.

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
git clone https://github.com/athul-22/Gemini-Gen-Ai-Hackathon.git

2. Navigate to the project directory:
   cd Gemini-Gen-Ai-Hackathon

   
3. Install dependencies for both client and server:
cd client
npm install

cd ../server
npm install


4. Set up environment variables:
- In the server directory, create a `.env` file.
- Inside the `.env` file, add your Google Gemini API key:
  ```
  API_KEY=YOUR_API_KEY
  ```

5. Start the server:
cd ../server
npm start

6. Start the client:


7. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

This application is designed to generate synthetic data using the Google Gemini API. The main file for the data generator is located at `client/src/layouts/datagen/datagenerator.js`.

## Additional Content

You can easily add extra contents to the synthetic data generator. Simply modify the `datagenerator.js` file to include the desired additional content.

## Repository Structure

- `client`: Contains the client-side code written in React.
- `server`: Contains the server-side code written in Node.js.
- `client/src/layouts/datagen/datagenerator.js`: Main file for the data generator.
- `server/index.js`: Entry point for the server.
- `.env`: Environment variables file for storing API keys.

Feel free to explore the code and customize it according to your needs!

🚀 Happy hacking! 🌟



