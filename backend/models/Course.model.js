const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_id: {type: String, required: true, unique: true/*,index: true*/},
    course_name: {type: String},
    Lecturer: {type: String},
    AcademicUnit: {type: String},
    prerequisite: {type: Array},
    UpdatedDate: {type: Date},
    Url: {type: String}
});

//CourseSchema.index({course_id:"text"});
const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;
