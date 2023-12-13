import { Navigate } from "react-router-dom";

import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { selectLoading, selectUserId } from "../redux/user/selectors";

export default function RequireAuth({ children }) {
  const id = useSelector(selectUserId);
  const loading = useSelector(selectLoading);

  if (loading) {
    return (
        <Container>
        <Box
          sx={{
            height: '100vh',
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </Container>
    )
  }

  if (!id) {
    return <Navigate to="/" replace></Navigate>
  }


  return children;
}
