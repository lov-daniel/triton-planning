// Imports

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

// Utility function to push blanks for classes without grades
  // Pushes a blank grade when no grade is found.
const push_blank = (quarter, quarters) => {
  quarters[quarter].push(NO_GRADE);
};

// Page processing function
const Process_Pages = async (file, contents) => {

  // Gets all possible pages
  try {
      for (let i = 1; i <= file.numPages; i++) {
          let page = await file.getPage(i);
          let content = await page.getTextContent();
          contents.push(content);
      }
  } catch (error) {
      console.error("Error while processing pages:", error);
  }
};


// Scanning document for quarters
const Load_Quarters = async (contents) => {

    let quarters = [];

    contents.forEach(element => {

      element.items.map((item) => {
        let word = item.str;

        if (word.includes(TERM)) {
          let quarter = [word];
          quarters.push(quarter);
        }
      })
    })

    // Allocates extra space for transfer courses.
    quarters.push(["Transfer Courses:"]);
    console.log("Quarters Loaded:");
    console.log(quarters);

    return quarters;
}

const Process_Classes = async (contents, quarters) => {

  let SCAN = false; // Variable to track whether or not we should be looking for classes
  let textContent = ""; // Variable to store all of the text content to be used for debugging.
  let break_counter = 0; // Variable to keep track of how many lines of text should be skipped upon page break.
  let content_counter = 0; // Variable to keep track of how much info we should be taking in.
  let quarter_counter = 0; // Variable to keep track of what quarter we are iterating within.

  contents.forEach(element => {

    const items = element.items.map((item) => {
      let word = item.str;
      
      textContent += (' ' + word);
      console.log("Word: ", word);

      if (break_counter > 0) {
        break_counter--;
        return;
      }
      if (SCAN) {
        // Marks the end of the class scanner
        if (word.includes(END_CLASSES)) {
          SCAN = false;
          if (content_counter == 3 && !GRADES.includes(word)) {
            push_blank(quarter_counter, quarters);
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
              push_blank(quarter_counter, quarters);
              content_counter = 1;
            } else {
              content_counter++;
            }
            quarters[quarter_counter].push(word);
          }
        }
      }
      //Found start of classes
      if (word.includes("Repeat")) {
        SCAN = true;
      }

    })
  })

}

// Primarily function
const Process_Transcript = async (file) => {

    let contents = [];
    
    await Process_Pages(file, contents);
    let quarters = await Load_Quarters(contents);
    await Process_Classes(contents, quarters);
    
    return quarters;
};

export default Process_Transcript;