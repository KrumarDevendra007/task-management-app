const router = require('express').Router();
const { createTasks, fetchTasks, getTaskById, updateTask, deleteTask, tasksSummary } = require('../controller/task.controller');


router.post('/tasks',  createTasks);

router.get('/tasks', fetchTasks);

router.get('/tasks/:id', getTaskById);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/:id', deleteTask);

router.get('/summary', tasksSummary);

module.exports = router;
