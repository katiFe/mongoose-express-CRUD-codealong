// models/Book.model.js

const { Schema, model } = require('mongoose');

const bookSchema = new Schema(                      //Schema: the template we want every book to have
  {
    title: String,
    description: String,
    author: String,
    rating: Number
  },
  {
    timestamps: true                        
  }
);

module.exports = model('Book', bookSchema);       //exporting model and creating new model 'book'
