
/* 
* 双向链表
*/
import { defaultEquals } from '../util';
import LinkedList from './linkedList';
import { DoublyNode } from './models/linked-list-models';


export default class DoublyLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
      super(equalsFn);
      this.tail = undefined;
    }
    //尾部添加元素
    push(element) {
      const node = new DoublyNode(element);
      if (this.head == null) {
        this.head = node;
        this.tail = node; // NEW
      } else {
        // attach to the tail node // NEW
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
      }
      this.count++;
    }
    // 特定位置插入元素
    insert(element, index) {
      if (index >= 0 && index <= this.count) {
        const node = new DoublyNode(element);
        let current = this.head;
        if (index === 0) {
          if (this.head == null) { // NEW
            this.head = node;
            this.tail = node; // NEW
          } else {
            node.next = this.head;
            this.head.prev = node; // NEW
            this.head = node;
          }
        } else if (index === this.count) { // last item NEW
          current = this.tail;
          current.next = node;
          node.prev = current;
          this.tail = node;
        } else {
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          node.next = current;
          previous.next = node;
          current.prev = node; // NEW
          node.prev = previous; // NEW
        }
        this.count++;
        return true;
      }
      return false;
    }
    // 从任意位置移除元素
    removeAt(index) {
      if (index >= 0 && index < this.count) {
        let current = this.head;
        if (index === 0) {
          this.head = this.head.next;
          // if there is only one item, then we update tail as well //NEW
          if (this.count === 1) {
            // {2}
            this.tail = undefined;
          } else {
            this.head.prev = undefined;
          }
        } else if (index === this.count - 1) {
          // last item //NEW
          current = this.tail;
          this.tail = current.prev;
          this.tail.next = undefined;
        } else {
          current = this.getElementAt(index);
          const previous = current.prev;
          // link previous with current's next - skip it to remove
          previous.next = current.next;
          current.next.prev = previous; // NEW
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }
    // 返回元素在链表的索引
    indexOf(element) {
      let current = this.head;
      let index = 0;
      while (current != null) {
        if (this.equalsFn(element, current.element)) {
          return index;
        }
        index++;
        current = current.next;
      }
      return -1;
    }
    // 获取第一个元素
    getHead() {
      return this.head;
    }
    // 获取最后一个元素
    getTail() {
      return this.tail;
    }
    //清除链表
    clear() {
      super.clear();
      this.tail = undefined;
    }
    // 字符串化
    toString() {
      if (this.head == null) {
        return '';
      }
      let objString = `${this.head.element}`;
      let current = this.head.next;
      while (current != null) {
        objString = `${objString},${current.element}`;
        current = current.next;
      }
      return objString;
    }
    // 尾部字符串化
    inverseToString() {
      if (this.tail == null) {
        return '';
      }
      let objString = `${this.tail.element}`;
      let previous = this.tail.prev;
      while (previous != null) {
        objString = `${objString},${previous.element}`;
        previous = previous.prev;
      }
      return objString;
    }
  }