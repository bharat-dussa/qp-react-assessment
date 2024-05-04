// AddTask.tsx
import { Button, Flex, Input } from "antd";
import React, { MouseEventHandler, useState } from "react";
import { appConstants } from "../../constants/app.constant";

interface AddTaskProps {
  addTask: (name: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value);
  };

  const handleSubmit: MouseEventHandler<HTMLElement> | undefined = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle("");
    }
  };

  return (
    <Flex gap="middle">
      <Input
        type="text"
        value={taskTitle}
        onChange={handleChange}
        placeholder="Enter task..."
        data-testid="add-todo-input"
      />
      <Button data-testid="add-todos" onClick={handleSubmit} type="primary">
        {appConstants.label["add-task"]}
      </Button>
    </Flex>
  );
};

export default AddTask;
