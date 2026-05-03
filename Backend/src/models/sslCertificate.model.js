import mongoose from "mongoose";

const sslSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },

  domainName: {
    type: String,
    required: true,
    unique: true
  },

  expiryDate: {
    type: Date,
    required: true
  },

  toEmails: {
    type: [String],  
    required: true,
  },

  ccEmails: {
    type: [String], 
    required:true,
    default: []
  },

  replyToEmails: {
    type: [String],
    default: []
  }

}, { timestamps: true });

export default mongoose.model("SSLCertificate", sslSchema);