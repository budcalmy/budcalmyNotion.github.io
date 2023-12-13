import { Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>404 ERROR PAGE</Typography>
      <NavLink to={"/"}>
        <Typography>Go home</Typography>
      </NavLink>
    </Container>
  );
}
