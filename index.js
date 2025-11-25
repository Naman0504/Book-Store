const express = require('express');
const app = express();
const fs = require("node:fs")

let PORT = 8000;

//In Memory DB
const books = [
    { id: 1, title: 'Book One', author: 'author 1' },
    { id: 2, title: 'Book Two', author: 'author 2' }
]

//middleware 
app.use(express.json());

function logger(req, res, next) {
    const log = `[${Date.now()}] - ${req.method} : ${req.path}\n`
    fs.appendFileSync('log.txt', log, 'utf-8')
    next();
}

function customMiddleware(req, res, next) {
    console.log("I m custom Middleware")
    next();
}

app.use(logger)

//Routes
app.get('/', customMiddleware,logger,(req, res) => {
    res.status(200).json(books)
})
app.get('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.status(400).json({ erro: `Id must be of number type` })

    const book = books.find((book) => book.id === id);

    if (!book) return res.status(404).json({ error: `Book with this ${id} is not exist` });

    return res.status(200).json(book)

})

app.post('/books', (req, res) => {

    const { title, author } = req.body;
    console.log(req.body)

    if (!title || title === '') return res.status(400).json({ message: 'Title should not be empty' })
    if (!author || author === '') return res.status(400).json({ message: 'Author should not be empty' })

    const id = books.length + 1;
    const book = { id, title, author }
    books.push(book);

    return res.status(201).json({ message: 'Book is successfully added' })
})

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: `Id must be of number type` })
    }

    const indexToDeleteBook = books.findIndex((book) => book.id === id);
    if (indexToDeleteBook < 0) return res.status(404).json({ messgae: `Book with this ${id} does not exist` });

    books.splice(indexToDeleteBook, 1)

    return res.status(200).json({ message: `Book with this id:${id} is deleted` })
})

app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`)
})