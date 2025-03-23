import express from 'express'
import { addTask, deleteTask, getMyTask, updateTask } from '../controllers/taskController.js';
import { auth } from '../middlewares/auth.js';

const taskRouter = express.Router()


taskRouter.get('/fetchTask', auth , getMyTask)
taskRouter.post('/newTask', auth , addTask)
taskRouter.put('/updateTask/:id', auth , updateTask)
taskRouter.delete('/deleteTask/:id', auth , deleteTask)


export default taskRouter;