/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-17 11:38:49
 * @Description: Coding something
 */

'use strict';

import type * as vscode from 'vscode';
export function activate (context: vscode.ExtensionContext) {
    // todo 有待实现自定义查询；工作区全局搜索在文件没打开的情况下无效
    // 暂时没有头绪
    console.log('activate search', context);
}