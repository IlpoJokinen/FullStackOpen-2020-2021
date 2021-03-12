/* eslint-disable quotes */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 40,
    required: true,
    unique: true
  },
  password: {
    type: String,
    minlength: 3,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  blogs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Blog" }]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);