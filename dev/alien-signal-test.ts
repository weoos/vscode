/*
 * @Author: chenzhongsheng
 * @Date: 2024-12-13 11:09:56
 * @Description: Coding something
 */
import {signal, computed, effect} from 'alien-signals';

const count = signal(1);
const doubleCount = computed(() => count.get() * 2);

const ef = effect(() => {
    console.log(`Count is: ${count.get()}`);
}); // Console: Count is: 1
ef.stop();

console.log(doubleCount.get()); // 2

// count.set(2); // Console: Count is: 2

console.log(doubleCount.get()); // 4

window.count = count;


// const list = signal([{person: 'John'}, {person: 'Jane'}]);
// const aa = computed(() => list.get());

// list.get().push({person: 'Bob'});

// console.log(aa.get());

// count.