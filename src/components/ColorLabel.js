// mui
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Wrapper = styled("div")`
  display: flex;
  gap: 5px;
`;

const ColorCircle = styled("div")(({ theme, color }) => ({
  height: "20px",
  width: "20px",
  background: color,
  borderRadius: "100%",
  boxShadow: theme.shadows[1]
}));

const ColorLabel = ({ children, color }) => {
  return (
    <Wrapper>
      <ColorCircle color={color} />
      <Typography paragraph>{children}</Typography>
    </Wrapper>
  );
};

export default ColorLabel;
