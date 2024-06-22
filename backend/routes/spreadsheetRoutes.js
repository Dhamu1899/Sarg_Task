const express = require('express');
const router = express.Router();
const spreadsheetController = require('../controllers/spreadsheetController');

router.post('/create', spreadsheetController.create);
router.get('/read', spreadsheetController.read);
router.put('/update/:id', spreadsheetController.update);
router.delete('/delete/:id', spreadsheetController.delete);

module.exports = router;
