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
    let departments = await LoadDepartments();
    (await departments).forEach(async department => {

        let url = (URL_HEADER + department.replace("..", ""));
        console.log(url);

        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

    let scrapedData = [];
    $('p').each((i, elem) => {
        if ($(elem).hasClass("course-name")) {

            elem = $(elem).text();

            // console.log(`Processing: ${elem}`);

            // String processing 
            let course_details = elem.split("(");

            if (course_details[1]) {
                course_details[1] = course_details[1].replace(')', '')
                let course_units = course_details[1].split(", ")

                // Loops over for each unit option per class
                course_units.forEach(element => {
                    scrapedData.push(`${course_details[0]} (${element})`); 
                });
            } else {
                scrapedData.push(elem); 
            }
        }
    });
    console.log(scrapedData);
    });
    } catch (error) {
        console.error(`Error while attempting to process: ${error}`)
    }
}

export default Load_Classes;