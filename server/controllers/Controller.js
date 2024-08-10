const todoModel = require("../model/Model");

module.exports.getTodo= async (req,res) =>{
    const todo = await todoModel.find();
    res.send(todo);
}

module.exports.addTodo = async (req, res) => {
  try {
    const { user, status, dueDate, priority, comments } = req.body;
    const newTodo = new todoModel({
      user,
      status,
      dueDate,
      priority,
      comments,
    });

    const savedTodo = await newTodo.save();
    res.status(201).send(savedTodo);
  } catch (error) {
    res.status(500).send({ message: "Error adding to-do item", error });
  }
};

module.exports.updateTodo = async (req, res) => {
    const { id } = req.params; 
    const { user, status, dueDate, priority, comments } = req.body;
  
    try {
      const updatedTodo = await todoModel.findByIdAndUpdate(
        id,
        { user, status, dueDate, priority, comments }, 
        { new: true } 
      );
  
      if (!updatedTodo) {
        return res.status(404).send({ message: "To-do item not found" });
      }
  
      res.send(updatedTodo);
    } catch (error) {
      res.status(500).send({ message: "Error updating to-do item", error });
    }
  };

  module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedTodo = await todoModel.findByIdAndDelete(id);
  
      if (!deletedTodo) {
        return res.status(404).send({ message: "To-do item not found" });
      }
  
      res.status(200).send({ message: "To-do item deleted successfully" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting to-do item", error });
    }
  };
  