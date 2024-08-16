  // Imports
  const express = require('express');
  const path = require('path');
  const multer = require('multer');
  const cors = require('cors');

  // Creating server instance
  const app = express();

  // Serve static files from the React build directory
  app.use(express.static(path.join(__dirname, 'build')));
  app.use(express.json());  
  app.use(cors());

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/Images")
    },
    filename: function(req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

  const upload = multer({storage})
  
  // All other routes should redirect to the React app (for client-side routing)
  app.post('/upload', upload.single('file'), (req, res) => {
    // Send a response back to the client
    console.log(req.body);
    console.log(req.file);

    res.json({ message: 'Test successful' });


  });

  // Starts server instnace
  const port = 8080; // Use environment variable for port
  app.listen(port, () => console.log(`Server listening on port ${port}`));