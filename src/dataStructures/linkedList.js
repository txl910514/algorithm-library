/* 
* 链表
*/
import { Node } from './models/linked-list-models';
import { defaultEquals } from '../util';
class LinkedList {
    constructor(equalsFn = defaultEquals) {
        this.equalsFn = equalsFn;
        this.count = 0;
        this.head = undefined;
      }
      //尾部添加元素
      push(element) {
        const node = new Node(element);
        let current;
        if (this.head == null) {
          // catches null && undefined
          this.head = node;
        } else {
          current = this.head;
          while (current.next != null) {
            current = current.next;
          }
          current.next = node;
        }
        this.count++;
      }
      // 返回特定位置的元素
      getElementAt(index) {
        if (index >= 0 && index <= this.count) {
          let node = this.head;
          for (let i = 0; i < index && node != null; i++) {
            node = node.next;
          }
          return node;
        }
        return undefined;
      }
      // 特定位置添加元素
      insert(element, index) {
        if (index >= 0 && index <= this.count) {
          const node = new Node(element);
          if (index === 0) {
            const current = this.head;
            node.next = current;
            this.head = node;
          } else {
            const previous = this.getElementAt(index - 1);
            node.next = previous.next;
            previous.next = node;
          }
          this.count++;
          return true;
        }
        return false;
      }
      // 从特定位置移除元素
      removeAt(index) {
        if (index >= 0 && index < this.count) {
          let current = this.head;
          if (index === 0) {
            this.head = current.next;
          } else {
            const previous = this.getElementAt(index - 1);
            current = previous.next;
            previous.next = current.next;
          }
          this.count--;
          return current.element;
        }
        return undefined;
      }
      // 从链表中移除一个元素
      remove(element) {
        const index = this.indexOf(element);
        return this.removeAt(index);
      }
      // 返回元素在链表的索引
      indexOf(element) {
        let current = this.head;
        for (let i = 0; i < this.size() && current != null; i++) {
          if (this.equalsFn(element, current.element)) {
            return i;
          }
          current = current.next;
        }
        return -1;
      }
      // 判断链表是否为空
      isEmpty() {
        return this.size() === 0;
      }
      // 判断链表长度
      size() {
        return this.count;
      }
      // 获取链表的第一个元素
      getHead() {
        return this.head;
      }
      // 清除链表
      clear() {
        this.head = undefined;
        this.count = 0;
      }
      // 字符串化
      toString() {
        if (this.head == null) {
          return '';
        }
        let objString = `${this.head.element}`;
        let current = this.head.next;
        for (let i = 1; i < this.size() && current != null; i++) {
          objString = `${objString},${current.element}`;
          current = current.next;
        }
        return objString;
      }
}

export default LinkedList;