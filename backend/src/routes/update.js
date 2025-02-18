import express from 'express';
import Course from '../models/classSchema.js';

const router = express.Router();

// Script Imports
import Load_Classes from '../utils/classes.js';

async function parse_courses(contents, _id) {

  if (contents) {
      const department = contents[0];  // e.g., "VIS"
      const number = contents[1];      // e.g., "125A"
      const name = contents[2];        // e.g., "Twentieth-Century Art"
      const units = contents[3];       // e.g., "4"

      try {
        await Course.findOneAndUpdate(
          { _id },  // Find by userID
          { name, department, number, units }, // Update fields
          { upsert: true, new: true } // Create if not exists
      );  

      return true;

      } catch (error) {
          console.error(`Trouble with ${department}, ${number}, ${name}, ${units}`);
          console.error(`Trouble parsing ${error}`);

          return false;
      }
  }

}

router.get('/update-courses', async (req, res) => {
    try {
        var parse_complete = false;
        let id_assigner = 0;
        let course_list = await Load_Classes();
        for (let course of course_list) {
              parse_complete = parse_courses(course, id_assigner++);
          }
          if (parse_complete) {
            res.json("Updated courses!");
          }
        } catch (error) {
        console.error("Error while scrapping: " + error);
      }
});

router.get('/load-courses', async (req, res) => {

  const courses = await Course.find({});
  try {
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
  }

    res.json(courses);

  } catch (error) {
  res.status(500).json({ message: "Error loading courses" });
  }
  

});

export default router;
