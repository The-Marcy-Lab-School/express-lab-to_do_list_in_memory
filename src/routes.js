const express = require('express');
const toDoController = require('./controllers/to-do');
const addModels = require('./middleware/add-models');

const router = express.Router();

router.use(addModels);

// CREATE
// READ
// UPDATE
// DELETE
router.delete('/api/to-dos', toDoController.destroyAll); // DELETE ALL

module.exports = router;
