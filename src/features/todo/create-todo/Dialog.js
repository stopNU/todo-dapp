import { useState } from "react";
import { priorityOptions } from "../../../utils/types";
// mui
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MUIDialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import DatePicker from "../../../components/DatePicker";
import MenuItem from "@mui/material/MenuItem";

const Dialog = ({ onClose, open, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState(dayjs());
  const [priority, setPriority] = useState(0);

  const handleTitleOnChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescOnChange = (e) => {
    setDesc(e.target.value);
  };

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const handleClickOnAdd = () => {
    onSubmit(title, desc, date, priority);
  };

  const handlePriorityChange = (event) => {
    setPriority(event.target.value);
  };

  return (
    <MUIDialog open={open} onClose={onClose}>
      <DialogTitle>Add task</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the information.</DialogContentText>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            "& .MuiTextField-root": { m: 1 },
          }}
        >
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            required
            variant="standard"
            onChange={handleTitleOnChange}
            value={title}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            fullWidth
            maxRows={4}
            value={desc}
            onChange={handleDescOnChange}
          />
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleClickOnAdd}>Add</Button>
      </DialogActions>
    </MUIDialog>
  );
};

export default Dialog;
