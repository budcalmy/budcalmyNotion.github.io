import { Box, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function Footer() {
  return (
    <Box> 
      <Box>
        <main>
          <Outlet />
        </main>
      </Box>
      <Box sx={{ position: "absolute" }}>
        <Box
          sx={{
            display: "flex",
            gap: "66vw",
            position: "relative",
            paddingLeft: 3,
            paddingBottom: 3,
          }}
        >
          <Typography sx={{ color: "gray" }}>
            Created by student: Nikolay Suhockiy
          </Typography>
          <Typography sx={{ color: "gray" }}>BSU 2023</Typography>
        </Box>
      </Box>
    </Box>
  );
}
