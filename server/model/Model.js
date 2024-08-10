const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  id : String,
  user: String,
  status: String,
  dueDate: {
    type: Date,
    required: true,
  },
  priority: String,
  comments: String,
});

const Task = mongoose.model("todos", todoSchema);

module.exports = Task;