import axios from 'axios';
import * as cheerio from 'cheerio';

const DEPARTMENT_URL = "https://catalog.ucsd.edu/front/courses.html";
const URL_HEADER = "https://catalog.ucsd.edu"

const LoadDepartments = async () => {

    const { data } = await axios.get(DEPARTMENT_URL);
    const $ = cheerio.load(data);

    let scrapedData = [];
    $('a').each((i, elem) => {
      const href = $(elem).attr('href');
      if (href) {
        if (href.includes("courses/")) {
            scrapedData.push(href); // Push the href value into the links array
        }
      }
    });

    return scrapedData;
};

const Load_Classes = async () => {

    try {
        let return_data = [];
        let departments = await LoadDepartments();
        
        // Use for...of instead of forEach
        for (let department of departments) {
            let url = (URL_HEADER + department.replace("..", ""));

            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            $('p').each((i, elem) => {
                if ($(elem).hasClass("course-name")) {
                    elem = $(elem).text();
                    // String processing 
                    let course_details = elem.split("(");
                    let unit_count;
                    let full_title = course_details[0];
                    let department_number = full_title.split(/\. ?|:/);
                    let course_department = department_number[0].split(' ')[0].split('/')[0];
                    let course_number = department_number[0].split(' ')[1];

                    if (course_details[1]) {
                        unit_count = course_details[1].match(/\b\d{1,2}\b/);
                        if (!unit_count) {
                            unit_count = course_details[2].match(/\b\d{1,2}\b/);
                        }

                        unit_count = (unit_count[0] != null ? unit_count[0] : 0)
                    } else {
                        unit_count = 0;
                    }

                    let course_title = department_number[1];
                    if (course_title) {
                        if (course_title[course_title.length - 1] == " ") {
                            course_title = course_title.substring(0, course_title.length - 1);
                        }
                    }
                    return_data.push([course_department, course_number, course_title, unit_count])
                }
            });
        }

        return return_data;
    } catch (error) {
        console.error(`Error while attempting to process: ${error}`);
    }
};


export default Load_Classes;