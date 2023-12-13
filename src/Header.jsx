import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import "./styles/Header.css";

import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from "react-redux";
import { selectUserEmail, selectUserId } from "./redux/user/selectors";

export default function Header() {


  const id = useSelector(selectUserId);
  const email = useSelector(selectUserEmail);
  


  return (
    <Container>
      <AppBar>
        <Toolbar
          sx={{
            backgroundColor: "tomato",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography variant="h5">Hello, {email}</Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "1vw" }}>
            <NavLink
              to={`/${id}/home`}
              end={true}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography>About</Typography>
            </NavLink>
            <NavLink
              to={`/${id}/notes`}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Typography>Notes</Typography>
            </NavLink>
            <NavLink
              to={`/`}
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <LogoutIcon sx={{paddingLeft: 5}}></LogoutIcon>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ py: "10vw" }}>
        <main>
          <Outlet></Outlet>
        </main>
      </Box>
    </Container>
  );
}
