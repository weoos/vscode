/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-15 17:07:22
 * @Description: Coding something
 */
export function getMaxCommonHead (values: string[], start = 0) {
    // 查找values中头部的最大公共字符串
    if (values.length === 0) return '';
    if (values.length === 1) return values[0];
    let head = values[0].substring(0, start);
    let index = start;
    while (true) {
        const v = values[0][index];
        if (!v) return head;

        for (let i = 1; i < values.length; i++) {
            if (values[i][index] !== v) {
                return head;
            }
        }
        head += v;
        index ++;
    }
}

export function randomId (head = '') {
    return `${head}${Date.now().toString().substring(5)}-${Math.random().toString(16).substring(2)}`;
}

export function withResolve<T = any, Err = any> () {
    let resolve!: (data?: T) => void;
    let reject!: (Err?: Err) => void;
    const ready = new Promise<T>((res, rej) => {
        // @ts-ignore
        resolve = res;
        reject = rej;
    });
    return {ready, resolve, reject};
}