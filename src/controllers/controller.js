const BookModel = require('../models/bookModel')
const AuthorModel = require('../models/authorModel')


//Problem 1: Create author with different id

const createAuthor = async function(req, res){
    let authorData = req.body
    
    let author = await AuthorModel.create(authorData)
    res.send({msg: author})
    
}

//Problem 2: Create a book schema of those author

const createBook = async function(req, res){
let bookData = req.body

let book = await BookModel.create(bookData)
res.send({msg: book})

}

//Problem 3: Collect all books by Chetan Bhagat

const bookByChetan = async function (req, res){

    let authorDetails = await AuthorModel.findOne({author_name : "Chetan Bhagat"})
    let authorId = authorDetails.author_id
    let chetanBook = await BookModel.find({author_id : authorId}).select({name : 1, _id : 0})
    
    res.send({bookByChetan: chetanBook })

} 

//Problem 4: Update Price of the book "two states"

const priceUpdate = async function (req, res){
    let update = req.body
    let bookData = await BookModel.findOneAndUpdate(
        { name : "Two states"}, {$set : update}, {new : true}
    )
    let authorId = bookData.author_id
    
    let author = await AuthorModel.findOne({author_id : authorId}).select({author_name : 1, _id :0})
    console.log(author)

    res.send({author_name : author.author_name, price : bookData.price}) //{ reset } = require('nodemon') })

    
}

// Problem 5: find all author name by books price

 
const booksInPrice = async function(req,res){

    let books =  await (await BookModel.find({price: {$gte : 50, $lte : 100}}).select({author_id :1, _id:0})).map(x => x.author_id)
    console.log(books)

    let arr = []
    for(let i=0; i< books.length ; i++){
        let arr1 = await (await AuthorModel.find({author_id : books[i]}).select({author_name : 1, _id : 0 })).map(x => x.author_name)
        arr.push(arr1 )
    }

    const arrayOfAuthors = arr.flat()
    res.send({author_name : arrayOfAuthors})
    
    
}



module.exports.createBook = createBook
module.exports.createAuthor = createAuthor
module.exports.bookByChetan = bookByChetan
module.exports.priceUpdate = priceUpdate
module.exports.booksInPrice = booksInPrice