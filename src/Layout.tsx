import { Link, Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Layout = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Link to="/">
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Box
            component="img"
            sx={{ width: "60px", height: "60px", borderRadius: "50px" }}
            alt="hacker"
            src="/hackerLogo.jpg"
          />
          <Typography variant="h4">Hacker News</Typography>
        </Box>
      </Link>
      <Outlet />
    </Box>
  );
};

export default Layout;
