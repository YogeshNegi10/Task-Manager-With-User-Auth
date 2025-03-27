import express from 'express'
import { addTask, deleteAllTask, deleteTask, fetchBin, getMyTask, markTask, pushToBin, updateTask } from '../controllers/taskController.js';
import { auth } from '../middlewares/auth.js';

const taskRouter = express.Router()


taskRouter.get('/fetchTask', auth , getMyTask)
taskRouter.post('/newTask', auth , addTask)
taskRouter.put('/markTask/:id', auth , markTask)
taskRouter.put('/updateTask/:id', auth , updateTask)
taskRouter.delete('/deleteTask/:id', auth , deleteTask)
taskRouter.delete('/deleteAll', auth , deleteAllTask)
taskRouter.post('/pushToBin/:id',  pushToBin)
taskRouter.get('/getBin', auth , fetchBin)


export default taskRouter;