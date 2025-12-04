const mongoose = require('mongoose');
 const UsersData = mongoose.Schema({
    username :{
        type : String,
        required :true,
    },
    email :{
        type : String,
        required :true,
    },
    data : {
        type : Date,
        default : Date.now
    }
 })

 module.exports = mongoose.model('userdata',UsersData)