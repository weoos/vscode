/*
 * @Author: chenzhongsheng
 * @Date: 2025-03-02 22:43:27
 * @Description: Coding something
 */
const express = require('express');
const serveStatic = require('serve-static');

const staticBasePath = '../vscode';
 
const app = express();
 
app.use(serveStatic(staticBasePath));
const port = 5173;
app.listen(port);
console.log(`Listening on port ${port}`);