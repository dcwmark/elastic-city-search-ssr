/* api_routes/index.js */

"use strict";

import bulkIndex from './bulkIndex';
import searchIndex from'./searchIndex';

module.exports = (app, renderer) => {
    const path = require('path');
    
    app.use('/api', bulkIndex);
    
    app.use('/search', searchIndex);

    app.get('*', (req, res) => {
      const context = { url: req.url };

      renderer.renderToString(context, (err, html) => {
        if (err) {
          if (err.message === 404) {
            res.status(404).end('Page not found');
          } else {
            console.log(err);
            res.status(500).end('Internal Server Error');
          }
        }

        res.end(html);
      });
    });
};
