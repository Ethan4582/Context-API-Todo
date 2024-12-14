import { createContext, useContext } from "react";

// context for  todo this i an object 
export const TodoContext= createContext({
   todos:[
      // array of todo
      {
         id:1,
         todo:"Todo message",
         check:false,
      }
   ],
   // we also have funxtion that havr funconality of todos 
   addTodo:(todo)=>{},
   // we need id and the todo itself so pass it in function to update 
   updateTodo:(id,todo)=>{},
   deleteTodo:(id )=>{},
   togleComplete:(id)=>{}
})


// instead of return in the main file i return here itself 
export const UseTodoContext=()=>{
   return useContext(TodoContext)
}

// instead of wrapping todo context provider in the main file i used the vraible the export it 

export const TodoProvider =TodoContext.Provider 