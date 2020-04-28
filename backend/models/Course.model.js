const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    course_id: {type: String, required: true, unique: true},
    course_name: {type: String},
    prerequisite: {type: Array}
},{
    timestamps:true
});

const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;
