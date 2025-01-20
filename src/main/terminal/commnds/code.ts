/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-19 16:19:05
 * @Description: Coding something
 */
import {messenger} from '../../message';
import type {ICommand, ICommandInfo, Disk} from '../dist';

export const CodeCommand: ICommand = {
    name: 'code',
    helpInfo: 'Open Folder With VsCode Web.',
    run (cmd: ICommandInfo, options: {commands: ICommandInfo[]; disk: Disk; data: string;}): string {
        const path = cmd.args[0];

        if (!options.disk.existSync(path)) {
            return `Target "${path}" is not exists.`;
        }
        if (!options.disk.isDir(path)) {
            return `Target "${path}" is not Directory.`;
        }
        
        messenger.emit('open-folder', {path, replace: true});

        return '';
    }
};