import express from 'express';
import Course from '../models/classSchema.js';

const router = express.Router();

// Script Imports
import Load_Classes from '../utils/classes.js';

async function parse_courses(course_string) {
  const regex = /([A-Za-z]+)\s(\d+[A-Za-z]*)\.\s([\w\s-]+)\s\((\d+)\)/;
  
  const match = course_string.match(regex);

  if (match) {
      const department = match[1];  // e.g., "VIS"
      const number = match[2];      // e.g., "125A"
      const name = match[3];        // e.g., "Twentieth-Century Art"
      const units = match[4];       // e.g., "4"

      const new_course = new Course({
        name,
        department,
        number,
        units: parseInt(units)
      });

      try {
        // Save the course to the database
        await new_course.save();
        console.log(`Saved: ${department} ${number}`);
      } catch (error) {
          console.error(`Trouble parsing ${course_string}`);
      }
  }

}

router.get('/', async (req, res) => {
    try {
        let departments = await Load_Classes();
        res.json("Updated courses!");

        for (let department of departments) {
            for (let course of department) {
              parse_courses(course);
            }
        }

      } catch (error) {
        console.error("Error while scrapping: " + error);
      }
});

export default router;
