const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minLength: 5,
    required: true,
    unique: true
  },
  author: {
    type: String,
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
  },
  user:
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

});
blogSchema.plugin(uniqueValidator, { message: 'A blog with the same title is already in the database' });

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);