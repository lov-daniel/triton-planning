  // Package Imports
  import express from 'express';
  import path from 'path';
  import multer from 'multer';
  import cors from 'cors';
  import { auth } from "express-openid-connect";
  import pdfjs from 'pdfjs-dist/es5/build/pdf.js'; 
  import { fileURLToPath } from 'url';

  // Script Imports
  import Process_Transcript from './transcript.js';

  // Constants
  const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
  const TERM = "Term:";
  const END_CLASSES = "Term Credits Passed:";
  const NO_GRADE = "N/A";
  const PAGE_BREAK = "Not an Official Transcript";
  const TRANSFER = "Approx";


  // Storage
  let quarters = [];
  let contents = [];

  // CommonJS work arounds
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Creating server instance
  const app = express();

  // auth router attaches /login, /logout, and /callback routes to the baseURL
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
  
  //Grade Functions
  const reset_storage = () => {
    quarters = [];
    contents = [];
  }

  // Pushes a blank grade when no grade is found.
  const push_blank = (quarter, class_array) => {
    quarters[quarter].push(NO_GRADE);
    class_array.push(NO_GRADE);

  };

  const load_quarters = () => {
    contents.forEach(element => {

      const items = element.items.map((item) => {
        let word = item.str;

        if (word.includes(TERM)) {
          let quarter = [word];
          quarters.push(quarter);
        }
      })
    })

    quarters.push(["Transfer Courses:"]);

    console.log("Quarters Loaded:");
    console.log(quarters);
  };

  // req.isAuthenticated is provided from the auth router
  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });

  // All other routes should redirect to the React app (for client-side routing)
  app.post('/upload', upload.single('file'), async (req, res) => {
    // Send a response back to the client
    res.json({ message: 'Upload successful' });
    reset_storage();

    const filePath = req.file.path;


    try {
      const document = await pdfjs.getDocument(filePath).promise; 
      let status, results = await Process_Transcript(document).promise;

      // Gets all possible pages
      for (let i = 1; i <= document.numPages; i++) {
        let page = await document.getPage(i);
        let content = await page.getTextContent();
        contents.push(content);
      }

      load_quarters();
      let textContent = '';

      // Keeps track of what is being scanned
      let content_counter = 0;
      let quarter_counter = 0;
      let break_counter = 0;

      // [department, course number, course title, units, grade]
      let classes = [];
      let scanning_classes = false;

      contents.forEach(element => {

        const items = element.items.map((item) => {
          let word = item.str;
          textContent += (' ' + word);
          console.log("Word: ", word);

          if (break_counter > 0) {
            break_counter--;
            return;
          }
  
          if (scanning_classes) {
            // Marks the end of the class scanner
            if (word.includes(END_CLASSES)) {
              scanning_classes = false;
              if (content_counter == 3 && !GRADES.includes(word)) {
                push_blank(quarter_counter, classes);
                content_counter = 0;
              }

              quarter_counter++;
            } else {

              if (word.includes(PAGE_BREAK)) {
                break_counter = 15;
                return;
              }

              // Excludes unit/gpa counts.
              if (!word.includes(".")) {
                if ((content_counter == 3 && !GRADES.includes(word) )) {
                  push_blank(quarter_counter, classes);
                  content_counter = 1;
                } else {
                  content_counter++;
                }
                quarters[quarter_counter].push(word);
                classes.push(word);
                
              }
            }
          }

          //Found start of classes
          if (word.includes("Repeat")) {
            scanning_classes = true;
          }
        });

      })

      console.log("Total quarters: ");
      console.log(quarters);
      
      console.log("Total classes: ");
      console.log(classes);

    } catch (error) {
      console.error("error: ", error);
    }
    

  });

  // Starts server instnace
  const port = 8080; // Use environment variable for port
  app.listen(port, () => console.log(`Server listening on port ${port}`));