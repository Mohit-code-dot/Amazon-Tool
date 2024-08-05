const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    imgpath:{
        type:Array,
        required:true
    }
});
const users = new mongoose.model("image",userSchema);
module.exports = users; 