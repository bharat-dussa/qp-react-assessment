import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { appConstants } from "./constants/app.constant";

describe("Todo Component", () => {
  test("renders todo App title", () => {
    render(<App />);
    const linkElement = screen.getByText(appConstants.label.title);
    expect(linkElement).toBeInTheDocument();

    const noTodos = screen.getByTestId("no-todos");

    expect(noTodos).toBeInTheDocument();
  });

  it("should add a new task", () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Enter task...");
    const addButton = screen.getByTestId("add-todos");

    fireEvent.change(input, { target: { value: "Test Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("should toggle task completion", () => {
    const taskName = "Test Task";

    render(<App />);
    const input = screen.getByPlaceholderText("Enter task...");
    const addButton = screen.getByTestId("add-todos");

    fireEvent.change(input, { target: { value: taskName } });
    fireEvent.click(addButton);

    const checkbox = screen.getByTestId("checkbox") as any;
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
