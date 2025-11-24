import mongoose from "mongoose";

const PositionsSchema = new mongoose.Schema({
    userId: String,
    symbol: String,
    qty: Number,
    averagePrice: Number,
    lastUpdated: Date,
});

export default mongoose.models.Positions || mongoose.model("Positions", PositionsSchema);