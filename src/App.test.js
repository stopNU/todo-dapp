import { render, screen } from "@testing-library/react";
import App from "./App";
import { TodoContextProvider } from "./store/todo-context";

test("renders something", () => {
  render(
    <TodoContextProvider
      value={{
        account: "000111xxx",
        getAllTasks: () => {},
        filterByDate: "12/12/1212",
        errorMessage: "",
        methods: {},
        tasks: [],
        updateFilterByDate: () => {},
      }}
    >
      <App />
    </TodoContextProvider>
  );
  const StartElement = screen.getByText(/Account:/i);
  expect(StartElement).toBeInTheDocument();
});
