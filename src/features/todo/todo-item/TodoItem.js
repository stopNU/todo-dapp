import { useState, useContext } from "react";
import TodoContext from "../../../store/todo-context";
import EditTodoDialog from "./EditTodoDialog";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
// mui
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme, priority }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  borderLeft:
    priority === "1"
      ? `10px solid ${theme.palette.warning.main}`
      : priority === "2"
      ? `10px solid ${theme.palette.error.main}`
      : "10px solid transparent",
  marginBottom: "10px",
}));

const TodoItem = ({ data }) => {
  const { getAllTasks, methods, account } = useContext(TodoContext);
  const { id, title, description, date, priority } = data;
  const [open, setOpen] = useState(false);
  const [errorMessage, setShowErrorMessage] = useState("");
  const parsedDate = dayjs(date).format("DD/MM/YYYY");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdateTask = async (title, desc, status, priority, date) => {
    try {
      await methods
        .updateTask(id, title, desc, status, priority, date.toString())
        .send({ from: account });
      getAllTasks();
      handleClose();
    } catch (e) {
      console.error("error", e);
      setShowErrorMessage("Error updating task.");
    }
  };

  const handleDelete = async () => {
    try {
      await methods.deleteTask(id).send({ from: account });
      getAllTasks();
      handleClose();
    } catch (e) {
      console.error(e);
      setShowErrorMessage(e.message || "Error deleting.");
    }
  };

  return (
    <Item priority={priority}>
      <div onClick={handleClickOpen}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {description.length > 90
            ? `${description.substring(0, 90)}...`
            : description}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Deadline: {parsedDate}
        </Typography>
      </div>
      <EditTodoDialog
        onClose={handleClose}
        onDelete={handleDelete}
        onSubmit={handleUpdateTask}
        open={open}
        data={data}
        errorMessage={errorMessage}
      />
    </Item>
  );
};

export default TodoItem;
