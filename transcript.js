// Imports
import pdfjs from 'pdfjs-dist/es5/build/pdf.js'; 

// Search Constants
const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];
const TERM = "Term:";
const END_CLASSES = "Term Credits Passed:";
const NO_GRADE = "N/A";
const PAGE_BREAK = "Not an Official Transcript";
const TRANSFER = "Approx";

// Status codes
const SUCCESS = 1;
const ERROR = -1;

// Scanning document for quarters

const Load_Quarters = async (contents) => {

    let quarters = [];

    contents.forEach(element => {

      const items = element.items.map((item) => {
        let word = item.str;

        if (word.includes(TERM)) {
          let quarter = [word];
          quarters.push(quarter);
        }
      })
    })

    return quarters;
}

// Page processing function
const Process_Pages = async (file) => {
    let contents = [];

    // Gets all possible pages
    try {
        for (let i = 1; i <= file.numPages; i++) {
            let page = await file.getPage(i);
            let content = await page.getTextContent();
            contents.push(content);

            return contents;
        }
    } catch (error) {
        console.error("Error while processing pages:", error);
    }

};

// Primarily function
const Process_Transcript = async (file) => {

    let data = [];
    let file_contents = await Process_Pages().promise;
    let quarters = await Load_Quarters(file_contents).promise;




    


    return data;
};

export default Process_Transcript;