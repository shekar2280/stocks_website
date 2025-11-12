import { Schema, model, models, type Document, type Model } from "mongoose";

export interface Alert extends Document {
  userId: string;
  symbol: string;
  upperTarget?: number;
  lowerTarget?: number;
  active: boolean;
  lastTriggered?: Date | null;
  notified?: boolean;
  createdAt: Date;
}

const AlertSchema = new Schema<Alert>(
  {
    userId: { type: String, required: true, index: true },
    symbol: { type: String, required: true, uppercase: true, trim: true },
    upperTarget: { type: Number },
    lowerTarget: { type: Number },
    active: { type: Boolean, default: true },
    lastTriggered: { type: Date, default: null },
    notified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

AlertSchema.index({ userId: 1, symbol: 1 });

export const Alert: Model<Alert> =
  (models?.Alert as Model<Alert>) || model<Alert>("Alert", AlertSchema);
