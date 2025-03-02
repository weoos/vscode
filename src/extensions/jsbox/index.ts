/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-17 11:38:49
 * @Description: Coding something
 */

'use strict';

import * as vscode from 'vscode';
import {JsBoxWebViewManager} from './webview-manager';
export function activate (context: vscode.ExtensionContext) {

    const manager = new JsBoxWebViewManager();

    const disposable = vscode.commands.registerCommand('JsBox.Run', () => {


        const editor = vscode.window.activeTextEditor;
        if (editor) {
            // 获取编辑器中的代码内容
            const code = editor.document.getText();
            // 获取编辑器中文档的语言 ID
            const language = editor.document.languageId as any;
            const path = editor.document.uri.toString();
            // 显示代码和语言信息
            // vscode.window.showInformationMessage(`Code: ${code}; Language: ${language}; uri: ${uri}`);
            manager.run({code, path, language});
        } else {
            vscode.window.showErrorMessage('No active editor found.');
        }
    });
    
    context.subscriptions.push(disposable);
}
