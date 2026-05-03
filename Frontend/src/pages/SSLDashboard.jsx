import {
  Box,
  Typography,
  Paper,
  Chip,
  TextField,
  Grid
} from "@mui/material";

import {
  DataGrid
} from "@mui/x-data-grid";

import {
  useEffect,
  useState
} from "react";

import axios
from "../api/axiosInstance";

/* ================= DASHBOARD ================= */

const SSLDashboard = () => {

  const [sslData,
    setSslData] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  /* ================= FETCH DATA ================= */

  const fetchSSL =
    async () => {

      try {

        const res =
          await axios.get(
            "/ssl/getAll"
          );

        setSslData(
          res.data.data
        );

      }

      catch (error) {

        console.error(error);

      }

    };

  useEffect(() => {

    fetchSSL();

    /* Auto Refresh */

    const interval =
      setInterval(
        fetchSSL,
        60000
      );

    return () =>
      clearInterval(interval);

  }, []);

  /* ================= FORMAT DATE ================= */

  const formatDate =
    (date) => {

      const d =
        new Date(date);

      if (
        isNaN(d.getTime())
      )
        return "Invalid Date";

      return d.toLocaleDateString(
        "en-IN"
      );

    };

  /* ================= STATUS CHIP ================= */

  const getStatusChip =
    (status) => {

      if (status === "Valid")
        return (
          <Chip
            label="Valid"
            color="success"
          />
        );

      if (
        status ===
        "Expiring Soon"
      )
        return (
          <Chip
            label="Expiring Soon"
            color="warning"
          />
        );

      if (
        status === "Expired"
      )
        return (
          <Chip
            label="Expired"
            color="error"
          />
        );

    };

  /* ================= SUMMARY COUNTS ================= */

  const totalCertificates =
    sslData.length;

  const validCount =
    sslData.filter(
      item =>
        item.status === "Valid"
    ).length;

  const expiringSoonCount =
    sslData.filter(
      item =>
        item.status ===
        "Expiring Soon"
    ).length;

  const expiredCount =
    sslData.filter(
      item =>
        item.status === "Expired"
    ).length;

  /* ================= FILTER ================= */

  const filteredData =
    sslData.filter(
      (item) =>

        item.domainName
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  /* ================= TABLE ================= */

  const columns = [

    {
      field: "bankName",
      headerName: "Bank",
      flex: 1
    },

    {
      field: "domainName",
      headerName: "Domain",
      flex: 1.5
    },

    {
      field: "expiryDate",
      headerName: "Expiry Date",
      flex: 1,

      renderCell:
        (params) =>
          formatDate(
            params.value
          )

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

      renderCell:
        (params) =>
          getStatusChip(
            params.value
          )

    }

  ];

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        mb={3}
      >

        SSL Certificate Dashboard

      </Typography>

      {/* ================= SUMMARY CARDS ================= */}

      <Grid container spacing={2} mb={3}>

        {/* Total */}

        <Grid item xs={12} md={3}>

          <Paper
            sx={{
              p: 2,
              textAlign: "center"
            }}
          >

            <Typography
              variant="h6"
            >
              Total Certificates
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
            >
              {totalCertificates}
            </Typography>

          </Paper>

        </Grid>

        {/* Valid */}

        <Grid item xs={12} md={3}>

          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor:
                "#e8f5e9"
            }}
          >

            <Typography
              variant="h6"
            >
              Valid
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              color="green"
            >
              {validCount}
            </Typography>

          </Paper>

        </Grid>

        {/* Expiring Soon */}

        <Grid item xs={12} md={3}>

          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor:
                "#fff8e1"
            }}
          >

            <Typography
              variant="h6"
            >
              Expiring Soon
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              color="orange"
            >
              {expiringSoonCount}
            </Typography>

          </Paper>

        </Grid>

        {/* Expired */}

        <Grid item xs={12} md={3}>

          <Paper
            sx={{
              p: 2,
              textAlign: "center",
              backgroundColor:
                "#ffebee"
            }}
          >

            <Typography
              variant="h6"
            >
              Expired
            </Typography>

            <Typography
              variant="h4"
              fontWeight="bold"
              color="red"
            >
              {expiredCount}
            </Typography>

          </Paper>

        </Grid>

      </Grid>

      {/* ================= SEARCH + TABLE ================= */}

      <Paper sx={{ p: 2 }}>

        <TextField
          label="Search Domain"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          sx={{ mb: 2 }}
        />

        <DataGrid
          rows={filteredData}
          columns={columns}
          autoHeight
          getRowId={(row) =>
            row._id
          }
          pageSize={10}
        />

      </Paper>

    </Box>

  );

};

export default SSLDashboard;