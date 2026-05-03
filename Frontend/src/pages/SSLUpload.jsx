import React,
{ useState }
from "react";

import axios
from "../api/axiosInstance";

import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Stack
}
from "@mui/material";

const SSLUpload = () => {

  const [bankName,
    setBankName] =
    useState("");

  const [sslCert,
    setSslCert] =
    useState(null);

  const [loading,
    setLoading] =
    useState(false);
  
const [toEmails, setToEmails] = useState("");
const [ccEmails, setCcEmails] = useState("");


  /* ================= FILE CHANGE ================= */

  const handleFileChange =
    (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      /* 🔥 FILE VALIDATION */

      const allowedExtensions =
        [".crt", ".pem", ".cer"];

      const fileName =
        file.name.toLowerCase();

      const isValid =
        allowedExtensions.some(
          ext =>
            fileName.endsWith(ext)
        );

      if (!isValid) {

        alert(
          "Only .crt, .pem, .cer files are allowed"
        );

        e.target.value = null;

        return;

      }

      /* If valid → store file */

      setSslCert(file);

    };

  /* ================= HANDLE UPLOAD ================= */

  const handleUpload =
    async () => {

      if (!bankName)
        return alert(
          "Bank Name required"
        );

      if (!sslCert)
        return alert(
          "SSL Certificate required"
        );

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "bankName",
          bankName
        );

        formData.append(
          "sslCert",
          sslCert
        );
      formData.append("toEmails", toEmails);
      formData.append("ccEmails", ccEmails);
        const res =
          await axios.post(
            "/ssl/upload",
            formData
          );

        alert(
          res.data.message
        );

        /* Reset */

        setBankName("");
        setSslCert(null);

      }

      catch (error) {

        console.error(error);

        alert(
          "Upload Failed"
        );

      }

      setLoading(false);

    };

  return (

    <Box sx={{ p: 3 }}>

      <Typography
        variant="h4"
        mb={3}
        fontWeight="bold"
      >

        Upload SSL Certificate

      </Typography>

      <Paper sx={{ p: 3, maxWidth: 500 }}>

        <Stack spacing={2}>

          {/* Bank Name */}

          <TextField
            label="Bank Name"
            value={bankName}
            onChange={(e) =>
              setBankName(
                e.target.value
              )
            }
            fullWidth
          />
          <TextField
  label="To Emails (comma separated)"
  value={toEmails}
  onChange={(e) => setToEmails(e.target.value)}
  fullWidth
/>

<TextField
  label="CC Emails (comma separated)"
  value={ccEmails}
  onChange={(e) => setCcEmails(e.target.value)}
  fullWidth
/>

          {/* Upload Button */}

          <Button
            variant="outlined"
            component="label"
          >

            UPLOAD SSL (.CRT,.PEM,.CER)

            <input
              hidden
              type="file"
              accept=".crt,.pem,.cer"
              onChange={
                handleFileChange
              }
            />

          </Button>

          {/* 🔥 Show Selected File Name */}

          {sslCert && (

            <Typography
              variant="body2"
              sx={{
                color: "green",
                fontWeight: 500
              }}
            >

              Selected File:
              {" "}
              {sslCert.name}

            </Typography>

          )}

          {/* Upload Button */}

          <Button
            variant="contained"
            onClick={
              handleUpload
            }
            disabled={loading}
          >

            {loading
              ? "Uploading..."
              : "UPLOAD"}

          </Button>

        </Stack>

      </Paper>

    </Box>

  );

};

export default SSLUpload;