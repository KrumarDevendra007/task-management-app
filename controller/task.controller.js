const Task = require('../model/task.model');

const createTasks = async (req, res) =>{
    try{
        const taskData = req.body;
        const task = await Task.create(taskData);

        res.status(200).json({
            message: `Task ${task.title} created successfully!`,
            task: task
        });
    }
    catch(err){
        res.status(500).json({
            message: 'An error occurred during create task. Please try again',
            error: err.message
        });
    }
}

const fetchTasks = async (req, res) => {
    try{
        const tasks = await Task.find();
        
        res.status(200).json({
            message:"All tasks fetched successfully!",
            tasks:tasks
        });
    }
    catch(err){
       res.status(500).json({
         message: "Error to get all the tasks try again.",
            error: err.message
       });
    }
}

const getTaskById = async (req, res) => {
    try{
        
        const taskId = req.params.id;
        const task = await Task.findById(taskId);

       if (!task) {
       return res.status(404).send( `Task with id:${taskId} not found.`);
       }

        res.status(200).json({
            message: `Task with id:${task._id} fetched successfully!`,
            task: task
        });
    }
    catch(err){
          res.status(500).json({
            message: "Error to get the task please try again.",
            error: err.message
        });
    }
} 

const updateTask = async (req, res) => {
    try{
       
    const _id = req.params._id; 
    const { title, description, status, dueDate, assignee } = req.body;
    

    const updatedTask = await Task.findByAndUpdate(_id,
       
      {
        $set:{
        title,
        description,
        status,
        dueDate,
        assignee,
        updatedAt: new Date()
       } 
      },
      { new: true }
);

     if(!updatedTask){
        return res.status(404).send("Task not found. Please enter valid ID.");
     }       

        
        res.status(200).json({
            message: "Task has been update successfully!",
            task:{
            _id: updatedTask._id,
            title: updatedTask.title,
            description: updatedTask.description,
            status: updatedTask.status,
            assignee: updatedTask.assignee, 
            updatedAt: updatedTask.updatedAt
        }
        });

    }
    catch(err){
        res.status(500).json({
            message: "Error to update task",
            error: err.message
        });
    }
}

const deleteTask = async (req, res) => {
    try{
          const id = req.params._id;
          const task = await Task.findByIdAndDelete(id);

           if (!task) {
      return res.status(404).send("Task not found. Please enter valid ID.");
    }

          res.status(200).send('Task Delete successfully!');
    }
    catch(err){
        res.status(500).json({
            message: 'Error to delete the task try again.',
            error: err.message
        });
    }
}

const tasksSummary = async (req, res) => {
    try{
         const tasksummary = await Task.aggregate([
            {
                $group:{
                _id:{
                    purpose: "$description",
                    deadline: "$dueDate"
                }
               
            }
            },
            {
                $project:{
                    summary:"$_id",
                    _id: 0,
                }
            }
         ]);

         res.status(200).json({
            message: "Task summary fetched successfully!",
            summary:tasksummary
         });
    }
    catch(err){
        res.status(500).send("Task summary not found. please try again!");
    }
}



module.exports = {
    createTasks,
    fetchTasks,
    getTaskById,
    updateTask, 
    deleteTask,
    tasksSummary
}