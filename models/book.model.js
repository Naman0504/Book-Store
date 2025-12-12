
const { text } = require("drizzle-orm/pg-core")
const { pgTable, varchar, uuid } = require("drizzle-orm/pg-core")
const authorsTable = require("./author.model")
const { sql } = require("drizzle-orm")
const { index } = require("drizzle-orm/pg-core")

const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 255 }).notNull(),
    description: text(),
    authorId: uuid().references(() => authorsTable.id)
}, (table) => ({
    searchIndexOnTitle: index("title_index").using('gin', sql`to_tsvector('english', ${table.title})`),
    searchIndexOnDescription: index("description_index").using('gin', sql`to_tsvector('english', ${table.description})`)

}))


module.exports = booksTable