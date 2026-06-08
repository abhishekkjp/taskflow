import { Request , Response } from "express";
import jwt from 'jsonwebtoken' ; 
import User from '../models/User' ; 
import { Types } from 'mongoose';



const generateToken = (id:string) : string =>{
     return jwt.sign({id} , process.env.JWT_SECRET  as string , {expiresIn : '7d'}) ; 
}

// Register a new user 
// POST /api/auth/register
export const register = async (req:Request , res:Response) : Promise<void> =>{
     try {
        const {name,email,password}  = req.body ; 

        const existing = await User.findOne({email}) ;
        if(existing){
            res.status(400).json({message : 'Email is already taken'}) ; 
            return  ;
        } 
   
        const user = await User.create({name,email,password}) ; 
        const token = generateToken(user._id.toString()) ;
   
   
        res.status(201).json({
           token , 
           user : {
              id : user._id , 
              name : user.name , 
              email  : user.email 
           }
        }) ;
     } catch (error) {
        res.status(500).json({message : 'Server Error'}) ; 
     }
} ; 

// Login user 
// POST /api/auth/login

export const login = async (req:Request, res:Response) : Promise<void> =>{
      try {
            const {email,password} = req.body ; 

            const user = await User.findOne(email) ;
            if(!email){
                res.status(400).json({message:'Invalid credentails'}) ; 
                return ; 
            } 
          
            const isMatch = await user?.comparepassword(password) ; 
            if(!isMatch){
               res.status(400).json({message : 'Invalid credential'}) ; 
               return ; 
            }
         const token = generateToken((user?._id as Types.ObjectId).toString()) ; 
         res.json({
            token , 
            user : {
               id : user?._id , 
               name : user?.name , 
               email : user?.email 
            }
         }) ; 
          return ; 
      } catch (error) {
           res.status(500).json({message : 'Server error'}) ; 
      }
}  ; 


