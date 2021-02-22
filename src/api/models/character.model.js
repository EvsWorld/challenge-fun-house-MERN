import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
      required: true,
    },
    trait: {
      type: String,
      default: '',
      required: true,
    },
    name: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      default: '',
    },
    species: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    gender: {
      type: String,
      default: '',
    },
    origin: {
      type: Object,
      default: {},
    },
    location: { type: Object, default: {} },
    image: {
      type: String,
      default: '',
    },
    episode: { type: Array, default: [] },
    url: {
      type: String,
      default: '',
    },
    created: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export const Character = mongoose.model('Character', characterSchema);
