const mongoose = require('mongoose');
// const { use } = require('../routes/auth');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
        unique: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    }
});    

const User = mongoose.model('user', NotesSchema);
module.exports = mongoose.model('notes', NotesSchema);


