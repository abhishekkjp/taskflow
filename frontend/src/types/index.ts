export interface IUser{
    id : string ; 
    email : string ; 
    name : string ; 
}
export interface ITask {
    _id : string ; 
    title : string ; 
    description : string ; 
    status : 'todo' | 'inprogress'  | 'done' ; 
    priority : 'low' | 'medium' | 'high' ; 
    tags : string[] ; 
    dueDate? : string ; 
    progress : number  ; 
    owner : string ; 
    createdAt : string  ; 
}
export interface AuthResponse {
    token : string ; 
    user : IUser ; 
}