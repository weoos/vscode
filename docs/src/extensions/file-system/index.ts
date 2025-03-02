/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-15 22:25:55
 * @Description: Coding something
 */
'use strict';

import * as vscode from 'vscode';
import {WebOSFS} from './file-system';
import {Messenger} from '../../common/messenger';
import {encode} from '@weoos/disk';

function genePath (path: string) {
    if (path[0] !== '/') path = `/${path}`;
    const uri = vscode.Uri.parse(`wosfs:${path}`);
    console.log('genePath', uri.toString());
    return uri;
}

function openFolder (dirPath: string, replace = false) {
    vscode.workspace.updateWorkspaceFolders(0, replace ? 1 : 0, {
        uri: genePath(dirPath),
    });
}

async function openFile (filePath: string) {
    // 打开文本文档
    const document = await vscode.workspace.openTextDocument(genePath(filePath));
    // 在编辑器中显示文档
    await vscode.window.showTextDocument(document);
}


export async function activate (context: vscode.ExtensionContext) {

    const wosfs = new WebOSFS();

    const msg = new Messenger({id: 'fs-ext'});
    msg.on('open-folder', ({path, replace}) => {
        console.log('open-folder', path, replace);
        openFolder(path, replace);
    });
    msg.on('open-file', async (path) => {
        openFile(path);
    });

    console.log('WebOSFS says "Hello"');

    context.subscriptions.push(vscode.workspace.registerFileSystemProvider('wosfs', wosfs, {isCaseSensitive: true}));

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

    await wosfs.ready;

    if (!await wosfs.disk.exist('/hello/hello.js')) {
        await wosfs.disk.createFile('/hello/hello.js', encode('console.log("Hello world!");'), {ensure: true});
    }
    // openFolder('/hello', true);

    // setTimeout(() => {
    //     const uri = vscode.Uri.parse('wosfs:/test/1.txt');
    //     wosfs.readFile(uri).then(content => {
    //         console.log('File content:', content);
    //     }).catch(error => {
    //         console.error('Error reading file:', error);
    //     });
    // }, 2000);

    // context.subscriptions.push(vscode.commands.registerCommand('wosfs.workspaceInit', _ => {
    //     vscode.workspace.updateWorkspaceFolders(0, 0, {uri: vscode.Uri.parse('wosfs:/'), name: 'wosfs - Sample'});
    // }));

}

export function deactivate () {
    // 在这里可以添加扩展停用后的清理代码
}
