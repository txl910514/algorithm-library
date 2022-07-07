/* 
* 双端队列
*/
import {Queue, QueueMap } from "./Queue";
class Deque extends Queue {
    constructor() {
        super()
    }
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
    addBack (element) {
        super.enqueue(element);
    }
    removeFront () {
        return super.dequeue();
    }
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
    peekFront () {
      return  super.peek();
    }
    peekBack () {
        if (this.isEmpty()) {
            return undefined;
        }
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.items[QueueMapObj.count - 1] 
    }
    size () {
        return super.size();
    }
    clear () {
        super.clear();
    }
    isEmpty () {
       return super.isEmpty(); 
    }
    toString () {
        return super.toString();
    }
}

export default Deque;