// 击鼓传花算法
import { Queue } from "../dataStructures/Queue";
import Deque from "../dataStructures/Deque";
export const hotPotato = (elementsList, num) => {
    const queue = new Queue();
    const elimitatedList = [];
    for (let i = 0; i < elementsList.length; i++) {
        queue.enqueue(elementsList[i]);
    }
    while (queue.size() > 1) {
        for (let i = 0; i < num; i++) {
            queue.enqueue(queue.dequeue()); // {3}
        }
        elimitatedList.push(queue.dequeue()); // {4}
    }
    return {
        eliminated: elimitatedList,
        winner: queue.dequeue() // {5}
    };
}

// 回文检查器
export const palindromeChecker = (aString) => {
    if (aString === undefined || aString === null ||
        (aString !== null && aString.length === 0)) { // {1}
        return false;
    }
    const deque = new Deque(); // {2}
    const lowerString = aString.toLocaleLowerCase().split(' ').join(''); // {3} let isEqual = true;
    let firstChar, lastChar;
    for (let i = 0; i < lowerString.length; i++) { // {4}
        deque.addBack(lowerString.charAt(i));
    }
    while (deque.size() > 1 && isEqual) { // {5}
        firstChar = deque.removeFront(); // {6}
        lastChar = deque.removeBack(); // {7}
        if (firstChar !== lastChar) {
            isEqual = false; // {8}
        }
    }
    return isEqual;
}