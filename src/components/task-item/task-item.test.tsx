import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import TaskItem from "./task-item.component";

describe("TaskItem Component", () => {
  const task = { id: "1", title: "Test Task", isCompleted: false };
  const toggleTaskMock = jest.fn();

  it("should render task title and checkbox", () => {
    render(<TaskItem task={task} index={0} toggleTask={toggleTaskMock} />);
    const checkbox = screen.getByTestId("checkbox");
    const todoContent = screen.getByTestId("todo-content");

    expect(checkbox).toBeInTheDocument();
    expect(todoContent).toBeInTheDocument();
    expect(todoContent).toHaveTextContent("Test Task");
  });

  it("should call toggleTask function with correct index when checkbox is clicked", () => {
    render(<TaskItem task={task} index={1} toggleTask={toggleTaskMock} />);
    const checkbox = screen.getByTestId("checkbox");

    fireEvent.click(checkbox);

    expect(toggleTaskMock).toHaveBeenCalledWith(expect.any(Object), 1);
  });
});
