const express = require('express');
const db = require('../db');
const authorsTable = require('../models/author.model');
const { eq } = require('drizzle-orm');
const booksTable = require('../models/book.model');
const router = express.Router();

router.get('/', async (req, res) => {
    const authors = await db.select().from(authorsTable)
    return res.status(200).json(authors)
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const [author] = await db.select().from(authorsTable).where(eq(authorsTable.id, id))
    if (!author) {
        return res.status(404).json({ error: `Author with ${id} does not exist` })
    }

    return res.status(200).json(author)
})

router.post('/', async (req, res) => {
    const { firstname, lastname, email } = req.body;
    const [author] = await db.insert(authorsTable).values({ firstname, lastname, email }).returning({ id: authorsTable.id })
    return res.status(201).json({ message: "Author has been created successfully", id: author.id })
})

router.get('/:id/books', async (req, res) => {

    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id))
    return res.status(200).json(books);

})




module.exports = router;
