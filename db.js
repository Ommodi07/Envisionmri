const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Object_Id = mongoose.Types.ObjectId;

const registerNumberData = ['IN34334987','IN89371647','IN78939123','IN78348902']
const userSchema = new Schema({
    email:{type:String,unique:true},
    password: String,
    firstname:String,
    lastname:String,
    registerNumber:{type:String,enum:registerNumberData,required:true},


});


const patientSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:Number,required:true},
    gender:{type:String,enum:['male','female']},
    medicalHistory: {type:String,required:true},
    contactNumber: {type:String,required:true},
    userId:{type:Object_Id,required:true}
})


const userModel = mongoose.model("user",userSchema);
const patientModel = mongoose.model('patient',patientSchema);

module.exports = {
    userModel,
    patientModel
};