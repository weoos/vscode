/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-17 11:35:17
 * @Description: Coding something
 */

import {withResolve} from '../../common/utils';
import {storage} from '../../common/storage';
import {WebOS} from '@weoos/os';
import {messenger} from '../message';
import {CodeCommand} from './commnds/code';

export class Main {

    term: MainTerminal;

    get os () {
        return this.term.os;
    }

    constructor () {
        this.term = new MainTerminal();

        this.term.ready.then(() => {
            messenger.on('clear-terminal', () => {
                this.os.term.clearTerminal();
            });
            const initColor = (mode: any) => {
                if (!mode) return;
                const isDark = mode === 'dark';
                this.os.term.setColor({
                    color: isDark ? '#ccc' : '#444',
                    selectionBackground: isDark ? '#ccc' : '#444',
                    selectionColor: isDark ? '#444' : '#ccc',
                });
            };
            messenger.on('theme-change', mode => {
                console.log(`terminal init color ${mode}`);
                initColor(mode);
            });
            storage.getItem('initial-theme').then(mode => initColor(mode));
            this.os.term.setColor({
                background: 'transparent',
            });
            this.os.term.setFontSize(12);
            // @ts-ignore
            window.os = this.os;

            // todo 安装nodejs
        });
    }
}

export class MainTerminal {

    timer: any = null;
    interval: any = null;
    initialized = false;

    os: WebOS;

    ready: Promise<any>;

    private resolve: ()=>any;

    constructor () {

        window.addEventListener('mouseup', () => {
            this.tryInitTerminal();
        });
        let index = 6;
        this.interval = setInterval(() => {
            index --;
            if (index === 0) {
                clearInterval(this.interval);
                return;
            }
            this.init();
        }, 1000);

        const {ready, resolve} = withResolve();
        this.ready = ready;
        this.resolve = resolve;
    }

    private tryInitTerminal () {
        if (this.initialized) return;
        clearTimeout(this.timer);
    
        this.timer = setTimeout(() => {
            this.init();
        }, 500);
    }

    private init () {
        if (this.initialized) {
            clearInterval(this.interval);
            return;
        }
    
        const list = document.querySelectorAll('.integrated-terminal');
        if (list.length) {
            for (let i = 0; i < list.length; i++) {
                const container = (list[i].firstChild) as HTMLElement & {__inited: boolean};
                this.initialized = true;
                container.addEventListener('wheel', e => {
                    e.stopPropagation();
                });
                container.innerHTML = '';
                container.style.padding = '5px';
                this.os = new WebOS({container});
                this.onInitialized();
                this.resolve();
            }
        }
    }

    private onInitialized () {
        this.initCommands();
    }

    private initCommands () {
        this.os.registerCommand(CodeCommand);
    }
}

new Main();
