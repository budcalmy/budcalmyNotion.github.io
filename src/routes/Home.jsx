import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserEmail, selectUserId, selectUserSingUpDate } from "../redux/user/selectors";

export default function Home() {


  const id = useSelector(selectUserId);
  const email = useSelector(selectUserEmail);
  const date = useSelector(selectUserSingUpDate);

  const notesNavigator = useNavigate();

  const goToNotes = useCallback(
    () => {
      notesNavigator(`/${id}/notes`);
    },
    [notesNavigator, id]
  );

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 6,
          width: "80%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "7vw",
        }}
      >
        <Typography variant="h3" fontWeight={'bold'}>About me</Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6">
            Email:{" "}
            <Typography
              sx={{ display: "inline-block", fontWeight: "bold", fontSize: '2vw' }}
            >
              {email}
            </Typography>
          </Typography>
          <Typography variant="h6">
            Date sign up: {" "}
            <Typography
              sx={{ display: "inline-block", fontWeight: "bold", fontSize: '2vw'}}
            >
              {new Date(date).toLocaleString()}
            </Typography>
          </Typography>
        </Box>
        <Button
          fullWidth={true}
          variant="contained"
          onClick={goToNotes}
          sx={{
            backgroundColor: "tomato",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          <Typography variant="h6">Go to notes</Typography>
        </Button>
      </Paper>
    </Container>
  );
}
