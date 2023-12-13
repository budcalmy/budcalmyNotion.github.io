import {
  Box,
  Button,
  Container,
  Input,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export default function NoteCreator() {

  const user = useSelector((store) => store.user);

  const navigator = useNavigate();

  const goToNotes = useCallback(() => {
    navigator(`/${user.id}/notes`);
  }, [navigator, user.id]);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const createNote = useCallback(
    (name, body) => () => {
      if (!name) {
        setErrors({
          nameFail: "Enter note name",
        });
      } else {
        setErrors(null);

        const note = {
          userId: user.id,
          name: name,
          body: body,
          time: Date.now(),
        };

        axios
          .post(`http://localhost:5147/notes`, { ...note })
          .then((res) => {
            setSuccessMessage("Created successfully!");
            setShowModal(true);

            setTimeout(() => {
              setShowModal(false);
            }, 700);
          })
          .then(() => {
            setTimeout(goToNotes, 900);
          })
          .catch((err) => {
            setSuccessMessage("Create error!");
            setShowModal(true);

            setTimeout(() => {
              setShowModal(false);
            }, 700);
          });
      }
    },
    [user.id, goToNotes]
  );

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "55vh",
        gap: "3vw",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "",
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
          Create note
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "3vw",
          width: "80%",
          justifyContent: "center",
          margin: "0 auto",
          bgcolor: "tomato",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Paper elevation={3} sx={{ padding: 1 }}>
          <Input
            required
            type="text"
            placeholder="Name"
            sx={{ width: "100%" }}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></Input>
          {errors?.nameFail && (
            <Typography variant="subtitle2" sx={{ color: "red" }}>
              {errors?.nameFail}
            </Typography>
          )}
        </Paper>
        <Paper elevation={3} sx={{ padding: 1 }}>
          <TextField
            multiline
            placeholder="Note text..."
            minRows={3}
            sx={{ width: "100%", overflow: "auto", maxHeight: "20vh" }}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Paper>
        <Button
          variant="text"
          onClick={createNote(name, body)}
          sx={{
            backgroundColor: "white",
            ":hover": { bgcolor: "whitesmoke" },
          }}
        >
          <Typography sx={{ justifySelf: "center", color: "black" }}>
            Create
          </Typography>
        </Button>
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          closeAfterTransition={true}
        >
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                bgcolor: "white",
                padding: 3,
                borderRadius: 3,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: "1vw",
              }}
            >
              <Typography variant="h4" sx={{ opacity: 1, color: "black" }}>
                {successMessage}
              </Typography>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
