/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-11 23:08:53
 * @Description: Coding something
 */
'use strict';

import {Messenger} from '../../common/messenger';
import {storage} from '../../common/storage';
import * as vscode from 'vscode';

export async function activate (context: vscode.ExtensionContext) {
    let isThemeSet = false;
    const value = await storage.getItem('set-theme');
    console.log('set-theme', value);
    if (value) {
        isThemeSet = true;
    } else {
        // ! 设置默认主题为黑色
        const themeName = 'Default Dark+';
        const config = vscode.workspace.getConfiguration();
        await config.update('workbench.colorTheme', themeName, vscode.ConfigurationTarget.Global);
    }

    const msg = new Messenger({id: 'term-ext'});
    context.subscriptions.push(
        vscode.commands.registerCommand('workbench.action.terminal.clear', () => {
            msg.emit('clear-terminal');
        })
    );
    context.subscriptions.push(
        vscode.window.onDidChangeActiveColorTheme((event) => {
            if (!isThemeSet) {
                isThemeSet = true;
                storage.setItem('set-theme', true);
            }
            console.log('theme-change', event.kind, event);
            msg.emit('theme-change', event.kind === 1 ? 'light' : 'dark');
        })
    );
    storage.setItem('initial-theme', vscode.window.activeColorTheme.kind === 1 ? 'light' : 'dark');
}
