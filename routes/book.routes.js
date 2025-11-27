const express = require('express')
const router = express.Router();
const controller = require("../controllers/book.controller.js")

router.get('/', controller.getAllBooks)

router.get('/:id',controller.getAllBooks)

router.post('/',controller.createBook )

router.delete('/:id',controller.deleteById )


module.exports = router;
