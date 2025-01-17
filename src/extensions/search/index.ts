/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-17 11:38:49
 * @Description: Coding something
 */

'use strict';

import * as vscode from 'vscode';

export function activate (context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerWorkspaceSymbolProvider(new MySymbolProvider())
    );
}

class MySymbolProvider implements vscode.WorkspaceSymbolProvider {
    provideWorkspaceSymbols (query, token) {
        debugger;
        // 这里是实现符号查询的主要逻辑
        let symbols = [];
        // 假设你要从当前打开的所有文本文件中查找符号
        const allDocuments = vscode.workspace.textDocuments;
        for (const doc of allDocuments) {
            const symbolsInDoc = this.findSymbolsInDocument(doc, query);
            symbols = symbols.concat(symbolsInDoc);
        }
        return symbols;
    }
  
    findSymbolsInDocument (doc, query) {
        debugger;
        const symbols = [];
        const text = doc.getText();
        // 简单的示例：查找文本中与查询匹配的单词作为符号
        let startIndex = 0;
        while (true) {
            const index = text.indexOf(query, startIndex);
            if (index === -1) {
                break;
            }
            const position = doc.positionAt(index);
            const symbolRange = new vscode.Range(position, position.translate(0, query.length));
            const symbol = new vscode.SymbolInformation(query, vscode.SymbolKind.Variable, '', doc.uri, symbolRange);
            symbols.push(symbol);
            startIndex = index + 1;
        }
        return symbols;
    }
}