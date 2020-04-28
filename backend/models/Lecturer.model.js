const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    name: {type: String, required: true, unique: true}
});

const Lecturer = mongoose.model('Lecturer',LecturerSchema);

module.exports = Lecturer;
