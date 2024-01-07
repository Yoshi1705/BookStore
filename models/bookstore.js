const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
        title : {
           type : String,
           required : true,
        },
        author : {
           type : String,
           required : true
        },
        publishedyear : {
           type : Number,
           required : true,
        }
},{
        timestamps : true
})

const Book = mongoose.model('books-collection',bookSchema);
module.exports = Book;