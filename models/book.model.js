
const { text } = require("drizzle-orm/pg-core")
const { pgTable, varchar, uuid } = require("drizzle-orm/pg-core")
const authorsTable = require("./author.model")

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id)
})


module.exports = booksTable