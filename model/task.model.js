const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
      type:String,
      enum:['Pending', 'In-progress', 'Completed'],
      default:'Pending'
    },
    dueDate:{
        type:Date
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
         type:Date
    },
    assignee:{
        type:String,
        required:true,
        trim:true
    }
});

const Task = mongoose.model('Task', userSchema);

module.exports = Task;



