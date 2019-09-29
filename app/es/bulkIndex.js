// es/bulkIndex.js

"use strict";

import * as constants from '../constants/';

const ELASTIC_SEARCH_HOST = constants.ELASTIC_SEARCH_HOST;
const ELASTIC_SEARCH_PORT = constants.ELASTIC_SEARCH_PORT;

const elasticsearch = require('elasticsearch');

const esClient = new elasticsearch.Client({
    host: `${ELASTIC_SEARCH_HOST}${ELASTIC_SEARCH_PORT}`,
    log: 'error'
});

const bulkIndex = async (res, index, type, data) => {
    await ( async () => {
        await cleanUp(res, index)
        .then( resolve => {
            console.log(`cleanUp resolve::${JSON.stringify(resolve)}`);
        })
        .catch( reject => {
            console.log(`cleanUp reject::${JSON.stringify(reject)}`);
            return res.json(reject);
        });
    })();
    
    console.log(`Setup insert index::${index} type::${type}`);
    let bulkBody = [];
    
    data.map( item => {
        bulkBody.push({
          index: {
            _index: index,
            _type: type,
            _id: item.id
          }
        });
    
        bulkBody.push(item);
    });
    
    console.log(`About to bulk insert index::${index} type::${type}`);
    var start = Date.now();
    esClient.bulk({ body: bulkBody })
    .then( response => {
        let errorCount = 0;
        response.items.map( item => {
            if (item.index && item.index.error) {
                console.log(++errorCount, item.index.error);
            }
        });
        var done = Date.now();
        console.log(`Completed in ${done - start} ms`);
        res.json(`Successfully indexed ${data.length - errorCount} `
               + `out of ${data.length} items`);
    })
    .catch( reject => {
        res.json(reject);
    });
};

const cleanUp = (res, index) => {
    console.log(`About to delete index::${index}`);
    return new Promise( (resolve, reject) => {
        esClient.indices.delete({
            index: index
        })
        .then( response => {
            resolve(`
                elasticsearch ${index} deleted: ${JSON.stringify(response)}
            `);
        })
        .catch( error => {
            if (error.status === 404) {
                resolve(`${index} does not exist; nothing to delete.`);
            } else {
                reject(error);
            }
        });
    })
};

module.exports = {bulkIndex};
