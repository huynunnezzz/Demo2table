const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
       email:{
        type:String,
        require:true
       },
       password:{
        type:String,
        require:true
       },
       role:{
        type:String,
        require:true
       },
       full_name:{
        type:String,
        require:true
       },
});

module.exports = mongoose.model('USERS', usersSchema,'users');