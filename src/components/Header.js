import { useContext } from "react";
import TodoContext from "../store/todo-context";
import { styled } from "@mui/material/styles";

import Container from "@mui/material/Container";

const Nav = styled("nav")`
  display: flex;
  align-items: center;
  min-height: 64px;
  background-color: #ccc;
`;

const Header = () => {
  const { account } = useContext(TodoContext);

  return (
    <Nav>
      <Container>Account: {account}</Container>
    </Nav>
  );
};

export default Header;
