import { useLoaderData, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const loader = async ({ ...params }) => {

  const note = await axios
    .get(`http://localhost:5147/notes?id=${params.params.noteID}`)
    .then((res) => res.data)
  return note;
};

export default function NoteInfo() {
  
  const note = useLoaderData()[0];

  const id = useSelector((store) => store.user).id;

  const navigator = useNavigate();

  const goToNotes = useCallback(() => {
    navigator(`/${id}/notes`);
  }, [navigator, id]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "55vh",
        gap: "3vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={goToNotes}
          sx={{
            backgroundColor: "tomato",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          <Typography sx={{ justifySelf: "center" }}>Back</Typography>
        </Button>
        <Typography
          variant="h4"
          fontWeight={"bold"}
          textAlign={"center"}
          width={"90%"}
        >
          {note.name}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          justifyContent: "center",
          margin: "0 auto",
          bgcolor: "tomato",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <TextField
            disabled
            sx={{ width: "100%", overflow: "auto", maxHeight: "40vh" }}
            defaultValue={note.body ? note.body : "Empty note"}
            multiline
            placeholder="Note text..."
            minRows={3}
          ></TextField>
        </Paper>
      </Box>
    </Container>
  );
}
