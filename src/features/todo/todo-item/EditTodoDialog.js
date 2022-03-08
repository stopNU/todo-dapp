import { useState } from "react";
import DatePicker from "../../../components/DatePicker";
import { priorityOptions } from "../../../utils/types";
// mui
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const statusOptions = [
  {
    value: "todo",
    label: "To do",
  },
  {
    value: "progress",
    label: "In Progress",
  },
  {
    value: "done",
    label: "Done",
  },
];

const EditTodoDialog = ({
  onClose,
  open,
  data,
  onSubmit,
  onDelete,
  errorMessage,
}) => {
  const [status, setStatus] = useState(data.status);
  const [title, setTitle] = useState(data.title);
  const [desc, setDesc] = useState(data.description);
  const [date, setDate] = useState(data.date);
  const [priority, setPriority] = useState(data.priority);
  const [editMode, setEditMode] = useState(false);

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleEditModeToggle = () => {
    setEditMode(!editMode);
  };

  const handleTaskChange = (event) => {
    setStatus(event.target.value);
  };

  const handleTitleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescOnChange = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(title, desc, status, priority, date);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="md">
      <DialogTitle>
        {editMode ? (
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleTitleOnChange}
            value={title}
          />
        ) : (
          data.title
        )}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          {editMode ? (
            <TextField
              id="outlined-multiline-flexible"
              label="Description"
              multiline
              fullWidth
              maxRows={4}
              value={desc}
              onChange={handleDescOnChange}
            />
          ) : (
            <Typography variant="body1" gutterBottom>
              {data.description}
            </Typography>
          )}

          <TextField
            id="select-status"
            select
            label="Status"
            value={status}
            onChange={handleTaskChange}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="select-priority"
            select
            label="Priority"
            value={priority}
            onChange={handlePriorityChange}
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <DatePicker value={date} onChange={handleDateChange} />
          {errorMessage.length > 0 && (
            <Alert severity="error">
              <AlertTitle>{errorMessage}</AlertTitle>
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button onClick={onDelete} color="error">
            Delete
          </Button>
        </Box>
        <Box>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleEditModeToggle} color="warning">
            Edit
          </Button>
          <Button onClick={handleSubmit} color="success">
            Update
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default EditTodoDialog;
