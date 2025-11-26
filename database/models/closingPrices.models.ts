import mongoose from "mongoose";

const ClosingPriceSchema = new mongoose.Schema({
  symbol: { type: String, required: true, index: true },
  closePrice: { type: Number, required: true },
  date: { type: Date, required: true, index: true }
});

export const ClosingPrice =
  mongoose.models.ClosingPrice ||
  mongoose.model("ClosingPrice", ClosingPriceSchema);
