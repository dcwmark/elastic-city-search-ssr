// elastic-city-search-ssr/app/fileParsers/index.js

"use strict";

import "core-js/stable";
import { parseToJSON } from './parseToJSON';

const fs = require('fs');

module.exports = {
    fileToJSON: async (fileName) => {
        const fileRaw = await fs.readFileSync(fileName);
        return parseToJSON(fileRaw);
    },
};
