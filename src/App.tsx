import { Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useState } from "react";
import "react-virtualized/styles.css";
import "./App.css";
import AddTask from "./components/add-task/add-task.component";
import TaskList from "./components/task-list/task-list.component";
import { ITask } from "./types/common.interface";
import { appConstants } from "./constants/app.constant";

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const addTask = (taskTitle: string) => {
    const newTask: ITask = {
      id: `task-${tasks.length + 1}`,
      title: taskTitle,
      isCompleted: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (event: CheckboxChangeEvent, index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isCompleted: event?.target?.checked,
    };
    setTasks(updatedTasks);
  };

  return (
    <div className="main_app">
      <Typography.Title data-testid="app-title">{appConstants.label.title}</Typography.Title>
      <AddTask addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} />
    </div>
  );
}

export default App;
