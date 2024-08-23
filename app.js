const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());

const API_KEY = process.env.API_KEY;
const BASE_URL = process.env.BASE_URL;

async function fetchPage(start) {
  const url = `${BASE_URL}&start=${start}`;
  try {
    const response = await axios.get(url, { params: { api_key: API_KEY } });
    return response.data;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

app.get('/results', async (req, res) => {
  const start = req.query.start || 0;
  try {
    const data = await fetchPage(start);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
