const QueueMap = new WeakMap();
class Queue {
    constructor() {
        QueueMap.set(this, {
            count: 0,
            lowestCount: 0,
            items: {}
        })
    }
    enqueue(element) {
        const QueueMapObj = QueueMap.get(this);
        QueueMapObj.items[QueueMapObj.count] = element;
        QueueMapObj.count++;
    }
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
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.items[QueueMapObj.lowestCount];
    }
    isEmpty() {
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.count - QueueMapObj.lowestCount === 0;
    }
    size() {
        const QueueMapObj = QueueMap.get(this);
        return QueueMapObj.count - QueueMapObj.lowestCount;
    }
    clear() {
        const QueueMapObj = QueueMap.get(this);
        QueueMapObj.items = {};
        QueueMapObj.count = 0;
        QueueMapObj.lowestCount = 0;
    }
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

export default Queue;