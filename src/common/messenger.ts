/*
 * @Author: chenzhongsheng
 * @Date: 2025-01-17 23:04:27
 * @Description: Coding something
 */

import {WeoOSEvent} from '@weoos/event';

export interface IMessageMap {
    'clear-terminal': null,
    'open-folder': {path: string, replace?: boolean},
    'open-file': string,
    'theme-change': 'light'|'dark',
}

export type IMsgKey = keyof IMessageMap;


export interface IMessage<T extends IMsgKey> {
    id: string,
    from: string,
    ts: number,
    type: T,
    data: IMessageMap[T],
}

export interface IMessengerOptions {
    interval?: number; // 轮询时间
}

export class Messenger extends WeoOSEvent<IMessageMap> {
}