/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-15 14:06:16
 * @Description: Coding something
 */

import {cmd} from '../../common/web-node';
import type {TerminalManager} from './terminal-manager';

const CMD_MAP = {
    clear: 'Clear the terminal.',
    ls: 'View all the files under the folder.',
    mkdir: 'Create a new directory.',
    cd: 'Change the current working directory and switch the displayed PWD in the terminal.',
    pwd: 'Display the current working directory.',
    rm: 'Remove a file.',
    rmdir: 'Remove a directory.',
    cat: 'Display the content of a file.',
    touch: 'Create a new empty file or update the access and modification times of an existing file.',
    echo: 'Output the joined content of the provided arguments.',
    mv: 'Move or rename a file or directory from one location to another.',
    cp: 'Copy a file or directory from one location to another.',
    more: 'Display the content of a file in a paginated way (with limited functionality compared to less).',
    less: 'Display the content of a file in a paginated way with more functionality like scrolling back and forth.',
    head: 'Display the first few lines of a file (the number of lines is specified by an argument).',
    tail: 'Display the last few lines of a file (the number of lines is specified by an argument).',
    grep: 'Search for a specific pattern in files and return the matching lines.',
    find: 'Search for files or directories based on certain conditions and return the results.',
    zip: 'Compress files and directories into a zip file.',
    unzip: 'Extract the contents of a zip file.',
    tar: 'Compress files and directories into a zip file.',
    du: 'Display the disk usage of a file or directory.',
    help: 'Show commands information.'
};

const CMDHelpInfo = (() => {
    const map: string[] = [];
    const keys = Object.keys(CMD_MAP);

    let maxLen = 0;
    for (const key of keys) {
        if (key.length > maxLen) maxLen = key.length;
    }
    for (const k in CMD_MAP) {
        map.push(`${k.padEnd(maxLen, ' ')} :${CMD_MAP[k]}`);
    }
    return map.join('\r\n');
})();

type ICommandType = keyof typeof CMD_MAP;

interface ICommand {
    command: ICommandType;
    args: string[];
    options: Record<string, string>;
}

export class CommandManager {

    terminal: TerminalManager;

    constructor (terminal: TerminalManager) {
        this.terminal = terminal;
    }

    async run (content: string): Promise<string> {
        // return `execute ${command} ${args.toString()}`;
        const commands = this.parseCommand(content);
        const {command, args, options} = commands[0];
        console.log(commands);
        let result = '';
        const [arg0, arg1] = args;
        switch (command) {
            case 'clear': this.terminal.clear(); break;

            case 'ls': result = cmd.ls(arg0).join(' '); break;
            case 'mkdir': await cmd.mkdir(arg0); break;
            case 'cd': {
                if (cmd.cd(arg0)) {
                    this.terminal.switchPWD();
                } else {
                    result = 'Target is not a directory.';
                }
            }; break;
            case 'pwd': result = cmd.pwd(); break;
            case 'rm': await cmd.rm(arg0); break;
            case 'rmdir': await cmd.rmdir(arg0); break;
            case 'cat': result = cmd.cat(arg0) || ''; break;
            case 'touch': await cmd.touch(arg0); break;
            case 'echo': result = args.join(' '); break;
            case 'mv': await cmd.mv(arg0, arg1); break;
            case 'cp': await cmd.cp(arg0, arg1); break;
            case 'more': result = cmd.more(arg0) || ''; break;
            case 'less': result = cmd.less(arg0) || ''; break;
            case 'head': result = cmd.head(arg0, parseInt(arg1)) || ''; break;
            case 'tail': result = cmd.tail(arg0, parseInt(arg1)) || ''; break;
            case 'grep': result = cmd.grep(arg0, arg1).join('\r\n'); break;
            case 'find': result = cmd.find(arg0, options).join('\r\n'); break;
            case 'zip': await cmd.zip(args.slice(1), arg0); break;
            case 'unzip': await cmd.unzip(arg0, arg1); break;
            case 'tar': await cmd.zip(args.slice(1), arg0); break;
            case 'du': cmd.du(arg0); break;

            case 'help': result = CMDHelpInfo; break;

            default: break;
        }

        return result;
        
    }

    private parseCommand (content: string): ICommand[] {
        const values = content.split('|').map(v => v.trim());
        const commands: ICommand[] = [];
        for (let value of values) {
            const command: ICommand = {
                // @ts-ignore
                command: '',
                args: [],
                options: {},
            };
            const results = value.matchAll(/-(\S*) (\S*)[ $]/g);
            for (const item of results) {
                command.options[item[1]] = item[2];
                value = value.replace(item[0], '');
            }

            const args = value.split(' ');
            // @ts-ignore
            command.command = args.shift()!;
            command.args = args;
            commands.push(command);
        }
        return commands;
    }
}