const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCoursesSchema = new Schema({
    userId: {type: String, required: true},
    courses_id: {type: Array},
    passed: {type: Boolean},
    grade: {type: String},
    elective: {type: String},
    primary_choice: {type: String},
    secondary_choice: {type: String}
},{
    timestamps:true
});

const UserCourses = mongoose.model('UserCourses',UserCoursesSchema);

module.exports = UserCourses;
