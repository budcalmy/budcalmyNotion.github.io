import { Box, Button, Container, Input, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { z } from "zod";
import Chance from "chance";
import axios from "axios";


import bcrypt from 'bcryptjs';
import { useDispatch } from "react-redux";


const User = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Registration() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  const checkOutUser = useCallback(
    (username, email, password, repeatPassword) => {
      try {
        User.parse({
          username,
          email,
          password,
        });

        if (repeatPassword === password) {
          setErrors(null);
          return true;
        } else {
          setErrors({
            repeatProblem: "Passwords doesnt match",
          });
          return false;
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          setErrors(err.format());
        }
      }
    },
    []
  );

  const createUserContex = useCallback(
    (username, email, password) => {

      let chance = new Chance();
      const userID = chance.natural();

      const signUpDate = Date.now();

      bcrypt.hash(password, 10)
      .then((hashPassword) => {
        const user = {
            id: userID,
            username: username,
            email: email,
            password: hashPassword,
            signUpDate: signUpDate,
        }

        dispatch({
          action: "USER/SET",
          payload: user,
        })

        axios.post(`http://localhost:5147/users`, user)
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
      })
      
      return userID;
    },
    [dispatch]
  );

  const homeNavigator = useNavigate();

  const goHome = useCallback(
    (username, email, password, repeatPassword) => () => {

      if (checkOutUser(username, email, password, repeatPassword)) {
        const userID = createUserContex(username, email, password);
        homeNavigator(`/${userID}/home`);
      }
    },
    [homeNavigator, checkOutUser, createUserContex]
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
            placeholder="Username"
            fullWidth={true}
            required={true}
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          {errors?.username && (
            <Typography variant="subtitle2">
              {errors?.username?._errors}
            </Typography>
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
            placeholder="Email"
            fullWidth={true}
            required={true}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          {errors?.email && (
            <Typography variant="subtitle2">
              {errors?.email?._errors}
            </Typography>
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
          {errors?.password && (
            <Typography variant="subtitle2">
              {errors?.password?._errors}
            </Typography>
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
            placeholder="Repeat password"
            fullWidth={true}
            required={true}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
            }}
          ></Input>
          {errors?.repeatProblem && (
            <Typography variant="subtitle2">{errors?.repeatProblem}</Typography>
          )}
        </Box>

        <Button
          fullWidth={true}
          variant="contained"
          onClick={goHome(username, email, password, repeatPassword)}
          sx={{
            backgroundColor: "tomato",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          <Typography>Sign in</Typography>
        </Button>

        <Box textAlign={"center"}>
          <NavLink
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <Typography underline="hover" color={"black"} variant="subtitle1">
              Also have an account?
            </Typography>
          </NavLink>
        </Box>
      </Box>
    </Container>
  );
}
