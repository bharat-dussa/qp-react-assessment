import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "./task-list.component";

describe("TodoList Component", () => {
  const tasks = [
    { id: "1", title: "Task 1", isCompleted: false },
    { id: "2", title: "Task 2", isCompleted: true },
    { id: "3", title: "Task 3", isCompleted: false },
  ];

//   const mockTasks = Array.from({ length: 10000 }, (_, index) => ({
//     id: `task-${index + 1}`,
//     title: `Task ${index + 1}`,
//     isCompleted: false,
//   }));

  it("should render tasks when tasks are present", () => {
    render(<TodoList tasks={tasks} toggleTask={() => {}} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
    expect(screen.getByText("Task 3")).toBeInTheDocument();
  });

  it("should render Empty component when no tasks are present", () => {
    render(<TodoList tasks={[]} toggleTask={() => {}} />);
    expect(screen.getByTestId("no-todos")).toBeInTheDocument();
  });
});
