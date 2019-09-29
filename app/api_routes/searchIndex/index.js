// api_routes/searchIndex/index.js

"use strict";

import { searchIndex } from '../../es';

const router = require('express').Router();

//full path: http://localhost:5000/search
router.get('', (req, res) => {
    return searchIndex(req, res);
});

module.exports = router;
