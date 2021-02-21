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
    },
  },
  { timestamps: true }
);

userSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    username: login,
  });

  if (!user) {
    user = await this.findOne({ email: login });
  }

  return user;
};

export const User = mongoose.model('User', userSchema);
