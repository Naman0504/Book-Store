const express = require('express')
const {BOOKS} = require('../db/book.js')
const router = express.Router();

router.get('/',(req, res) => {
    res.status(200).json(BOOKS)
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) return res.status(400).json({ erro: `Id must be of number type` })

    const book = BOOKS.find((book) => book.id === id);

    if (!book) return res.status(404).json({ error: `Book with this ${id} is not exist` });

    return res.status(200).json(book)

})

router.post('/', (req, res) => {

    const { title, author } = req.body;
    console.log(req.body)

    if (!title || title === '') return res.status(400).json({ message: 'Title should not be empty' })
    if (!author || author === '') return res.status(400).json({ message: 'Author should not be empty' })

    const id = BOOKS.length + 1;
    const book = { id, title, author }
    BOOKS.push(book);

    return res.status(201).json({ message: 'Book is successfully added' })
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ erro: `Id must be of number type` })
    }

    const indexToDeleteBook = BOOKS.findIndex((book) => book.id === id);
    if (indexToDeleteBook < 0) return res.status(404).json({ messgae: `Book with this ${id} does not exist` });

    BOOKS.splice(indexToDeleteBook, 1)

    return res.status(200).json({ message: `Book with this id:${id} is deleted` })
})


module.exports = router;
