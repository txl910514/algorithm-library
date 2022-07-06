/* 
*  栈结构
*/

const StackMap = new WeakMap();
class Stack {
    constructor () {
        StackMap.set(this, {
            count: 0,
            items: {}

        });
    }
    // 插入元素
    push(element) {
        const stackMapObj = StackMap.get(this);
        stackMapObj.items[stackMapObj.count] = element; 
        stackMapObj.count++;
    }
    // 弹出元素
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        const stackMapObj = StackMap.get(this)
        stackMapObj.count--;
        const result = stackMapObj.items[this.count];
        delete stackMapObj.items[stackMapObj.count];
        return result;
    }
    // 查看栈顶的值
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        const stackMapObj = StackMap.get(this);
        return stackMapObj.items[stackMapObj.count - 1]
    }
    // 判断是否为空
    isEmpty() {
        const stackMapObj = StackMap.get(this);
        return stackMapObj.count === 0;
    }
    // 清空方法
    clear() {
        const stackMapObj = StackMap.get(this);
        stackMapObj.items = {};
        stackMapObj.count = 0;
    }
    // 栈的大小
    size() {
        const stackMapObj = StackMap.get(this);
        return stackMapObj.count;
    }
    // toString方法
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        const stackMapObj = StackMap.get(this);
        let objString = `${stackMapObj.items[0]}`; // {1}
        for (let i = 1; i < stackMapObj.count; i++) { // {2}
            objString = `${objString},${stackMapObj.items[i]}`; // {3}
        }
        return objString;
    }
}

export default Stack;