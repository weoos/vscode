/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-14 15:30:23
 * @Description: Coding something
 */


import * as vscode from 'vscode';
import {cmd, initWebNodejs} from '../../common/web-node';
import {HistoryStack} from 'history-stack';


const ready = initWebNodejs();

// export function createPty () {
//     const writeEmitter = new vscode.EventEmitter();
//     let line = '';
//     const pty = {
//         onDidWrite: writeEmitter.event,
//         open: () => writeEmitter.fire(`Welcome to WebOS!\r\n\r\n${pwd}`),
//         close: () => { /* noop*/ },
//         handleInput: (data) => {
//             console.log('handleInput', `data="${data}"`, `line="${line}"`);
//             if (data === '\r') { // Enter
//                 console.log('handleInput', `IS Enter`);

//                 if (line === 'clear') {
//                     writeEmitter.fire('\x1b[2J\x1b[3J\x1b[;H');
//                     writeEmitter.fire(`\r\n${pwd}`);
//                     line = '';
//                     return;
//                 }

//                 writeEmitter.fire(`\r\necho: "${colorText(line)}"\r\n${pwd}`);
//                 line = '';
//                 return;
//             }
//             if (data === '\x7f') { // Backspace
//                 console.log('handleInput', `IS Backspace`);
//                 if (line.length === 0) {
//                     return;
//                 }
//                 line = line.substr(0, line.length - 1);
//                 // Move cursor backward
//                 writeEmitter.fire('\x1b[D');
//                 // Delete character
//                 writeEmitter.fire('\x1b[P');
//                 return;
//             }
//             line += data;
//             writeEmitter.fire(data);
//         },
//     };
//     return pty;
// }

const ControlKey = {
    '\r': 'Enter',
    '\x7f': 'Backspace',
    '\x1b[A': 'Up',
    '\x1b[B': 'Down',
    '\x1b[D': 'Left',
    '\x1b[C': 'Right',

} as const;

export class TerminalManager {
    name = 'WebOS';
    pwd = '';
    writeEmitter = new vscode.EventEmitter();
    line = '';
    cursorIndex = 0;
    history = new HistoryStack<string>({max: 100});
    constructor () {

        this.init();
        // @ts-ignore
        // terminal.show();
    }

    private clear () {
        const {writeEmitter} = this;
        writeEmitter.fire('\x1b[2J\x1b[3J\x1b[;H');
        writeEmitter.fire(`\r\n${this.pwd}`);
        this.clearLineInfo();
        return;
    }

    private clearLineInfo () {
        this.line = '';
        this.cursorIndex = 0;
    }

    private async onCommand (content: string) {
        if (content) {
            console.log('onCommand', `data="${content}"`);
            this.history.push(content);
            if (content === 'clear') {
                return this.clear();
            }
            // todo
        }
        this.writeLine('');
    }

    writeLine (text: string, lines = 1) {
        const line = new Array(lines).fill('\r\n').join('');
        this.writeEmitter.fire(`${text}${line}${this.pwd}`);
    }
    writeEmptyLine () {
        this.writeEmitter.fire(`\r\n`);
    }

    switchPWD () {
        this.pwd = `${cmd.pwd() || '/'} admin$ `;
    }

    // < 0 左移， > 0 右移
    cursorMove (count = 1, modIndex = true): number {
        if (count === 0) return 0;
        const char = count < 0 ? 'D' : 'C';

        const a = this.cursorIndex + count;
        const start = Math.min(a, this.cursorIndex);
        const end = Math.max(a, this.cursorIndex);
        const offset = countOffset(this.line.substring(start, end));

        console.log(`cursorMove start=${start} end=${end} offset=${offset} count=${count}`);

        const value = new Array(Math.abs(count) + offset).fill(`\x1b[${char}`).join('');
        this.writeEmitter.fire(value);
        if (modIndex) this.cursorIndex += count;

        return offset;

    }
        

    cursorMoveToTail () {
        this.cursorMove(this.line.length - this.cursorIndex);
    }
    cursorMoveToHead () {
        this.cursorMove(- this.cursorIndex);
    }

    replaceCurrentLine (value: string) {
        console.log('replaceCurrentLine', `data="${value}"`, `line="${this.line}" cursorIndex=${this.cursorIndex}`);
        this.deleteAll();
        this.line = value;
        this.cursorIndex = value.length;
        this.writeEmitter.fire(value);
    }

