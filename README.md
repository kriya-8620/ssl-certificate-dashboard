# 🔐 SSL Certificate Monitoring Dashboard

An enterprise-grade SSL Certificate Monitoring Dashboard built using **Node.js, Express, MongoDB, React, and Material UI**.  
This system automatically extracts domain details from SSL certificates, tracks expiry dates, detects duplicates, and sends automated email alerts before certificate expiration.

---

# 🚀 Features

## 🔐 SSL Certificate Management
- Upload SSL Certificates (`.crt`, `.pem`, `.cer`)
- Automatically extract:
  - Domain Name (CN / SAN)
  - Expiry Date
- Duplicate certificate detection
- Update existing records automatically

---

## 📅 Expiry Monitoring
- Automatically calculate:
  - Days Remaining
  - Certificate Status
- Status Types:
  - 🟢 Valid
  - 🟡 Expiring Soon (≤ 30 days)
  - 🔴 Expired

---

## 📧 Email Alerts
Automated email notifications triggered when certificates are:

- 30 Days Remaining
- 15 Days Remaining
- 7 Days Remaining
- 1 Day Remaining
- Expired

Supports:
- To Email List
- CC Email List

---

## 📊 Dashboard Features

### Summary Cards
- Total Certificates
- Valid Certificates
- Expiring Soon
- Expired Certificates

### SSL Table Dashboard
Displays:

- Bank Name
- Domain Name
- Expiry Date
- Days Remaining
- Status Indicator

Includes:

- 🔍 Search by domain
- 🔄 Auto-refresh data
- 🎯 Color-coded status indicators

---

ssl-certificate-dashboard/

Backend/
├── controllers/
├── models/
├── routes/
├── services/
├── utils/
├── jobs/
├── middleware/
├── app.js
├── server.js
├── package.json

Frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── api/
│ └── App.jsx
├── package.json

.gitignore
README.md
.env.example


---

# 🛠️ Tech Stack

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Node-Cron
- Nodemailer
- Multer
- Node-Forge

## Frontend
- React.js
- Material UI
- Axios
- DataGrid

---

# ⚙️ Installation Guide

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/ssl-certificate-dashboard.git
cd ssl-certificate-dashboard

# 🏗️ Project Structure
🔧 Backend Setup

Navigate to Backend:

cd Backend

Install dependencies:

npm install

Create .env file:

PORT=6869

MONGODB_URI=your_mongodb_connection_string

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

ALERT_EMAIL=admin_email@gmail.com

CORS_ORIGIN=http://localhost:5173

Run backend:

npm run dev

Backend runs on:

http://localhost:6869
💻 Frontend Setup

Navigate to Frontend:

cd Frontend

Install dependencies:

npm install

Run frontend:

npm run dev

Frontend runs on:

http://localhost:5173
🔄 Automated Cron Jobs

The system includes scheduled background jobs:

Job	Description
SSL Expiry Check	Runs daily
Email Notifications	Sends expiry alerts
Duplicate Detection	Updates existing records
📥 Supported Certificate Formats

The system supports:

.crt
.pem
.cer

Automatically extracts:

Domain Name
Expiry Date
Certificate Details
📊 Example Workflow
Upload SSL Certificate
System extracts domain & expiry
Data stored in MongoDB
Dashboard updates automatically
Email alerts sent before expiry
🔐 Security Features
Environment variable protection
Email authentication
Duplicate domain prevention
Certificate validation checks
📌 Future Enhancements

Planned features:

📥 Bulk SSL Upload
📊 Graph Analytics Dashboard
📄 Export SSL Report to Excel
🌐 Fetch SSL from Domain URL
🔁 Auto Domain SSL Monitoring
🔔 Slack / Teams Alerts
🧪 Testing

Upload test certificates:

.crt
.pem
.cer

Verify:

Domain extraction
Expiry calculation
Email alert triggering
🚀 Deployment Ready

This project supports deployment on:

VPS (Hostinger / AWS / DigitalOcean)
Docker (future support)
Nginx reverse proxy
👨‍💻 Author

Krishna Koley

Full Stack Developer
Backend-Focused Engineer

Tech Stack Expertise:

Node.js
MongoDB
React
Express
DevOps Basics
