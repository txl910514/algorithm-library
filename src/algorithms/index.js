// 击鼓传花算法
import { Queue } from "../dataStructures/Queue";
import Deque from "../dataStructures/Deque";
import Stack from '../dataStructures/Stack'
import {hanoiStack, hanoi} from './hanoi'
import Set from '../dataStructures/Set'

// 击鼓传花
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

// // 判断映射关系是否为单射
// export function isInjective0(mapping) {
//   const valueSet = new Set();
  
//   for (const value of Object.values(mapping)) {
//     if (valueSet.has(value)) {
//       return false; // 存在多个键映射到同一个值
//     }
//     valueSet.add(value);
//   }

//   return true;
// }
// 判断映射关系是否为单射
/*
当我们判断一个映射关系是否为单射时，通常需要检查输入域中的每个元素是否至多有一个对应的输出元素。也就是说，对于任意两个不同的输入元素，它们不能映射到相同的输出元素。
在这段代码中，我们定义了一个名为 isInjective 的函数，用于判断给定的映射关系是否为单射。该函数接受两个参数：

mapping 表示映射关系，采用 JavaScript 对象的格式。
inputSet 表示输入集合，可以是任意可迭代类型的集合。
在函数体内部，我们首先通过 Object.values(mapping) 获取映射对象 mapping 中的所有输出元素，并使用 new Set() 方法将其转换为一个去重的输出集合 outputSet。

然后，我们遍历输入集合中的每个元素 x，并对于每个元素检查是否至多有一个对应的输出元素。具体地，我们使用 Object.values(mapping).filter((y) => y === mapping[x]) 这段代码来筛选出所有与当前输入元素 x 对应的输出元素，并获取其数量。如果数量大于 1，说明存在两个不同的输入元素映射到了相同的输出元素，这违反了单射的定义，因此整个映射不是单射。

最后，如果没有发现上述情况，即对于每个输入元素都至多有一个对应的输出元素，那么整个映射就是单射的，函数返回 true。

需要注意的是，这个示例代码假设输入集合和映射关系都是完全定义的，且不为空。在实际使用中，你可能需要根据具体情况进行适当的错误处理和参数验证。
*/
export function isInjective(mapping, inputSet) {
  const outputSet = new Set(Object.values(mapping));

  // 对于输入集合中的每个元素，检查是否至多有一个对应的输出元素
  for (const x of inputSet) {
    const count = Object.values(mapping).filter((y) => y === mapping[x]).length;
    if (count > 1) {
      return false;
    }
  }

  return true;
}

// 判断映射关系是否为满射
/*
满射（Surjective）是另一种常见的映射关系，它要求对于输出域中的每个元素，都至少有一个输入元素与之对应。换句话说，输出域的每个元素都可以由输入域中的一个或多个元素映射而来。

在编程中，判断一个给定的映射关系是否为满射，通常需要检查输出集合中的每个元素是否至少有一个对应的输入元素。如果对于所有的输出元素都存在至少一个对应的输入元素，那么这个映射关系就是满射。
在这段代码中，我们定义了一个名为 isSurjective 的函数，用于判断给定的映射关系是否为满射。该函数接受三个参数：

mapping 表示映射关系，采用 JavaScript 对象的格式。
inputSet 表示输入集合，可以是任意可迭代类型的集合。
outputSet 表示输出集合，同样可以是任意可迭代类型的集合。
在函数体内部，我们遍历输出集合中的每个元素 y，并对于每个元素检查其是否至少有一个对应的输入元素。具体地，我们使用 mapping[x] 来获取映射对象 mapping 中键 x 所对应的值，并将其与当前输出元素 y 进行比较。如果存在某个键 x，使得 mapping[x] === y，那么说明当前输出元素 y 至少有一个对应的输入元素。如果对于所有输出元素都存在至少一个对应的输入元素，那么整个映射就是满射的。

请注意，这只是一个简单的示例实现，假设输入和输出集合都不为空，且映射关系是完全定义的。在实际使用中，你可能需要根据具体情况进行适当的错误处理和参数验证。
*/
export function isSurjective(mapping, inputSet, outputSet) {
  // 对于输出集合中的每个元素，检查是否至少有一个对应的输入元素
  for (const y of outputSet) {
    let found = false;
    for (const x of inputSet) {
      if (mapping[x] === y) {
        found = true;
        break;
      }
    }
    if (!found) {
      return false;
    }
  }
  return true;
}
// 判断映射关系是否为双射
/*
当我们判断一个映射关系是否为双射时，通常需要检查输入域中的每个元素都有且仅有一个对应的输出元素，并且所有输出元素都可以找到唯一对应的输入元素。也就是说，这个映射关系同时满足单射和满射的条件。
在这段代码中，我们定义了三个函数。isBijective 函数使用了另外两个函数 isInjective 和 isSurjective 来分别检查映射关系是否为单射和满射。如果两个条件都满足，那么整个映射就是双射的。

具体来说，isInjective 函数的实现与之前提到的代码示例类似。它首先获取映射对象 mapping 中所有的输出元素，然后遍历输入集合中的每个元素 x，对于每个元素检查是否至多有一个对应的输出元素。如果出现了多对一的情况，就说明不是单射，函数返回 false。如果对于每个输入元素都至多有一个对应的输出元素，那么就返回 true。

isSurjective 函数则是检查映射关系是否为满射的。对于输出集合中的每个元素 y，它遍历输入集合中的每个元素 x，检查是否存在某个输入元素 x，使得它对应的输出元素恰好是当前的 y。如果不存在这样的元素，说明并不是满射，函数返回 false。否则，返回 true。

需要注意的是，这个示例代码假设输入集合和映射关系都是完全定义的，且不为空。在实际使用中，你可能需要根据具体情况进行适当的错误处理和参数验证
*/
export function isBijective(mapping, inputSet, outputSet) {
  if (!isInjective(mapping, inputSet)) {
    return false;
  }
  if (!isSurjective(mapping, inputSet, outputSet)) {
    return false;
  }
  return true;
}

// 复合映射
/*
复合映射（Composition Mapping）是指将两个或多个映射依次进行组合，形成一个新的映射。在实现上，可以通过对输入集合中的每个元素应用一系列的映射来得到最终的输出
在这段代码中，我们定义了一个名为 composeMappings 的函数，它接受两个参数：

mappings 是一个包含多个映射的数组，每个映射都是一个 JavaScript 对象。
inputSet 表示输入集合，可以是任意可迭代类型的集合。
在函数体内部，我们首先初始化 currentSet 变量为输入集合。

然后，我们依次遍历 mappings 数组中的每个映射对象 mapping。对于每个映射对象，我们创建一个新的空集合 newSet。

然后，我们遍历当前集合 currentSet 中的每个元素 x，检查是否在当前映射对象 mapping 中存在对应的映射关系。如果存在，我们将对应的输出元素添加到 newSet 中。

最后，我们将 newSet 赋值给 currentSet，进入下一次循环。

当循环结束后，currentSet 中就保存了通过复合映射得到的最终结果。

需要注意的是，这个示例代码假设输入集合和映射关系都是完全定义的，且不为空。在实际使用中，你可能需要根据具体情况进行适当的错误处理和参数验证
*/
export function composeMappings(mappings, inputSet) {
  let currentSet = new Set(inputSet);

  // 依次应用每个映射到当前集合
  for (const mapping of mappings) {
    const newSet = new Set();
    for (const x of currentSet) {
      if (mapping.hasOwnProperty(x)) {
        newSet.add(mapping[x]);
      }
    }
    currentSet = newSet;
  }

  return currentSet;
}
