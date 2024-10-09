const TaskService = require("../services/task.service");

const getTask = async(req, res) => {
    try{
        const data = await TaskService.findTask();
        res.status(200).json(data);
    }catch(err){
        res.status(500).json({error : err.message});
    }
}

const createTask = async (req, res) => {
    try {
      const { title, description, deadline } = req.body;
      const linkedFile = req.file ?
       {data : req.file.buffer, contentType : req.file.mimetype}
       :null ;
  
      const newTask = await TaskService.createTask({
        title,
        description,
        deadline,
        linkedFile
      });
      console.log(newTask);
      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

const updateTask = async(req, res) => {
    try{
        const id = req.params.id;
        const result =  await TaskService.update(id, req.body);
        res.status(200).json(result);
    }catch(err){
        res.status(500).json({error : err.message});
    }
}

const deleteTask  = async(req, res) => {
    try{
        const id = req.params.id;
        const result = await TaskService.deletes(id);
        res.status(204).json(result);
    }catch(err){
        res.status(500).json({error : err.message});
    }
}

module.exports = {
    getTask,
    createTask,
    updateTask,
    deleteTask
};