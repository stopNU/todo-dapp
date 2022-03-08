import { useState, useContext } from "react";
import TodoContext from "../../../store/todo-context";
import Dialog from "./Dialog";
// mui
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CreateTodo = () => {
  const { getAllTasks, methods, account } = useContext(TodoContext);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTask = async (title, desc, date, priority) => {
    try {
      await methods
        .addTask(title, desc, priority, date.toString())
        .send({ from: account });
      getAllTasks();
      handleClose();
    } catch (e) {
      console.error("Error adding:", e);
    }
  };

  return (
    <div>
      <IconButton
        color="primary"
        aria-label="add todo task"
        component="span"
        onClick={handleClickOpen}
      >
        <AddCircleIcon />
      </IconButton>
      <Dialog onClose={handleClose} open={open} onSubmit={handleAddTask} />
    </div>
  );
};

export default CreateTodo;
