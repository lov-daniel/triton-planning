// Package Imports
import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
// Loading messages 
const uri = process.env.MONGO_URI; 

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("MongoDB connection error:", err));


// Route Imports
import updateRoutes from './routes/update.js';
import authRoutes from './routes/auth.js';
import fileRoutes from './routes/file.js';

// CommonJS work arounds
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Creating server instance
const app = express();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());  
app.use(cors());

// Routes
app.use('/update', updateRoutes);
app.use('/auth-user', authRoutes);
app.use('/upload', fileRoutes);

// Starts server instance
let port = process.env.PORT || 4000;

app.listen(port, 
  () => console.log(`Server listening on port ${port}`
));
