import mongoose from "mongoose";

const orgPersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    path: {
      type: String,
      required: true,
      default: ",",
    },
  },
  { collection: "orgPersons", timestamps: true }
);

export const OrgPerson = mongoose.model("OrgPersons", orgPersonSchema);
