import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import  TodoList  from './TodoList';
import { TaskType } from './TodoList';


export type FilterValuesType = "all" | "completed" | "active";

function App() {

   let [tasks, setTasks] = useState<Array<TaskType>>([
     { id: 1, title: "CSS", isDone: true, },
     { id: 2, title: "JS", isDone: true, },
     { id: 3, title: "React", isDone: false, },
     { id: 4, title: "Redux", isDone: false, },
]);

    let [filter, setFilter] = useState<FilterValuesType>("all");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter( t => t.id !== id )
    setTasks(filteredTasks);
  }

  function changeFilter(value: FilterValuesType){
    setFilter(value)
  }

  let tasksForTodolist = tasks;

  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone === true);
  }

  if (filter === "active") {
    tasksForTodolist = tasks.filter(t => t.isDone === false);
  }

  return (
    <div className="App">
      <TodoList title='What to learn1' 
                tasks={tasksForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
      />
    </div>
  );
}


export default App;
