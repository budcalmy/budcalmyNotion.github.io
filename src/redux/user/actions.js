import axios from "axios";
import bcrypt from "bcryptjs";

export const getUser = (email, password) => async (dispatch, getState) => {
  const query = new URLSearchParams({
    email,
  }).toString();

  const users = await axios
    .get(`http://localhost:5147/users?${query}`)
    .then((res) => res.data);
  const user = users[0];
  if (user) {
    if (!bcrypt.compareSync(password, user.password)) {
      dispatch({
        type: "USER/ERROR",
        payload: "Invalid password! Try again.",
      });
    } else {
      dispatch({
        type: "USER/SET",
        payload: user,
      });

      return user.id;
    }
  } else {
    dispatch({
      type: "USER/ERROR",
      payload: "No such email user. Create an account!",
    });
  }

  return false;
};
