/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-11 23:08:53
 * @Description: Coding something
 */
'use strict';

import {Messenger, storage} from '../../common/messenger/messenger';
import * as vscode from 'vscode';

export async function activate (context: vscode.ExtensionContext) {
    const msg = new Messenger('term-ext');
    context.subscriptions.push(
        vscode.commands.registerCommand('workbench.action.terminal.clear', () => {
            msg.emit('clear-terminal');
        })
    );
    context.subscriptions.push(
        vscode.window.onDidChangeActiveColorTheme((event) => {
            msg.emit('theme-change', event.kind === 1 ? 'light' : 'dark');
        })
    );
    storage.setItem('initial-theme', vscode.window.activeColorTheme.kind === 1 ? 'light' : 'dark');
}
