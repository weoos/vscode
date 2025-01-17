/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-17 11:38:49
 * @Description: Coding something
 */

'use strict';

import * as vscode from 'vscode';
export function activate (context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand('JsBox.Run', () => {


        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // 获取编辑器中的代码内容
            const code = editor.document.getText();
            // 获取编辑器中文档的语言 ID
            const language = editor.document.languageId;
            const uri = editor.document.uri.toString();
            // 显示代码和语言信息
            vscode.window.showInformationMessage(`Code: ${code}; Language: ${language}; uri: ${uri}`);
        } else {
            vscode.window.showErrorMessage('No active editor found.');
        }

        const panel = vscode.window.createWebviewPanel(
            'JsBox', // 唯一标识
            'JsBox Page', // 面板标题
            vscode.ViewColumn.Two, // 显示在哪个列
            {} // Webview 选项，可设置更多属性，如 enableScripts 等
        );
        panel.webview.html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Webview Example</title>
    </head>
    <body>
        <h1>Hello from Webview</h1>
        <p>This is a simple Webview example in VSCode.</p>
    </body>
    </html>`;
    });
    context.subscriptions.push(disposable);
}
