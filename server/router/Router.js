const { Router } = require("express");
const { getTodo, addTodo, updateTodo, deleteTodo } = require("../controllers/Controller");

const router = Router();

router.get('/',getTodo);
router.post('/todos',addTodo);
router.put('/todos/:id', updateTodo);
router.delete('/todos/:id', deleteTodo);

module.exports = router;