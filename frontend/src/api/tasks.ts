import api from './axios'
import type { ITask } from '../types'


export const getTasks = async () : Promise<ITask[]> =>{
     const res = await api.get('/tasks') ; 
    return res.data ; 
}

export const createTask = async (data:Partial<ITask>) : Promise<ITask> =>{
   const res = await api.post('/tasks' , data) ; 
    return res.data ; 
}

export const updateTask = async (id:string , data : Partial<ITask>) : Promise<ITask> =>{
     console.log('update',id) ; 
     const res = await api.put(`/tasks/${id}` , data) ; 
     return res.data ; 
}

export const deleteTask = async(id :string) : Promise<void> =>{
       await api.delete(`/tasks/${id}`) ; 
}
