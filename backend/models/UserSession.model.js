const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSessionSchema = new Schema({
    userId: {type: String, required: true, unique: true},
    token: {type: String, required: true}
},{
    timestamps:true
});

const UserSession = mongoose.model('UserSession',UserSessionSchema);

module.exports = UserSession;
