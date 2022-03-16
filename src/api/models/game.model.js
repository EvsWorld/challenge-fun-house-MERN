import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    event_type: {
      type: String,
      default: "",
      required: true,
    },
    status: {
      type: String,
      default: "",
      required: true,
    },
    home_away: {
      type: String,
      default: "",
      required: true,
    },
    opponent_id: {
      type: String,
      default: "",
      required: true,
    },
    opponent_name: {
      type: String,
      default: "",
      required: true,
    },
    start: {
      type: Object,
      default: { datetime: { type: Date, required: true } },
      required: true,
    },
    end: {
      type: Object,
      default: { datetime: { type: Date, required: true } },
      required: true,
    },
    timezone: {
      type: String,
      default: "",
      required: true,
    },
    notes: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
  },
  { timestamps: true }
);

export const Game = mongoose.model("Game", gameSchema);
