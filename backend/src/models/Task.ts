import mongoose , {Document} from "mongoose";
import User from "./User";


export interface ITask extends Document {
    title : string ; 
    description : string ; 
    status : 'todo' | 'inprogress'  | 'done' ; 
    priority : 'low'  | 'medium' | 'high' ; 
    tags : string[] ; 
    dueDate? : Date ; 
    progress : number ; 
    owner : mongoose.Types.ObjectId ;  
}


const taskSchema = new mongoose.Schema<ITask>(
    {
         title : {type : String , required: true} , 
         description : {type : String,default : ''} , 
         status : {type : String , enum : ['todo','inprogress','done'] , default :'todo'} , 
         priority : {type:String,enum:['low','medium','high'] , default : 'medium'} , 
         tags  : [{type:String}] , 
         dueDate : {type:Date} , 
         progress  : {type : Number , default : 0 , min : 0 , max:100} , 
         owner : {type : mongoose.Schema.Types.ObjectId  , ref:'User',required:true}
    } , 
    {timestamps:true}
) ; 


export default mongoose.model<ITask>('Task',taskSchema) ; 