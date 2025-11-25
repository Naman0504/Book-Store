const express = require('express');
const app = express();
const {loggerMiddleware} = require('./middleware/logger')
const bookRouter = require('./routes/book.routes')

let PORT = 8000;


//middleware 
app.use(express.json());

app.use(loggerMiddleware)

//Routes
app.use('/books',bookRouter)


app.listen(PORT, () => {
    console.log(`Server is running in PORT ${PORT}`)
})