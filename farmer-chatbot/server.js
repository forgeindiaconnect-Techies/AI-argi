const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const http = require('http');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initialize OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are an agricultural AI assistant.' },
        { role: 'user', content: message }
      ],
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error with OpenAI:', error.message);
    res.status(500).json({ error: 'Failed to communicate with AI', details: error.message });
  }
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Farmer Chatbot server is running on port ${port}`);
});

// Keep process alive manually just in case
setInterval(() => {}, 1000 * 60 * 60);

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
