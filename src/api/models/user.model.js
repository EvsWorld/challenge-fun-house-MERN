import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favoriteCharacters: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
