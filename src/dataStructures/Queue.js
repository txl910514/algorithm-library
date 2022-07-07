/* 
* 基础队列结构
 */
const QueueMap = new WeakMap();
class Queue {
    constructor() {
        QueueMap.set(this, {
            count: 0,
            lowestCount: 0,
            items: {}
        })
    }
    // 队列尾部添加元素
    enqueue(element) {
        const QueueMapObj = QueueMap.get(this);
        QueueMapObj.items[QueueMapObj.count] = element;
        QueueMapObj.count++;
    }
    // 移除队列第一项
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const QueueMapObj = QueueMap.get(this);
        const result = QueueMapObj.items[QueueMapObj.lowestCount]; // {1}
        delete QueueMapObj.items[QueueMapObj.lowestCount]; // {2}
        QueueMapObj.lowestCount++; // {3}
        return result;
    }
    // 返回队列第一项
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.items[QueueMapObj.lowestCount];
    }
    // 判断队列是否为空
    isEmpty() {
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.count - QueueMapObj.lowestCount === 0;
    }
    // 判断队列大小
    size() {
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.count - QueueMapObj.lowestCount;
    }
    // 清除队列
    clear() {
        const QueueMapObj = QueueMap.get(this);
        QueueMapObj.items = {};
        QueueMapObj.count = 0;
        QueueMapObj.lowestCount = 0;
    }
     // toString
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const QueueMapObj = QueueMap.get(this);
        let objString = `${QueueMapObj.items[QueueMapObj.lowestCount]}`;
        for (let i = QueueMapObj.lowestCount + 1; i < QueueMapObj.count; i++) {
            objString = `${objString},${QueueMapObj.items[i]}`;
        }
        return objString;
    }
}

export {
    QueueMap,
    Queue
};