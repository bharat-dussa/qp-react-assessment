import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddTask from "./add-task.component";

const addTaskMock = jest.fn();


describe("AddTask Component", () => {
  it("should render input field and button", () => {
    render(<AddTask addTask={() => {}} />);
    const input = screen.getByPlaceholderText("Enter task...");
    const button = screen.getByTestId("add-todos");

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should call addTask function with input value when button is clicked", () => {
    render(<AddTask addTask={addTaskMock} />);
    const input = screen.getByPlaceholderText("Enter task...");
    const button = screen.getByTestId("add-todos");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(button);

    expect(addTaskMock).toHaveBeenCalledWith("Test Task");
  });

  it("should not call addTask function if input value is empty", () => {
    render(<AddTask addTask={addTaskMock} />);
    const button = screen.getByTestId("add-todos");

    fireEvent.click(button);

    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
