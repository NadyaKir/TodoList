import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}

type PropsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) =>void
  filter: FilterValuesType
}

export function TodoList(props: PropsType){

  const [title, setTitle] = useState("")
  const [error, setError] = useState<string | null>(null)
  
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
     if (e.key === 'Enter'){
                props.addTask(title); setTitle("");
  }}

  const addTask = () => {
    if (title.trim() !== ""){
      props.addTask(title.trim()); 
      setTitle("");
    } else{
      setError("Title is required!")
    }
  }
      
  const onAllClickHandler = () => props.changeFilter("all") 
  const onActiveClickHandler = () =>  props.changeFilter("active") 
  const onCompletedClickHandler = () =>  props.changeFilter("completed") 
  
  
  return (
  <div>
    <h3>{ props.title }</h3>
    <div>
      <input className={error ? "error" : "" }
             value={ title } 
             onChange={ onChangeHandler } 
             onKeyUp={ onKeyHandler }
      />
      <button onClick={ addTask }>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map( t => {

          const onRemoveHandler = () => {
            props.removeTask(t.id )
          }
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {props.changeTaskStatus(t.id, e.currentTarget.checked)}

          return <li key={t.id} className={t.isDone ? "is-done" : ""}>
          <input type="checkbox" 
                onChange={onChangeStatusHandler}
                 checked={t.isDone} />
          <span>{t.title}</span>
          <button onClick={ onRemoveHandler }>x</button>
        </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""} onClick={ onAllClickHandler }>All</button>
      <button className={props.filter === 'active' ? "active-filter" : ""} onClick={ onActiveClickHandler }>Active</button>
      <button className={props.filter === 'completed' ? "active-filter" : ""} onClick={ onCompletedClickHandler }>Completed</button>
    </div>
  </div>
  )
}

export default TodoList;