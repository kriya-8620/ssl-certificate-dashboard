import { Box, Typography } from "@mui/material";


const Topbar = () => {
  return (
    <Box
      sx={{
        height: 60,
        background: "#f1f5f9",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3
      }}
    >
      <Typography variant="h6">
        Admin
      </Typography>

      
    </Box>
  );
};

export default Topbar;