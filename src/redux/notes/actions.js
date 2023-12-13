import { selectUserId } from "../user/selectors";
import axios from "axios";

export const getNotes = (dispatch, getState) => {

    const userId = selectUserId(getState());

    dispatch({ type: "NOTES/LOAD" });

    const params = new URLSearchParams({ userId }).toString();
    axios
      .get(`http://localhost:5147/notes?${params}`)
      .then((res) => res.data)
      .then((notes) => {
        dispatch({
          type: "NOTES/SET",
          payload: notes,
        });
      })
      .catch((err) => {
        dispatch({type: "NOTES/ERROR", payload: err.toString()});
      });
}

