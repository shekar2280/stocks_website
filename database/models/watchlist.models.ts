import { Schema, model, models, type Document, type Model } from "mongoose";

export interface WatchlistItem extends Document {
  userId: string;
  stockId: Schema.Types.ObjectId;
  addedAt: Date;
}

const WatchlistSchema = new Schema<WatchlistItem>(
  {
    userId: { type: String, required: true, index: true },

    stockId: {
      type: Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    addedAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

WatchlistSchema.index({ userId: 1, stockId: 1 }, { unique: true });

export const Watchlist: Model<WatchlistItem> =
  models.Watchlist || model("Watchlist", WatchlistSchema);
