import { Box, Button, Container, Input, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { selectUserErrors } from "../redux/user/selectors";
import { getUser } from "../redux/user/actions";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const errors = useSelector(selectUserErrors);

  const dispatch = useDispatch();

  const homeNavigator = useNavigate();

  const checkOutUserLogin = useCallback(
    (email, password) => {
      dispatch(getUser(email, password)).then((res) => {
        if (res) {
          homeNavigator(`/${res}/home`);
        }
      });
    },
    [dispatch, homeNavigator]
  );

  const goHome = useCallback(
    (email, password) => () => {
      checkOutUserLogin(email, password);
    },
    [checkOutUserLogin]
  );
  return (
    <Container
      sx={{
        width: "100%",
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
        <Typography textAlign={"center"} variant="h4" fontWeight={"bold"}>
          Hello, User!
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: "0.5vw",
            flexDirection: "column",
            color: "tomato",
          }}
        >
          <Input
            placeholder="Email"
            fullWidth={true}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {errors?.noUserInDB && (
            <Typography variant="subtitle2">{errors?.noUserInDB}</Typography>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "0.5vw",
            flexDirection: "column",
            color: "tomato",
          }}
        >
          <Input
            type="password"
            placeholder="Password"
            fullWidth={true}
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          {errors?.invalidPassword && (
            <Typography variant="subtitle2">
              {errors?.invalidPassword}
            </Typography>
          )}
        </Box>

        <Button
          fullWidth={true}
          variant="contained"
          onClick={goHome(email, password)}
          sx={{
            backgroundColor: "tomato",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          <Typography>Log in</Typography>
        </Button>

        <Box textAlign={"center"}>
          <NavLink
            to="/reg"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography underline="hover" color={"black"} variant="subtitle1">
              Register now!
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}
