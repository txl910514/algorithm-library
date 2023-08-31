// 击鼓传花算法
import { Queue } from "../dataStructures/Queue";
import Deque from "../dataStructures/Deque";
import Stack from '../dataStructures/Stack'
import {hanoiStack, hanoi} from './hanoi'

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

// 十进制转二进制 


export function decimalToBinary(decNumber) {
  const remStack = new Stack();
  let number = decNumber;
  let rem;
  let binaryString = '';

  while (number > 0) {
    rem = Math.floor(number % 2);
    remStack.push(rem);
    number = Math.floor(number / 2);
  }

  while (!remStack.isEmpty()) {
    binaryString += remStack.pop().toString();
  }

  return binaryString;
}


//  进制转换算法

export function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let number = decNumber;
  let rem;
  let baseString = '';

  if (!(base >= 2 && base <= 36)) {
    return '';
  }

  while (number > 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }

  return baseString;
}

// 平衡圆括号算法
export function parenthesesChecker(symbols) {
    const stack = new Stack();
    const opens = '([{';
    const closers = ')]}';
    let balanced = true;
    let index = 0;
    let symbol;
    let top;
  
    while (index < symbols.length && balanced) {
      symbol = symbols[index];
      if (opens.indexOf(symbol) >= 0) {
        stack.push(symbol);
      } else if (stack.isEmpty()) {
        balanced = false;
      } else {
        top = stack.pop();
        if (!(opens.indexOf(top) === closers.indexOf(symbol))) {
          balanced = false;
        }
      }
      index++;
    }
    return balanced && stack.isEmpty();
  }