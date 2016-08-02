const express = require('express');

const router = new express.Router();

router.use('/open_fec', require('./open_fec'));

module.exports = router;
