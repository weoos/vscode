/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-15 22:25:55
 * @Description: Coding something
 */
'use strict';

import * as vscode from 'vscode';
import {WebOSFS} from './file-system';
import {Messenger} from '../../common/messenger/messenger';

// import {require} from '../../common/web-node/dist';
const wosfs = new WebOSFS();
// const fs = require('fs');

function openFolder (dirPath: string, replace = false) {
    vscode.workspace.updateWorkspaceFolders(0, replace ? 1 : 0, {
        uri: vscode.Uri.parse(`wosfs:${dirPath}`),
    });
}

export async function activate (context: vscode.ExtensionContext) {

    const msg = new Messenger('fs-ext');
    msg.on('open-folder', ({path, replace}) => {
        openFolder(path, replace);
    });
    await wosfs.ready;

    console.log('WebOSFS says "Hello"');

    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('wosfs', wosfs, {isCaseSensitive: true}));


    openFolder('/test');

    context.subscriptions.push(vscode.commands.registerCommand('wosfs.workspaceInit', async () => {
        const dirPath = await vscode.window.showInputBox({
            prompt: 'Please input directory path.',
            placeHolder: 'Such as: /path/to/your/directory'
        });
        if (dirPath) {
            try {
                // 将输入的目录路径添加到工作区
                openFolder(dirPath, true);
            } catch (error) {
            }
        }
    }));

    // context.subscriptions.push(vscode.commands.registerCommand('wosfs.workspaceInit', _ => {
    //     vscode.workspace.updateWorkspaceFolders(0, 0, {uri: vscode.Uri.parse('wosfs:/'), name: 'wosfs - Sample'});
    // }));

}

export function deactivate () {
    // 在这里可以添加扩展停用后的清理代码
}
