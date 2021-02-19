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
    usersWhoFavorited: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Character = mongoose.model('Character', characterSchema);
