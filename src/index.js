// Imports
const express = require('express');
const path = require('path');

// Creating server instance
const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());  

// All other routes should redirect to the React app (for client-side routing)
app.post('/api', (req, res) => {
  // Send a response back to the client
  res.json({ message: 'Received POST request at /api/submitted' });
});

// Starts server instnace
const port = 8080; // Use environment variable for port
app.listen(port, () => console.log(`Server listening on port ${port}`)); 