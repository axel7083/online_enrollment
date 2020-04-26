const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');


const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    isDeleted: {type: Boolean,default:false}
},{
   timestamps:true
});

UserSchema.methods.generateHash = function(password) {
    return bcryptjs.hashSync(password, bcryptjs.genSaltSync(8),null);
};

UserSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password,this.password);
};

const User = mongoose.model('User',UserSchema);

module.exports = User;
