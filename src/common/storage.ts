/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-22 02:02:54
 * @Description: Coding something
 */

import localforage from 'localforage';

const store = localforage.createInstance({
    name: 'vscode-storage',
    driver: localforage.INDEXEDDB,
});
export const storage = store;

