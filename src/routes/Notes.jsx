import {
  Box,
  Button,
  Container,
  Pagination,
  Paper,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Note from "../components/Note";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../redux/user/selectors";
import { selectNotesError, selectNotesLoading, selectPagNotes } from "../redux/notes/selectors";
import { selectCount } from "../redux/notes/selectors";
import { getNotes } from "../redux/notes/actions";

export default function Notes() {
  const [page, setPage] = useState(1);

  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const paginatonNotes = useSelector(selectPagNotes);
  const count = useSelector(selectCount);

  useEffect(() => {

    dispatch(getNotes)

  }, [dispatch]);

  const handlePage = useCallback(
    (event, value) => {
      setPage(value);
      axios
        .get(
          `http://localhost:5147/notes?userId=${userId}&_page=${value}&_limit=3`
        )
        .then((res) => res.data)
        .then((data) => {
          dispatch({type: "NOTES/PAGINATION", payload: data});
        });
    },
    [userId, dispatch]
  );

  const notesNavigator = useNavigate();

  const goToNoteCreator = useCallback(() => {
    notesNavigator(`/${userId}/notes/create`);
  }, [notesNavigator, userId]);

  const loading = useSelector(selectNotesLoading);
  const errors = useSelector(selectNotesError);

  if (loading) {
    return (
      <Container sx={{width: '100%', margin: "0 auto"}}>
        <Paper elevation={3} sx={{padding: 3}}>
          <Typography>Loading notes...</Typography>
        </Paper>
      </Container>
    );
  }


  if (errors) {
    return (
      <Container sx={{width: '100%', margin: "0 auto"}}>
        <Paper elevation={3} sx={{padding: 3}}>
          <Typography>{errors}</Typography>
        </Paper>
      </Container>
    );
  }

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
          gap: "2vw",
        }}
      >
        <Typography variant="h4" fontWeight={"bold"}>
          Notes
        </Typography>
        <Button
          variant="contained"
          onClick={goToNoteCreator}
          sx={{
            backgroundColor: "tomato",
            ":hover": { backgroundColor: "tomato" },
          }}
        >
          <Typography variant="h6">Add new note</Typography>
        </Button>

        {count > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: "1vw",
              alignItems: "center",
            }}
          >
            <Box
              component={"div"}
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "1vw",
                maxHeight: "17vw",
                padding: "1vw",
                border: "0.2vw solid tomato",
                borderRadius: 2,
              }}
            >
              {Array.from(paginatonNotes).map((note) => {
                return (
                  <Note
                    key={note.id}
                    userID={userId}
                    id={note.id}
                    name={note.name}
                    body={note.body}
                    time={note.time}
                  ></Note>
                );
              })}
            </Box>
            <Pagination
              count={Math.ceil(count / 3)}
              page={page}
              onChange={handlePage}
            ></Pagination>
          </Box>
        ) : (
          <Typography>Havent got any notes..</Typography>
        )}
      </Paper>
    </Container>
  );
}
