import { useEffect, useContext, useCallback } from "react";
import TodoContext from "../../store/todo-context";
import dayjs from "dayjs";
// components
import Grid from "./Grid";
import Toolbar from "./Toolbar";
// mui
import Container from "@mui/material/Container";

const filterTasksByDate = (array, filterDate) => {
  return array.filter((task) => {
    const dayjsDate = dayjs(task.date);
    if (
      dayjsDate.$y === filterDate.$y &&
      dayjsDate.$M === filterDate.$M &&
      dayjsDate.$D === filterDate.$D
    ) {
      return task;
    } else {
      return false;
    }
  });
};

const ToDo = () => {
  const { getAllTasks, tasks, account, filterByDate, errorMessage } =
    useContext(TodoContext);

  const getTasks = useCallback(async () => {
    try {
      await getAllTasks();
    } catch (e) {
      console.error("error", e);
    }
  }, [getAllTasks]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  // Filter tasks by date if filterByDate exists
  const filteredTasks = filterByDate
    ? filterTasksByDate(tasks, filterByDate)
    : tasks;

  if (errorMessage) {
    return (
      <p style={{ textAlign: "center", marginTop: "30px" }}>{errorMessage}</p>
    );
  }

  return (
    <Container>
      {account?.length !== 0 && (
        <div>
          <Toolbar />
          <Grid items={filteredTasks} />
        </div>
      )}
    </Container>
  );
};

export default ToDo;
