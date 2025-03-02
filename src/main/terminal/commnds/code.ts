/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-19 16:19:05
 * @Description: Coding something
 */
import {messenger} from '../../message';
import type {ICommand, ICommandInfo, Disk} from '@weoos/disk';

export const CodeCommand: ICommand = {
    name: 'code',
    helpInfo: 'Open Folder With VsCode Web.',
    async run (cmd: ICommandInfo, options: {commands: ICommandInfo[]; disk: Disk; data: string;}) {
        const path = cmd.args[0];

        if (!await options.disk.exist(path)) {
            return `Target "${path}" is not exists.`;
        }
        if (await options.disk.isDir(path)) {
            messenger.emit('open-folder', {path, replace: true});
        } else {
            messenger.emit('open-file', path);
        }
        return '';
    }
};