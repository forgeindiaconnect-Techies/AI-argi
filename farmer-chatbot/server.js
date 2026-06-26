const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Make sure you have this in your .env file
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can change this to gpt-4 if you have access
      messages: [
        { 
          role: 'system', 
          content: 'You are a highly knowledgeable and helpful agricultural AI assistant. You help farmers with crop suggestions, pest control, weather interpretation, and soil management.' 
        },
        { 
          role: 'user', 
          content: message 
        }
      ],
    });

    // Send the AI's response back to the client
    res.json({ reply: completion.choices[0].message.content });

  } catch (error) {
    console.error('Error with OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Farmer Chatbot server is running on port ${port}`);
});
