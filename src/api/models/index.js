import mongoose from 'mongoose';

import { User } from './user.model';
import { Character } from './character.model';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const models = { User, Character };

export { connectDb };

export default models;
