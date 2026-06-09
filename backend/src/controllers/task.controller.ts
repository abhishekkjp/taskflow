import { Response } from "express";
import Task from '../models/Task' ; 
import { AuthRequest } from "../middleware/auth";



// @desc   Get all tasks for logged in user
// @route  GET /api/tasks
export const getTasks = async (req:AuthRequest ,res : Response) : Promise<void>=>{
          try {
               const tasks = await Task.find({owner:req.userId}).sort({createdAt:-1}) ;
               res.json(tasks) ;  
          } catch (error) {
            res.status(500).json({message:"Server error"}) ; 
          }
}



// @desc   Get single task
// @route  GET /api/tasks/:id

export const getTask = async (req:AuthRequest , res:Response) : Promise<void> =>{
        try {
             const task = await Task.findOne({_id:req.params.id , owner:req.userId})  ;
             if(!task){
                res.status(404).json({message:'Task not found'}) ; 
                return ; 
             }
             res.json(task) ; 
        } catch (error) {
               res.status(500).json({message:'Server error'}) ;    
        }
} 



// @desc   Create a task
// @route  POST /api/tasks
export const createTask = async (req:AuthRequest,res:Response) : Promise<void> =>{
     try {
         const {title,description,status,priority,tags,dueDate,progress} = req.body ; 
         const task = await Task.create({
            title,description,status,priority,tags,dueDate,progress, owner : req.userId
         }) ; 
         res.status(201).json(task) ; 
     } catch (error) {
            res.status(501).json({message:"Server Error"}) ;       
     }
} ; 
 


// @desc   Update a task
// @route  PUT /api/tasks/:id
export const updateTask = async (req:AuthRequest,res:Response) : Promise<void> =>{
     try {
          
          console.log('request received for update') ; 
         const task = await Task.findOne({_id:req.params.id , owner:req.userId}) ;
        
         if(!task){
            res.status(404).json({message : 'Task not found'}) ; 
            return  ; 
         }
         const updated  = await Task.findByIdAndUpdate(
            req.params.id , 
            {$set : req.body} , 
            {new :true , runValidators :true} 
         ) ; 
         res.json(updated) ; 
     } catch (error) {
        res.status(500).json({message:'Server error'}) ; 
     }
} ; 


// @desc   Delete a task
// @route  DELETE /api/tasks/:id

export const deleteTask = async (req:AuthRequest,res:Response) : Promise<void> =>{
       try {
          //  console.log("req. for deletion") ; 
          //  console.log(req) ; 
            const task = await Task.findOne({_id:req.params.id , owner:req.userId}) ;
            if(!task){
                res.status(404).json({message:"Task not found"}) ; 
                return   ; 
            }
            await task.deleteOne() ; 
            res.json({message:'Task deleted'}) ; 
       } catch (error) {
            res.status(500).json({message:"Server error"}) ; 
       }
} ; 



