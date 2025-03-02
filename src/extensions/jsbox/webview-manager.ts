/*
 * @Author: chenzhongsheng
 * @Date: 2025-03-02 19:44:17
 * @Description: Coding something
 */
import * as vscode from 'vscode';

export class JsBoxWebView {
    panel: vscode.WebviewPanel;
    constructor (
        public path: string,
        public code: string,
        public language: 'html'|'javascript'
    ) {
        
        this.panel = vscode.window.createWebviewPanel(
            `${path}`, // 唯一标识
            `JsBox Page: ${path.replace('wosfs:', '')}`, // 面板标题
            vscode.ViewColumn.Two, // 显示在哪个列
            {
                enableScripts: true, // 启用 JavaScript
                retainContextWhenHidden: true, // 隐藏时保留上下文
                enableFindWidget: true,
                enableForms: true,
                
            } // Webview 选项，可设置更多属性，如 enableScripts 等
        );
        this.load();
    }

    get html () {
        if (this.language === 'html') return this.code;
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Run Javascript: ${this.path}</title>
</head>
<body>
    <script type="text/javascript">${this.code}</script>
</body>
</html>`;
    }


    reload (code?: string) {
        if (code) this.code = code;
        this.panel.reveal();
        this.load();
    }

    load () {
        console.log('reload', this.html);
        this.panel.webview.html = this.html;
    }
}

export class JsBoxWebViewManager {
    map: Record<string, JsBoxWebView> = {};

    run ({path, code, language}: {
        path: string,
        code: string,
        language: 'html'|'javascript'
    }) {
        if (!this.map[path]) {
            this.map[path] = new JsBoxWebView(path, code, language);
        } else {
            this.map[path].reload(code);
        }
    }
}