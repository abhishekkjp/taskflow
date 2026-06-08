import {Router} from 'express' ; 
import {getTasks,getTask,createTask,updateTask, deleteTask,} from '../controllers/task.controller' ; 
import auth from '../middleware/auth' ; 


const router = Router() ; 


// All task routes are protected with auth middleware
router.use(auth) ; 

router.get('/' , getTasks) ; 
router.get('/:id' , getTask) ; 
router.post('/' , createTask) ; 
router.put('/:id' , updateTask) ; 
router.delete('/:id',deleteTask) ; 


export default router ; 



