const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Route to receive messages and send responses
app.post('/api/message', async (req, res) => {
  const userMessage = req.body.message;
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: userMessage,
      max_tokens: 150
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });
    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));