/*
 * @Author: chenzhongsheng
 * @Date: 2024-08-12 17:51:34
 * @Description: Coding something
 */

import {createStore, dom, mount, $, raw} from '../src';
// import {createStore, dom, mount, react, style} from '../npm';

function main () {
    const store = createStore({count: 0}, {
        b: () => {}
    });

    dom.div.style({
        display: 'block'
    });

    // store.$sub(() => store.count + 1, () => {
    //     console.log('111');
    // });


    return dom.button.text($`count is ${raw(1)} ${store.count}`)
        .click(() => store.count++);
    // return dom.button.append(
    //     `count is `, $(store.count)
    // )
    //     .click(() => store.count++);
}

mount(main(), 'body');

// import './alien-signal-test';