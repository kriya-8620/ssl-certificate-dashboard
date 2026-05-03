import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>

      <Sidebar />

      <Box sx={{ flex: 1 }}>

        <Topbar />

        <Box sx={{ p: 3 }}>
          <Outlet />
        </Box>

      </Box>

    </Box>
  );
};

export default MainLayout;