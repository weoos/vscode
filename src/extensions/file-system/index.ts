/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-15 22:25:55
 * @Description: Coding something
 */
'use strict';

import * as vscode from 'vscode';
import {WebOSFS} from './file-system';
const wosfs = new WebOSFS();

export async function activate (context: vscode.ExtensionContext) {

    await wosfs.ready;

    console.log('WebOSFS says "Hello"');

    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('wosfs', wosfs, {isCaseSensitive: true}));
    // wosfs.ready.then(() => {
    // });


    // context.subscriptions.push(vscode.commands.registerCommand('wosfs.workspaceInit', _ => {
    //     vscode.workspace.updateWorkspaceFolders(0, 0, {uri: vscode.Uri.parse('memfs:/'), name: 'MemFS - Sample'});
    //     const fs = require('fs');
    //     debugger;
    //     console.log('wosfs', fs.readdirSync('/System'));
    // }));

    // context.subscriptions.push(vscode.commands.registerCommand('wosfs.workspaceInit', _ => {
    //     vscode.workspace.updateWorkspaceFolders(0, 0, {uri: vscode.Uri.parse('wosfs:/'), name: 'wosfs - Sample'});
    // }));
}
