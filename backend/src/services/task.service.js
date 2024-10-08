const Task = require("../models/task.model");

// class TaskService {
//     find = async () => {
//         const tasks = await Task.find({});
//         return Task;
//     };
//     create = async (body) => {
//         const task = new Task(body);
//         const savedTask = await task.save();
//         return savedTask;
//       };
    
//       update = async (id, body) => {
//         const updatedTask = await Task.findByIdAndUpdate(id, body, {
//           new: true,
//         });
//         return updatedTask;
//       };
    
//       delete = async (id) => {
//         const deletedTask = await Task.findByIdAndDelete(id);
//         return deletedTask;
//       };
// }

const findTask = async() => {
    try{
        const tasks = await Task.find({});
        return Task;
    }catch(err){
        console.log("Error while fetching the data ", err);
    }
}

const createTask = async(body) => {
    try{
        const task = new Task(body);
        const savedTask = await task.save();
        return savedTasked;
    }catch(err){
        console.log("Error while creating a Task, ", err);
    }
}