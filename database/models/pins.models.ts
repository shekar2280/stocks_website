import mongoose from "mongoose";

const PinSchema = new mongoose.Schema({
  userEmail: String,
  symbol: String,
  side: String,
  hash: String,
  expiresAt: Date,
});

export default mongoose.models.Pins || mongoose.model("Pins", PinSchema);
