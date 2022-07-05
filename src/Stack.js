
class Stack {
    #items = {}; // 存储栈的对象
    #count = 0; // 栈的长度
    // 插入元素
    push(element) {
        this.items[this.count] = element; 
        this.count++;
    }
    // 弹出元素
    pop() {
        if (this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶的值
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.count - 1]
    }
    // 判断是否为空
    isEmpty() {
        return this.count === 0;
    }
    // 清空方法
    clear() {
        this.items = {};
        this.count = 0;
    }
    // 栈的大小
    size() {
        return this.count;
    }
    // toString方法
    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[0]}`; // {1}
        for (let i = 1; i < this.count; i++) { // {2}
            objString = `${objString},${this.items[i]}`; // {3}
        }
        return objString;
    }
}

export default Stack;