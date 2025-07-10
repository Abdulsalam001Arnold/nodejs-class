
const express = require('express');
const router = express.Router();
const {getHome, newContact, getContacts, getSingle, deleteSingle} = require("../controllers/contactController");

router.get('/', getHome)
router.get('/all-contact', getContacts)
router.get('/contact/:id', getSingle)
router.delete('/delete-contact/:id', deleteSingle);
router.post('/create-contact', newContact);

module.exports = router;




