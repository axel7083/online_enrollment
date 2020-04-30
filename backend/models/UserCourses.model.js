const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserCoursesSchema = new Schema({
    userId: {type: String, required: true},
    courses: {type: Array} /*Example: [{id:"course1id",type="regular"}]*/
});

const UserCourses = mongoose.model('UserCourses',UserCoursesSchema);

module.exports = UserCourses;
