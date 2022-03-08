import { styled, useTheme } from "@mui/material/styles";
import CreateTodo from "./create-todo/CreateTodo";
import TodoItem from "./todo-item/TodoItem";
import ColorLabel from "../../components/ColorLabel";
//MUI
import MUIGrid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const HeadlineItem = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  boxShadow: "none",
  padding: theme.spacing(1),
  textAlign: "center",
  color: "#FFF",
  borderRadius: "0",
}));

const filterOnStatus = (items, status) => {
  return items
    .filter((item) => item.status === status)
    .map((filteredItems) => (
      <TodoItem key={filteredItems.id} data={filteredItems} />
    ));
};

const Grid = ({ items }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: "#EEE",
        borderRadius: "8px",
      }}
    >
      {/* Header grid */}
      <MUIGrid
        container
        spacing={0}
        sx={(theme) => ({
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: "8px", // use theme later
          borderTopRightRadius: "8px",
        })}
      >
        <MUIGrid item xs={4}>
          <HeadlineItem>To do</HeadlineItem>
        </MUIGrid>
        <MUIGrid item xs={4}>
          <HeadlineItem>In progress</HeadlineItem>
        </MUIGrid>
        <MUIGrid item xs={4}>
          <HeadlineItem>Done</HeadlineItem>
        </MUIGrid>
      </MUIGrid>

      {/* Items grid */}
      {items.length > 0 && (
        <div>
          <MUIGrid
            container
            spacing={2}
            sx={{
              padding: "10px",
            }}
          >
            <MUIGrid item xs={4}>
              {filterOnStatus(items, "todo")}
            </MUIGrid>
            <MUIGrid item xs={4}>
              {filterOnStatus(items, "progress")}
            </MUIGrid>
            <MUIGrid item xs={4}>
              {filterOnStatus(items, "done")}
            </MUIGrid>
          </MUIGrid>
          <Box
            sx={{
              display: "flex",
              marginTop: "40px",
              justifyContent: "center",
              gap: "30px"
            }}
          >
            <ColorLabel color="#FFF">Low</ColorLabel>
            <ColorLabel color={theme.palette.warning.main}>Medium</ColorLabel>
            <ColorLabel color={theme.palette.error.main}>High</ColorLabel>
          </Box>
        </div>
      )}

      {/* No items: add task */}
      {items.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            padding: "60px 0",
          }}
        >
          <CreateTodo />
          <Typography variant="h6">Create a task</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Grid;
