// es/index.js

"use strict";

import { bulkIndex } from './bulkIndex';
import { searchIndex } from './searchIndex';

module.exports = {
    bulkIndex: (res, index, type, data) => {
        return bulkIndex(res, index, type, data);
    },
    searchIndex: (req, res) => {
        searchIndex(req.query)
        .then( results => {
            res.json(results);
        })
        .catch( error => {
            res.json(error);
        });
    },
};
