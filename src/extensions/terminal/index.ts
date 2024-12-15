/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-11 23:08:53
 * @Description: Coding something
 */
'use strict';

import * as vscode from 'vscode';
import {TerminalManager} from './terminal-manager';

export function activate (context) {
    console.log('activated terminal', context);

    // console.log('TERMINAL EXT4', cmd.ls());
    // vscode.window.onDidOpenTerminal(terminal => {
    //     console.log('Terminal opened. Total count: ' + (vscode.window).terminals.length);
    // });
    // vscode.window.onDidCloseTerminal((terminal) => {
    //     vscode.window.showInformationMessage(`onDidOpenTerminal, name: ${terminal.name}`);
    // });
    // vscode.window.onDidChangeActiveTerminal
    vscode.window.onDidChangeActiveTerminal(e => {
        console.log(`Active terminal changed, name=${e ? e.name : 'undefined'}`);
        if (vscode.window.terminals.length === 0) {
            new TerminalManager();
        }
    });
    // // vscode.commands.registerCommand('')
    // vscode.window.onDidChangeTerminalState(e => {
    //     console.log(`Terminal state changed, name=${e ? e.name : 'undefined'}`);
    // });
    // // vscode.window.onDidStartTerminalShellExecution(e => {
    // // 	console.log(`Terminal shell execution started, name=${e? e.name : 'undefined'}`);
    // // });
    // context.subscriptions.push(vscode.commands.registerCommand('extensionTerminalSample.create', () => {
    //     new TerminalManager();
    // }));

    // context.subscriptions.push(vscode.commands.registerCommand('extensionTerminalSample.clear', () => {
    // }));

    // context.subscriptions.push(vscode.window.registerTerminalProfileProvider('webos.terminal', {
    //     // @ts-ignore
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     provideTerminalProfile (token) {
    // 	  	return {
    //             name: 'WebOS',
    //             pty: createPty(),
    //         };
    //     }
    //   }));
    new TerminalManager();
}
