require("dotenv/config")
const express = require('express');
const app = express();
const {loggerMiddleware} = require('./middleware/logger')
const bookRouter = require('./routes/book.routes')
const authorRouter = require('./routes/author.routes')

let PORT = 8000;


//middleware 
app.use(express.json());

app.use(loggerMiddleware)

//Routes
app.use('/books',bookRouter)
app.use('/authors',authorRouter)


app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`)
})