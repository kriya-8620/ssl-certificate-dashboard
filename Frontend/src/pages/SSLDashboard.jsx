import {
 Typography,  Box,
  Paper,
  Chip,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

/* ================= DASHBOARD ================= */

const SSLDashboard = () => {

  const [sslData, setSslData] = useState([]);
  const [search, setSearch] = useState("");

  // ✅ Status filter state
  const [statusFilter, setStatusFilter] = useState("All");

  // ✅ Pagination state
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 2
  });

  /* ================= FETCH DATA ================= */

  const fetchSSL = async () => {
    try {
      const res = await axios.get("/ssl/getAll");
      setSslData(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSSL();

    const interval = setInterval(fetchSSL, 60000);
    return () => clearInterval(interval);

  }, []);

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "Invalid Date";
    return d.toLocaleDateString("en-IN");
  };

  /* ================= STATUS CHIP ================= */

  const getStatusChip = (status) => {
    if (status === "Valid")
      return <Chip label="Valid" color="success" />;

    if (status === "Expiring Soon")
      return <Chip label="Expiring Soon" color="warning" />;

    if (status === "Expired")
      return <Chip label="Expired" color="error" />;

    return null;
  };

  /* ================= SUMMARY COUNTS ================= */

  const totalCertificates = sslData.length;

  const validCount = sslData.filter(
    item => item.status === "Valid"
  ).length;

  const expiringSoonCount = sslData.filter(
    item => item.status === "Expiring Soon"
  ).length;

  const expiredCount = sslData.filter(
    item => item.status === "Expired"
  ).length;

  /* ================= FILTER ================= */

  const filteredData = sslData.filter((item) => {

    const matchesSearch = item.domainName
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  /* ================= TABLE ================= */

  const columns = [
    { field: "bankName", headerName: "Bank", flex: 1 },

    { field: "domainName", headerName: "Domain", flex: 1.5 },

    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value)
    },

    {
      field: "daysRemaining",
      headerName: "Days Left",
      flex: 1
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => getStatusChip(params.value)
    }
  ];

  return (
    <Box sx={{ p: 3 }}>

      <Typography variant="h4" mb={3}>
        SSL Certificate Dashboard
      </Typography>

      {/* ================= SUMMARY CARDS ================= */}

      <Grid container spacing={2} mb={3}>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6">Total Certificates</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalCertificates}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#e8f5e9" }}>
            <Typography variant="h6">Valid</Typography>
            <Typography variant="h4" fontWeight="bold" color="green">
              {validCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#fff8e1" }}>
            <Typography variant="h6">Expiring Soon</Typography>
            <Typography variant="h4" fontWeight="bold" color="orange">
              {expiringSoonCount}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: "center", backgroundColor: "#ffebee" }}>
            <Typography variant="h6">Expired</Typography>
            <Typography variant="h4" fontWeight="bold" color="red">
              {expiredCount}
            </Typography>
          </Paper>
        </Grid>

      </Grid>

      {/* ================= SEARCH + FILTER ================= */}

      <Paper sx={{ p: 2 }}>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>

          {/* Search */}
          <TextField
            label="Search Domain"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          {/* Status Dropdown */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Valid">Valid</MenuItem>
              <MenuItem value="Expiring Soon">Expiring Soon</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </Select>
          </FormControl>

        </Box>

        {/* ================= DATA GRID ================= */}

        <DataGrid
          rows={filteredData}
          columns={columns}
          autoHeight
          getRowId={(row) => row._id}

          pagination
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}

          pageSizeOptions={[2, 5, 10, 25]}
        />

      </Paper>

    </Box>
  );
};

export default SSLDashboard;
``

  