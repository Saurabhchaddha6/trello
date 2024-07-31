const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  status: { 
    type: String, 
    enum: ['To-Do', 'In Progress', 'Under Review', 'Finished'], 
    required: true 
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'Urgent'],
    required: false 
  },
  deadline: { type: Date, required: false },
  createdAt: {type: Date},
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User

});

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);

export default Task;
