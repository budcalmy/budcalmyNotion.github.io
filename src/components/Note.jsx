import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useCallback, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Note({ id, userID, name, body, time }) {

  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  const goTo = useCallback(
    () => {
      navigator(`/${userID}/notes/${id}`);
    },
    [navigator, userID, id]
  );


  const showModalQuestion = useCallback(
    () => {
      setMessage("Are you sure you want to delete note?");
      setShowModal(true);
    },
    []
  );

  const deleteNote = useCallback(() => {
    axios.delete(`http://localhost:5147/notes/${id}`).then((res) => {
      setMessage("Delete successfully!");
      setShowModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
  }, [id])

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", gap: "2vw", paddingLeft: 2 }}
    >
      <Paper
        id="paper"
        onClick={goTo}
        elevation={4}
        sx={{
          flex: "1 0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          transition: "transform 0.3s ease",
          ":hover": {
            transform: "scale(1.01)",
            transition: "transform 0.3s ease",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: 2,
            gap: "1vw",
            pointerEvents: "none",
          }}
        >
          <Typography sx={{ pointerEvents: "none" }}>{name}</Typography>
          <Typography sx={{ opacity: "0.7", pointerEvents: "none" }}>
            {new Date(time).toLocaleDateString()}
          </Typography>
        </Box>
      </Paper>
      <Box sx={{ display: "flex", gap: "1vw", paddingRight: 3 }}>
        <Box
          onClick={showModalQuestion}
          className="delete"
          sx={{
            transition: "transform 0.3s ease",
            zIndex: 5,
            ":hover": {
              transform: "scale(1.4)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            },
          }}
        >
          <DeleteIcon
            sx={{
              pointerEvents: "none",
            }}
          />
        </Box>
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
                {message}
              </Typography>

              <Button variant="contained" onClick={deleteNote}>Yes</Button>
              <Button variant="contained" onClick={() => setShowModal(false)}>No</Button>
            </Box>
          </Box>
        </Modal>
        <Box
          className="edit"
          sx={{
            transition: "transform 0.3s ease",
            ":hover": {
              transform: "scale(1.4)",
              transition: "transform 0.3s ease",
              cursor: "pointer",
            },
          }}
        >
          <NavLink
            to={`/${userID}/notes/edit/${id}?type=${'edit'}`}
            style={{ color: "black" }}
          >
            <EditIcon sx={{ pointerEvents: "none" }} />
          </NavLink>
        </Box>
      </Box>
    </Box>
  );
}
