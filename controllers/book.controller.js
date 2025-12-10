const booksTable = require("../models/book.model")
const db = require("../db/index")
const { eq } = require("drizzle-orm")

exports.getAllBooks = async function (Req, res) {

    const books = await db.select().from(booksTable)
    res.status(200).json(books)

}

exports.getBookById = async function (req, res) {

    const id = req.params.id;


    const [book] = await db.select().from(booksTable).where(table => eq(table.id, id)).limit(1);

    if (!book) return res.status(404).json({ error: `Book with this ${id} is not exist` });

    return res.status(200).json(book)


}


exports.createBook = async function (req, res) {

    const { title, description, authorId } = req.body;
    // console.log(req.body)

    if (!title || title === '') return res.status(400).json({ message: 'Title should not be empty' })

    const result = await db.insert(booksTable).values({ title, authorId, description }).returning({ id: booksTable.id })


    return res.status(201).json({ message: 'Book is successfully created', id: result.id })
}

exports.deleteById = async function (req, res) {
    const id = req.params.id;
    await db.delete(booksTable).where(eq(booksTable.id, id));


    return res.status(200).json({ message: `Book with this id:${id} is deleted` })
}