import { useState, useContext } from "react";
import TodoContext from "../../store/todo-context";
// components
import CreateTodo from "./create-todo/CreateTodo";
// mui
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import SyncIcon from "@mui/icons-material/Sync";
import DateRangeIcon from "@mui/icons-material/DateRange";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DatePicker from "../../components/DatePicker";

const Toolbar = () => {
  const { getAllTasks, filterByDate, updateFilterByDate } =
    useContext(TodoContext);
  const [open, setOpen] = useState(false);

  const getTasks = async () => {
    try {
      await getAllTasks();
    } catch (e) {
      console.error("error", e);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = async () => {
    await updateFilterByDate(null);
    handleClose();
  }

  const handleChangeDate = async (value) => {
    await updateFilterByDate(value);
  };

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <IconButton
        color="primary"
        aria-label="refresh"
        component="span"
        onClick={handleOpen}
      >
        <DateRangeIcon color={filterByDate ? "success" : "primary"} />
      </IconButton>

      <IconButton
        color="primary"
        aria-label="refresh"
        component="span"
        onClick={getTasks}
      >
        <SyncIcon />
      </IconButton>

      <CreateTodo />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Filter on date</DialogTitle>
        <DialogContent>
          <DatePicker value={filterByDate} onChange={handleChangeDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset}>Remove</Button>
          <Button onClick={handleClose}>Set</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Toolbar;
