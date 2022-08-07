# algorithm-library
前端算法库

```javascript
import * as AlgorithmLibrary from "@donglian/algorithm_library"
```
### 数据结构
* 栈

```javascript
 var stack = new AlgorithmLibrary.dataStructures.Stack();
 stack.push(1); //添加一个元素
 stack.pop(); // 移除栈顶元素
 stack.peek(); // 返回栈顶的元素
 stack.isEmpty(); // 判断是否为空
 stack.clear(); // 清空栈
 stack.size(); // 栈的元素个数
 stack.toString(); // 字符串化
```

* 队列

```javascript
 var queue = new AlgorithmLibrary.dataStructures.Queue();
 queue.enqueue(1); // 队列尾部添加元素
 queue.dequeue(); // 移除队列第一项
 queue.peek(); // 返回队列第一项
 queue.isEmpty(); // 判断是否为空
 queue.clear(); // 清空队列
 queue.size(); // 队列的元素个数
 queue.toString(); // 字符串化
```

* 双端队列

```javascript
 var deque = new AlgorithmLibrary.dataStructures.Deque();
 deque.addFront(1); // 双端队列前端添加元素
 deque.addBack(); // 双端队列后端添加元素
 deque.removeFront(); // 前端移除第一个元素
 deque.removeBack(); // 后端移除第一个元素
 deque.peekFront(); // 返回前端第一个元素
 deque.peekBack(); // 返回后端第一个元素
 deque.size(); // 双端队列的元素个数
 deque.clear(); // 清空双端队列
 deque.isEmpty(); // 判断是否为空
 deque.toString(); // 字符串化
```

### 算法

* 击鼓传花

```javascript
new AlgorithmLibrary.algorithms.hotPotato(elementsList, num);
// elementsList 列表  num 开始位置
```

* 回文检查器 

```javascript
new AlgorithmLibrary.algorithms.palindromeChecker(aString);
// aString 列表  字符串
```