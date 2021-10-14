const express = require('express');
const id = require('./param/ToDoID');
const router = express.Router();

router.param('id', id);

module.exports = router;