import { Link } from "react-router-dom";
import { Box, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 220,
        height: "100vh",
        background: "#1e293b",
        color: "white",
        p: 2
      }}
    >
      <h2>SSL Portal</h2>

      <List>

       
        <ListItem button component={Link} to="/ssl-upload">
          <ListItemText primary="SSL Upload" />
        </ListItem>
       
        <ListItem button component={Link} to="/ssl-dashboard">
          <ListItemText primary="SSL Dashboard" />
        </ListItem>

      </List>
    </Box>
  );
};

export default Sidebar;