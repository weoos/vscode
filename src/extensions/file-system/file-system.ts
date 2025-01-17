/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// todo fix terminal修改文件 vscode 工作区不实时更新
// todo fix 搜索无效问题

import {require, ready} from '../../common/web-node/dist';
import * as vscode from 'vscode';


const path = require('path');
const fs = require('fs');


export class WebOSFS implements vscode.FileSystemProvider {

    ready: Promise<void>;

    constructor () {
        this.ready = ready;
        this._onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();

        // setTimeout(() => {
        //     console.log('trigger change file');
        //     this._onDidChangeFile.fire([{
        //         type: vscode.FileChangeType.Created,
        //         uri: vscode.Uri.parse('wosfs:/test/aa'),
        //     } as vscode.FileChangeEvent]);
        // }, 10000);
    }

    stat (uri: vscode.Uri): vscode.FileStat {
        const info = fs.statSync(uri.path);
        // const {name} = splitPathInfo(uri.path);

        console.log(`stat: uri.path=${uri.path}`, uri, info);

        // @ts-ignore
        if (info.type === 'empty') {
            throw vscode.FileSystemError.FileNotFound();
        }

        return {
            type: info.isDirectory() ? vscode.FileType.Directory : vscode.FileType.File,
            ctime: Date.now(),
            mtime: Date.now(),
            size: info.size,
        };
    }


    readDirectory (uri: vscode.Uri): [string, vscode.FileType][] {
        const files = fs.readdirSync(uri.path);
        console.log(`readDirectory uri.path=${uri.path}`, uri, files);
        return files.map(name => {
            const stat = fs.statSync(path.join(uri.path, name));
            const isDir = stat.isDirectory();
            return [
                name,
                isDir ? vscode.FileType.Directory : vscode.FileType.File,
            ];
        });
    }

    // --- manage file contents

    readFile (uri: vscode.Uri): Uint8Array {
        try {
            const data = fs.readFileSync(uri.path);
            console.log('watch readFile', new TextDecoder().decode(data));
            return data;
        } catch (e) {
            throw vscode.FileSystemError.FileNotFound();
        }
    }

    writeFile (uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean }): void {
        console.log('trigger write file', uri.path);

        const path = uri.path;
        const exist = fs.existsSync(path);

        if (!exist && !options.create) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        if (exist && options.create && !options.overwrite) {
            throw vscode.FileSystemError.FileExists(uri);
        }
        fs.writeFileSync(path, content);

        this._fireSoon({type: vscode.FileChangeType.Changed, uri});
    }

    // --- manage files/folders

    rename (oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void {
        console.log('trigger rename file');
        if (!options.overwrite && fs.existsSync(newUri.path)) {
            throw vscode.FileSystemError.FileExists(newUri);
        }
        fs.renameSync(oldUri.path, newUri.path);
        this._fireSoon(
            {type: vscode.FileChangeType.Deleted, uri: oldUri},
            {type: vscode.FileChangeType.Created, uri: newUri}
        );
    }

    delete (uri: vscode.Uri): void {
        console.log('trigger delete file');
        const dirname = uri.with({path: path.dirname(uri.path)});
        const uriPath = uri.path;
        if (!fs.existsSync(uriPath)) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        fs.rmSync(uriPath);
        this._fireSoon({type: vscode.FileChangeType.Changed, uri: dirname}, {uri, type: vscode.FileChangeType.Deleted});
    }

    createDirectory (uri: vscode.Uri): void {
        const dirname = uri.with({path: path.dirname(uri.path)});
        const uriPath = uri.path;
        fs.mkdirSync(uriPath);
        this._fireSoon({type: vscode.FileChangeType.Changed, uri: dirname}, {type: vscode.FileChangeType.Created, uri});
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    copy (source: vscode.Uri, destination: vscode.Uri, options: { readonly overwrite: boolean; }): void {
        console.log('trigger copy file', source.path, destination.path);
        fs.copyFileSync(source.path, destination.path);
    }
    
    private _onDidChangeFile: vscode.EventEmitter<vscode.FileChangeEvent[]>;
    get onDidChangeFile (): vscode.Event<vscode.FileChangeEvent[]> {
        return this._onDidChangeFile.event;
    }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch (uri: vscode.Uri, options: { recursive: boolean; excludes: string[]; }): vscode.Disposable {
        
        console.log('watch listen', uri, options);
        const watcher = fs.watch(uri.path, {recursive: options.recursive}, (event, filename) => {
            console.log('watch', event, filename);

            if (filename) {
                const filepath = path.join(uri.path, filename);

                // TODO support excludes (using minimatch library?);

                let type = vscode.FileChangeType.Changed;
                if (event !== 'change') {
                    type = fs.existsSync(filepath) ? vscode.FileChangeType.Created : vscode.FileChangeType.Deleted;
                }

                this._onDidChangeFile.fire([{
                    type,
                    uri: uri.with({path: filepath})
                } as vscode.FileChangeEvent]);
            }
        });

        return {dispose: () => watcher.close()};
    }

    private _emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
    private _bufferedEvents: vscode.FileChangeEvent[] = [];
    private _fireSoonHandle?: any;
    private _fireSoon (...events: vscode.FileChangeEvent[]): void {
        this._bufferedEvents.push(...events);

        if (this._fireSoonHandle) {
            // @ts-ignore
            clearTimeout(this._fireSoonHandle);
        }

        this._fireSoonHandle = setTimeout(() => {
            this._emitter.fire(this._bufferedEvents);
            this._bufferedEvents.length = 0;
        }, 5);
    }
}
