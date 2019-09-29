# elastic-city-search-ssr

```zah
> take elastic-city-seacrh-ssr
```
---

>>>
    echo "# elastic-city-search-ssr" >> README.md
    git init
    git add README.md
    git commit -m "first commit"
    git remote add origin https://github.com/dcwmark/elastic-city-search-ssr.git
    git push -u origin master
>>>

---

```
> npm init -y
> npm i vue vue-server-renderer --save
> npm i @babel/core @babel/plugin-syntax-dynamic-import @babel/preset-env @babel/register
> npm i babel-loader css-loader
> npm i babel-eslint
> npm i eslint@5.16.0 eslint-config-airbnb-base eslint-plugin-import eslint-plugin-vue -D
> npm i nodemon -D
> npm i prettier -D
> npm i vue-hot-reload-api -D
> npm i axios
> npm i body-parser
> npm i core-js
> npm i css-loader
> npm i elasticsearch
> npm i express
> npm i latest-version
> npm i mini-css-extract-plugin
> npm i npm-run-all
> npm i optimize-css-assets-webpack-plugin
> npm i path
> npm i uglifyjs-webpack-plugin
> npm i url-loader
> npm i vue vue-loader vue-meta vue-router vue-server-renderer vue-style-loader vue-template-compiler
> npm i vuex vuex-router-sync
> npm i webpack webpack-merge webpack-node-externals
> npm i webpack-cli webpack-dev-server -D
```

---

** N.B. **

When first running the app, the `/dist` has not been created.
Run `npm run build` to have `/dist` created.

---

** webpack-base.js **

---

** webpack-server.js **

```javascript
const baseConfig = require('./webpack.base.js');

...

let config = merge(baseConfig, {
  entry: ['./app/entry-client.js'],

```

---

** webpack-client.js **

```javascript
const baseConfig = require('./webpack.base.js');

...

module.exports = merge(baseConfig, {
  entry: './app/entry-server.js',

```

---

** elastic-city-search-ssr/app/entry-client.js **

```javascript

import { createApp } from './app';

```

---

** elastic-city-search-ssr/app/entry-server.js **

```javascript

import { createApp } from './app';

```

---

** elastic-city-search-ssr/app/app.js **

```javascript

export function createApp() {
  const app = new Vue({
    render: h => h(App),
  });

  return { app };

```


---









