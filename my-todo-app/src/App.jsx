import './index.css'
import { useState, useEffect } from "react"
import { useRef } from 'react'


const TaskManager=()=>{
const [tasks, addTask] = useState(JSON.parse(localStorage.getItem("data")) || [])
const [inputTask, addInputTask] = useState("")
const [editingTask, setEditingTask] = useState(null)
const[completed, setCompleted] = useState(JSON.parse(localStorage.getItem("completedData")) || [])
const [filter, setFilter] = useState('all')

const dialogRef = useRef(null);

useEffect(()=>
localStorage.setItem("data",JSON.stringify(tasks))
,[tasks])

useEffect(()=> 
localStorage.setItem("completedData",JSON.stringify(completed))
,[completed])


const deleteTask=(userTask)=>{
  if(tasks.length !==0){
   const updatedTasks = tasks.filter(task=>task !== userTask)
  addTask(updatedTasks)

  }
}

const editTask=(userTask, NewTask)=>{
  if(tasks.length !==0){
    dialogRef.current.showModal()
    addInputTask(userTask)
    setEditingTask(userTask)
    
  }
}

const filteredTasks = filter === 'active' ? tasks.filter(task=> !completed.includes(task)) : filter === 'completed'? tasks.filter(task=> completed.includes(task)) : tasks
 


return(
  <>
  <h1 className='header'>To Do List</h1>
  <div className='all-process'>
    <div>
      <div className='add-task-div'>
        <p >What needs to be done?</p>
        <button type='button' onClick={()=>dialogRef.current.showModal()}>Add</button>
      </div>
       <div className='task-progress'><button onClick={()=> setFilter('all')}>All</button><button onClick={()=> setFilter('active')}>Active</button><button onClick={()=> setFilter('completed')}>completed</button></div>
      <dialog ref={dialogRef} className='user-task-dialog'>
        <input type="text" value={inputTask} placeholder='Enter Task' onChange={(e)=> addInputTask(e.target.value)} />
        <button type='button' onClick={()=> {if(inputTask.trim() === ""){alert("Input field is empty add a task")}
         else if(tasks.includes(inputTask) && editingTask !==inputTask) {
          alert("Task already existed")
        }
        else if(editingTask === null){
          addTask([...tasks, inputTask])
           addInputTask("")
           dialogRef.current.close()
           console.log(tasks);
        
        }
        else{
         const update = ( tasks.map(task=>editingTask === task? inputTask : task));
         addTask([...update])
         console.log(tasks);
     
         
         
          setEditingTask(null)
           addInputTask("")
           dialogRef.current.close()
        }
        }}>{editingTask === null ? "Add Task" : "Edit Task"}</button>
      </dialog>
      {filteredTasks.map(task=> <div className='each-task' key={task}> <div className='complete-checkbox'> <input type="checkbox" checked={completed.includes(task)}  name="" id="" onChange={(e)=>e.target.checked? setCompleted([...completed, task]): setCompleted( completed.filter(romevetask=> romevetask !== task))} />{task}</div> <div> <button onClick={()=>deleteTask(task)}>Del</button> <button  onClick={()=>editTask(task,inputTask)} disabled ={completed.includes(task)}>Edit</button></div></div>)}
    </div>
  </div>
  </>
)





}



export default TaskManager