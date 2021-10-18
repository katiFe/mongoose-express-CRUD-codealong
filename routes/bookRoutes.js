const router = require("express").Router();
const Book = require("../models/Book.model");      //

router.get('/books', (req, res, next) => {
    //  res.send("aweeeesome")                    //testing if this step works
    Book.find()                                   //make a query to the database with .find({}) to get the list of books --> if empty, we receive all docs
        .then((booksFromDB) => {
            console.log("...........")
            console.log(booksFromDB)             //consol logging list of boks/ how can i get that? //choose a name you put in the func and console.log it
            const data = {
                booksArr: booksFromDB
            }
            res.render("books/books-list", data);     //rendering the book list and pass info booksFromDB which is set in the variable bookList
            //  res.send("cool, I already have the list of books")    
        })
        .catch((error) => {
            console.log("Error getting list of books from DB", error);
            next(error);                        //allows us to handle the error in a better way
        });


});


module.exports = router;           //exporting that file to other files