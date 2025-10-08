const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Replace with your Genesys Cloud region
const GENESYS_API_BASE = 'https://api.mypurecloud.com/api/v2'; 

// Replace with your OAuth token retrieval logic
const getAuthHeader = () => ({
  Authorization: `Bearer YOUR_GENESYS_CLOUD_ACCESS_TOKEN`
});

app.use(bodyParser.json());

// Get list of worktypes
app.get('/api/worktypes', async (req, res) => {
  try {
    const resp = await axios.get(
      `${GENESYS_API_BASE}/workforce/worktypes`, 
      { headers: getAuthHeader() }
    );
    res.json(resp.data.entities);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get schema for selected worktype
app.get('/api/worktypes/:id/schema', async (req, res) => {
  try {
    const resp = await axios.get(
      `${GENESYS_API_BASE}/workforce/worktypes/${req.params.id}`,
      { headers: getAuthHeader() }
    );
    res.json(resp.data.schema);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Create a workitem
app.post('/api/workitems', async (req, res) => {
  try {
    const resp = await axios.post(
      `${GENESYS_API_BASE}/workforce/workitems`,
      req.body,
      { headers: getAuthHeader() }
    );
    res.json(resp.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});