import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    trait: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Character = mongoose.model('Character', characterSchema);