    delete (count = 1) {
        if (count === 0) return;
        if (this.cursorIndex <= 0) return;

        if (count > this.cursorIndex) {
            count = this.cursorIndex;
        }


        this.line = this.line.substring(0, this.cursorIndex - count) + this.line.substring(this.cursorIndex);


        const offset = this.cursorMove(-count);
        const value = new Array(count + offset).fill('\x1b[P').join('');
        this.writeEmitter.fire(value);
        console.log(`after delete: line=${this.line} offset=${offset} count=${count}`);
    }
    deleteAll () {
        this.cursorMoveToTail();
        console.log('deleteAll', this.cursorIndex);
        this.delete(this.cursorIndex);
    }

    private async init () {
        await ready;

        this.switchPWD();

        const {writeEmitter} = this;
        const pty = {
            onDidWrite: writeEmitter.event,
            open: () => this.writeLine(`Welcome to WebOS!`, 2),
            close: () => { /* noop*/ },
            handleInput: async (data: string) => {
                console.log('handleInput', `data="${data}"`, `line="${this.line}" cursorIndex=${this.cursorIndex}`);
                const controlKey = ControlKey[data as keyof typeof ControlKey] || '';

                // todo 中文 光标问题
                const fireData = () => {
                    const newData = data + this.line.substring(this.cursorIndex);
                    this.line = this.line.substring(0, this.cursorIndex) + newData;
                    writeEmitter.fire(newData);
                    const back = this.line.length - data.length - this.cursorIndex;
                    this.cursorIndex += newData.length;
                    console.log(`fireData newDate=${newData} ${newData.length} back=${back} cursorIndex=${this.cursorIndex}`);
                    this.cursorMove(-back);
                };

                switch (controlKey) {
                    case 'Enter':
                        await this.onCommand(this.line);
                        this.clearLineInfo();
                        break;
                    case 'Backspace':
                        this.delete(1);
                        break;
                    case 'Up':
                        // ! 如果首次翻看历史记录，会把当前内容加入历史记录
                        if (!this.history.isActive) {
                            this.history.push(this.line);
                            this.history.back();
                        }
                        if (this.history.canBack()) {
                            const value = this.history.back();
                            console.log('history back', value);
                            this.replaceCurrentLine(value);
                        } else {
                            // 如果翻到第一条了 加一个光标移到最前面
                            this.cursorMoveToHead();
                        }
                        break;
                    case 'Down':
                        if (this.history.canForward()) {
                            const value = this.history.forward();
                            console.log('history forward', value);
                            this.replaceCurrentLine(value);
                        }
                        break;
                    case 'Left':
                        if (this.cursorIndex > 0) {
                            this.cursorMove(-1);
                        }
                        break;
                    case 'Right':
                        if (this.cursorIndex < this.line.length) {
                            this.cursorMove(1);
                        }
                        break;
                    default:
                        if (data[0] !== '[') {
                            fireData();
                            // ! 对最新的当前操作的历史记录可以更新
                            if (this.history.isLatest) {
                                this.history.replace(this.line);
                            }
                        }
                        break;
                }
                console.log('handleInput after', `data="${data}"`, `line="${this.line}" cursorIndex=${this.cursorIndex}`);
            },
        };

        // @ts-ignore
        const terminal = vscode.window.createTerminal({
            name: this.name,
            pty,
        });
    }

    // clear(){
    // 	this.writeEmitter.fire('\x1b[2J\x1b[3J\x1b[;H');
    // }
}
function colorText (text) {
    let output = '';
    let colorIndex = 1;
    for (let i = 0; i < text.length; i++) {
        const char = text.charAt(i);
        if (char === ' ' || char === '\r' || char === '\n') {
            output += char;
        } else {
            output += `\x1b[3${colorIndex++}m${text.charAt(i)}\x1b[0m`;
            if (colorIndex > 6) {
                colorIndex = 1;
            }
        }
    }
    return output;
}

function isMultiByte (char: string) {
    const code = char.charCodeAt(0);
    return code >= 0x80;
}

function countOffset (word: string) {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        if (isMultiByte(word[i])) {
            count ++;
        }
    }
    return count;
}