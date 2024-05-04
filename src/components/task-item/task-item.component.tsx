import { Checkbox, Flex, Popover, Typography } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";
import { ITask } from "../../types/common.interface";

const { Paragraph } = Typography;
interface TaskItemProps {
  task: ITask;
  index: number;
  toggleTask: (event: CheckboxChangeEvent, index: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, index, toggleTask }) => {
  return (
    <Flex gap="middle">
      <Checkbox
        data-testid="checkbox"
        checked={task?.isCompleted}
        onChange={(e) => toggleTask(e, index)}
      />

      <Popover placement="top" title={task?.title}>
        <Paragraph
          data-testid="todo-content"
          style={{
            marginBottom: 0,
            textDecoration: task?.isCompleted ? "line-through" : "none",
          }}
          ellipsis
        >
          {task?.title}
        </Paragraph>
      </Popover>
    </Flex>
  );
};

export default TaskItem;
