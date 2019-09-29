// es/searchIndex.js

"use strict";

import * as constants from '../constants/';

const ELASTIC_SEARCH_HOST = constants.ELASTIC_SEARCH_HOST;
const ELASTIC_SEARCH_PORT = constants.ELASTIC_SEARCH_PORT;

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

const searchIndex = (query) => {
    let body = {
        size: 200,
        from: 0,
        query: {
            match: {
                name: query['q'],
            },
        },
    };
    
    return new Promise( (resolve, reject) => {
        esClient.search({
            index: 'tutorial',
            body: body,
            type: 'cities',
        })
        .then( results => {
            resolve(results.hits.hits);
        })
        .catch( error => {
            reject(error);
        });
    });
};

module.exports = {searchIndex};
