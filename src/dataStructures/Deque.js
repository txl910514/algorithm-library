/* 
* 双端队列
*/
import {Queue, QueueMap } from "./Queue";
class Deque extends Queue {
    constructor() {
        super()
    }

    // 前端添加新的元素
    addFront (element) {
        const QueueMapObj = QueueMap.get(this);
        if (this.isEmpty()) {
            this.addBack(element);
          } else if (QueueMapObj.lowestCount > 0) {
            QueueMapObj.lowestCount--;
            QueueMapObj.items[QueueMapObj.lowestCount] = element;
          } else {
            for (let i = QueueMapObj.count; i > 0; i--) {
                QueueMapObj.items[i] = QueueMapObj.items[i - 1];
            }
            QueueMapObj.count++;
            QueueMapObj.items[0] = element;
          }
    }
    // 后端添加新元素
    addBack (element) {
        super.enqueue(element);
    }
    // 前端移除元素
    removeFront () {
        return super.dequeue();
    }
    // 后端移除元素
    removeBack() {
        if (this.isEmpty()) {
            return undefined;
          }
          const QueueMapObj = QueueMap.get(this);
          QueueMapObj.count--;
          const result = QueueMapObj.items[QueueMapObj.count];
          delete QueueMapObj.items[QueueMapObj.count];
          return result;
    }
    // 返回前端元素
    peekFront () {
      return  super.peek();
    }
    // 返回后端元素
    peekBack () {
        if (this.isEmpty()) {
            return undefined;
        }
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.items[QueueMapObj.count - 1] 
    }
    // 返回队列长度
    size () {
        return super.size();
    }
    // 清除队列
    clear () {
        super.clear();
    }
    // 判断队列是否为空
    isEmpty () {
       return super.isEmpty(); 
    }
    // 字符串化
    toString () {
        return super.toString();
    }
}

export default Deque;