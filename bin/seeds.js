// bin/seeds.js

const mongoose = require('mongoose');

const Author = require('../models/Author.model');
const Book = require('../models/Book.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/library-v2';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const authors = [
  {
    name: "Suzanne",
    surname: "Collins",
    country: "Portugal",
  },
  {
    name: "J.K. ",
    surname: "Rowling",
    country: "U.K."
  },
  {
    name: "Harper",
    surname: "Lee",
    country: "Portugal"
  }
];



const books = [
    {
      title: "The Hunger Games",
      description:
        "The Hunger Games is a 2008 dystopian novel by the American writer Suzanne Collins",
      rating: 10
    },
    {
      title: "Harry Potter: Philosopher's Stone",
      description:
        "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling.",
      rating: 9
    },
    {
      title: "Harry Potter: Chamber of Secrets",
      description:
        "Description for Chamber of Secrets...",
      rating: 10
    },
    {
      title: "To Kill a Mockingbird",
      description:
        "To Kill a Mockingbird takes place in the fictional town of Maycomb, Alabama, during the Great Depression.",
      rating: 8
    },
  ];


const relationships = [
  {
    author: authors[0],
    books: [books[0]]
  },
  {
    author: authors[1],
    books: [books[1], books[2]]
  },
  {
    author: authors[2],
    books: [books[3]]
  }
];


relationships.forEach( relationship => {
  Author.create(relationship.author)
    .then(authorFromDB => {
      console.log(`Created author: ${authorFromDB.name} ${authorFromDB.surname}`);

      //add author id to each book
      const booksWithAuthorId = relationship.books.map( book => {
        book.author = authorFromDB._id;
        return book;
      });

      return Book.create(booksWithAuthorId);
    })
    .then(booksFromDB => {
      console.log(`Created ${booksFromDB.length} books`);
    })
    .catch(err => console.log(`An error occurred saving data on DB: ${err}`));
});