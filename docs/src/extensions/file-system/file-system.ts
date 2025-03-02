/* ---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// todo fix terminal修改文件 vscode 工作区不实时更新
// todo fix 搜索无效问题

import {Disk, path} from '@weoos/disk';
import * as vscode from 'vscode';

export class WebOSFS implements vscode.FileSystemProvider {

    disk: Disk;

    ready: Promise<void>;

    constructor () {
        this.disk = new Disk();
        this.ready = this.disk.ready;
        this._onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();

        // setTimeout(() => {
        //     console.log('trigger change file');
        //     this._onDidChangeFile.fire([{
        //         type: vscode.FileChangeType.Created,
        //         uri: vscode.Uri.parse('wosfs:/test/aa'),
        //     } as vscode.FileChangeEvent]);
        // }, 10000);
    }
    async stat (uri: vscode.Uri): Promise<vscode.FileStat> {
        await this.ready;
        const info = await this.disk.stat(uri.path);
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


    async readDirectory (uri: vscode.Uri): Promise<[string, vscode.FileType][]> {
        await this.ready;
        const files = await this.disk.ls(uri.path);
        if (!files) return [];
        console.log(`readDirectory uri.path=${uri.path}`, uri, files);
        return Promise.all(files.map(async name => {
            const stat = await this.disk.stat(path.join(uri.path, name));
            const isDir = stat.isDirectory();
            return [
                name,
                isDir ? vscode.FileType.Directory : vscode.FileType.File,
            ];
        }));
    }

    // --- manage file contents

    async readFile (uri: vscode.Uri): Promise<Uint8Array> {
        console.log('read ----', uri);
        await this.ready;
        try {
            const data = await this.disk.read(uri.path);
            if (!data) return new Uint8Array();
            console.log('watch readFile', new TextDecoder().decode(data));
            return data;
        } catch (e) {
            throw vscode.FileSystemError.FileNotFound();
        }
    }

    async writeFile (uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean }): Promise<void> {
        await this.ready;
        console.log('trigger write file', uri.path);

        const path = uri.path;
        const exist = await this.disk.exist(path);

        if (!exist && !options.create) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        if (exist && options.create && !options.overwrite) {
            throw vscode.FileSystemError.FileExists(uri);
        }
        await this.disk.write(path, content);

        this._fireSoon({type: vscode.FileChangeType.Changed, uri});
    }

    // --- manage files/folders

    async rename (oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): Promise<void> {
        await this.ready;
        console.log('trigger rename file');
        if (!options.overwrite && await this.disk.exist(newUri.path)) {
            throw vscode.FileSystemError.FileExists(newUri);
        }
        await this.disk.move(oldUri.path, newUri.path);
        this._fireSoon(
            {type: vscode.FileChangeType.Deleted, uri: oldUri},
            {type: vscode.FileChangeType.Created, uri: newUri}
        );
    }

    async delete (uri: vscode.Uri): Promise<void> {
        await this.ready;
        console.log('trigger delete file');
        const dirname = uri.with({path: path.dirname(uri.path)});
        const uriPath = uri.path;
        if (!await this.disk.exist(uriPath)) {
            throw vscode.FileSystemError.FileNotFound(uri);
        }
        await this.disk.remove(uriPath);
        this._fireSoon({type: vscode.FileChangeType.Changed, uri: dirname}, {uri, type: vscode.FileChangeType.Deleted});
    }

    async createDirectory (uri: vscode.Uri): Promise<void> {
        await this.ready;
        const dirname = uri.with({path: path.dirname(uri.path)});
        const uriPath = uri.path;
        await this.disk.createDir(uriPath);
        this._fireSoon({type: vscode.FileChangeType.Changed, uri: dirname}, {type: vscode.FileChangeType.Created, uri});
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async copy (source: vscode.Uri, destination: vscode.Uri, options: { readonly overwrite: boolean; }): Promise<void> {
        await this.ready;
        console.log('trigger copy file', source.path, destination.path);
        await this.disk.copySingle(source.path, destination.path);
    }
    
    private _onDidChangeFile: vscode.EventEmitter<vscode.FileChangeEvent[]>;
    get onDidChangeFile (): vscode.Event<vscode.FileChangeEvent[]> {
        return this._onDidChangeFile.event;
    }

    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    watch (uri: vscode.Uri, options: { recursive: boolean; excludes: string[]; }): vscode.Disposable {
        
        console.log('watch listen', uri, options);
        const watcher = this.disk.watch(uri.path, {recursive: options.recursive}, async (event, filename) => {
            await this.ready;
            console.log('watch', event, filename);

            if (filename) {
                const filepath = path.join(uri.path, filename as string);

                // TODO support excludes (using minimatch library?);

                let type = vscode.FileChangeType.Changed;
                if (event !== 'change') {
                    type = await this.disk.exist(filepath) ? vscode.FileChangeType.Created : vscode.FileChangeType.Deleted;
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
