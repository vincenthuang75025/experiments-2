const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  name: String,
  desc: String,
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("goal", GoalSchema);
