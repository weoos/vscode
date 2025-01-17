/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-17 11:35:17
 * @Description: Coding something
 */

import {withResolve} from '../../common/utils';
import {Messenger, storage} from '../../common/messenger/messenger';
import {WebOS} from './dist';

export class Main {
    msg = new Messenger('main');

    term: MainTerminal;

    get os () {
        return this.term.os;
    }

    constructor () {
        this.term = new MainTerminal();

        this.term.ready.then(() => {
            this.msg.on('clear-terminal', () => {
                this.os.term.clearTerminal();
            });
            const initColor = (mode: any) => {
                if (!mode) return;
                this.os.term.setColor({color: mode === 'dark' ? '#fff' : '#000'});
            };
            this.msg.on('theme-change', mode => initColor(mode));
            storage.getItem('initial-theme').then(mode => initColor(mode));
            this.os.term.setColor({
                background: 'transparent',
            });
            window.os = this.os;
        });

        // @ts-ignore
        window.test = (path: string) => {
            this.msg.emit('open-folder', {path, replace: true});
        };
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
    
        const list = document.querySelectorAll('.welcome-view');
    
        if (list.length) {
            for (let i = 0; i < list.length; i++) {
                const container = list[i] as HTMLElement & {__inited: boolean};
                if (container.innerText !== 'Web Terminal is Loading...') continue;
                this.initialized = true;
                container.addEventListener('wheel', e => {
                    e.stopPropagation();
                });
                container.innerHTML = '';
                container.style.padding = '5px';
                this.os = new WebOS(container);
                this.resolve();
            }
        }
    }
}

new Main();
