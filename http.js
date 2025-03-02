/*
 * @Author: chenzhongsheng
 * @Date: 2025-03-02 22:43:27
 * @Description: Coding something
 */
const express = require('express');
const serveStatic = require('serve-static');

const staticBasePath = './docs';
 
const app = express();
 
app.use(serveStatic(staticBasePath));
app.listen(5173);
console.log('Listening on port 8080');