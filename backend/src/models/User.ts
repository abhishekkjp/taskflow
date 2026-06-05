import mongoose , {Document} from "mongoose";
import bcrypt from 'bcryptjs'

export interface Iuser extends Document {
    name : string  ; 
    email : string ; 
    password : string ; 
    comparepassword(password :string) : Promise<boolean> ; 
}

const userSchema = new mongoose.Schema<Iuser>(
   { 
    name : {type : String , required: true} ,  
    email : {type: String , required : true , unique:true , lowercase : true}, 
    password : {type: String , required:true}
  } , 
  {timestamps :true}
) ; 


// hash password before saving 
userSchema.pre('save' , async function (next){
    if(!this.isModified('password')) return  ; 
    this.password = await bcrypt.hash(this.password,10) ; 
    return
}) ; 

// compare password method 
userSchema.methods.comparepassword = async function (password:string){
    return bcrypt.compare(password,this.password) ; 
}


export default mongoose.model<Iuser>('User' , userSchema) ; 






