// api_routes/bulkIndex/index.js

"use strict";

import { fileToJSON } from '../../fileParsers/';
import { bulkIndex } from '../../es/';

const router = require('express').Router();

// full path: http://localhost:5000/api/es/bulkindex/cities/tutorial/cities
router.get('/es/bulkindex/:file/:index/:type', (req, res, next) => {
    const { file, index, type } = req.params;
    console.log(JSON.stringify(req.params));
    console.log(`file:: ${file}`);
    console.log(`index:: ${index}`);
    console.log(`type:: ${type}`);
    
    const fileName = `${file}.json`;
    
    fileToJSON(fileName)
    .then( result => {
        console.log('fileToJSON result:: ' + JSON.stringify(result));
        return bulkIndex(res, index, type, result);
    })
    .catch( reject => {
        res.json(reject);
    });
});

module.exports = router;
