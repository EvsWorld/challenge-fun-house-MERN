module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  const Character = mongoose.model('character', schema);
  return Character;
};
