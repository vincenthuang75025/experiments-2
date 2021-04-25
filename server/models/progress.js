const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  googleid: String,
  progress: {
      type: Map,
      of: String
  },
  comment: String,
}, {timestamps: true});

// compile model from schema
module.exports = mongoose.model("progress", ProgressSchema);
