/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-11 23:08:53
 * @Description: Coding something
 */
'use strict';

import {Messenger} from '../../common/messenger/messenger';
import * as vscode from 'vscode';

export async function activate (context: vscode.ExtensionContext) {
    const msg = new Messenger('term-ext');
    const disposable = vscode.commands.registerCommand('workbench.action.terminal.clear', () => {
        msg.emit('clear-terminal');
    });
    context.subscriptions.push(disposable);
}
