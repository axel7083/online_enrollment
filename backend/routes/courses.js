const router = require('express').Router();
const Course = require('../models/Course.model');

const auth = require('../middleware/auth');

router.route('/').get(auth,(req, res) => {

    const page = req.query.page || 1;
    const nPerPage = req.query.nPerPage || 20;

    Course.find()
        .skip( page > 0 ? ( ( page - 1 ) * nPerPage ) : 0 )
        .limit( nPerPage )
        .then((response) => {

            Course.count()
                .then((count) => {
                    res.json({array:response,count:count,nbOfPage:Math.ceil(count/nPerPage)});
                })
                .catch((err) => res.status(400).json("Error: " + err));
        })
        .catch((err) => res.status(400).json("Error: " + err));

});

/*only teacher/admin should be able to access to this endpoint.*/
router.route('/add').post((req, res) => {

    addCourse(
        req.body.course_id,
        req.body.course_name,
        req.body.Lecturer,
        req.body.AcademicUnit,
        req.body.prerequisite,
        req.body.UpdatedDate,
        req.body.Url)
        .then(() => {
            res.status(201).json({
                message: 'Course added successfully!'
            });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

async function addCourse(course_id,course_name,Lecturer,AcademicUnit,prerequisite,UpdatedDate,Url)
{
    const course = new Course({
        course_id: course_id,
        course_name: course_name,
        Lecturer: Lecturer,
        AcademicUnit: AcademicUnit,
        prerequisite: prerequisite,
        UpdatedDate: UpdatedDate,
        Url: Url
    });

    try {
        await course.save()
    }
    catch (error)
    {
        throw error;
    }

}

/*only teacher/admin should be able to access to this endpoint.*/
router.route('/update').post((req, res) => {

    Course.replaceOne({course_id: req.body.course_id},{course_name: req.body.course_name,prerequisite: req.body.prerequisite},{ upsert: true }) //This will create one if could found.
        .then(
        () => {
            res.status(201).json({
                message: 'Course updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );
});


router.route('/search').get(auth,(req, res) => {

    const value = req.query.value;

    Course.find( { $or: [ {course_id:{$regex:".*"+ value + ".*"}}, {course_name:{$regex:".*"+ value + ".*"}} ] })
        .limit( 10 )
        .then((response) => {
            res.json(response);
        })
        .catch((err) => res.status(400).json("Error: " + err));

});






//This operation is VERY expensive in term of performance
//And should NOT be run often.
router.route('/scraping-courses-from-ius').get((req, res) => {

    fetchCourses()
        .then(() => {
            res.json("Done!");
        })
        .catch(err => res.json("Error: " + err));
});

async function fetchCourses() {

    //First we clear all the courses registered.
    await Course.deleteMany();

    const cheerio = require('cheerio');
    const axios = require('axios');

    let run = true;
    let pageNumber = 0;

    while(run) {

        let response;
        try {
            response = await axios.get('https://ecampus.ius.edu.ba/syllabi?page=' + pageNumber);
        } catch (error) {
            throw Error("IUS Server not happy")
        }


        pageNumber++;
        // Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data);
        const trArray = $("tbody").eq(0).find("tr");

        if(trArray.length === 0)
            run = false;
        else {
            try {
                await trArray.each(async function (index, value) {
                    const fullname = $(value).find(".views-field-title").eq(0).find("a").eq(0).text();
                    const url = $(value).find(".views-field-title").eq(0).find("a").eq(0).attr("href");
                    const course_id = fullname.split(' ')[0];
                    let name = '';
                    fullname.split(' ').forEach((value,index) => {
                        if(index!==0)
                            name+=value + ' ';
                    });

                    const lecturer = $(value).find(".views-field-field-lecturer-").eq(0).text();
                    const academicUnit = $(value).find(".views-field-field-academic-unit").eq(0).text();
                    const updateDate = $(value).find(".views-field-changed-1").eq(0).text();

                    //We need to get the prerequisite for each course...
                    let coursesDetails;
                    try {
                        coursesDetails = await axios.get('https://ecampus.ius.edu.ba' + url);
                    } catch (error) {
                        throw Error("IUS Server not happy (" + error + ")");
                    }

                    const $2 = cheerio.load(coursesDetails.data);
                    const prerequisite = $2("[border=1]").find("[colspan=4]").eq(0).text()
                        .replace('/','')
                        .replace(',','')
                        .split(' ');

                    await addCourse(
                        course_id,
                        name,
                        lecturer.toString().trim(),
                        academicUnit.toString().trim(),
                        prerequisite,
                        new Date((updateDate).replace('-','')),
                        url
                        );

                });
            } catch (error) {
                throw Error("IUS Server not happy")
            }
        }
        console.log("pageNumber " + pageNumber + " parsed");

    }

}


module.exports = router;
