/* 
* 循环链表
*/
import { Node } from './models/linked-list-models';
import { defaultEquals } from '../util';
import LinkedList from './linkedList';

 class CircularLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals) {
      super(equalsFn);
    }
    // 尾部添加元素
    push(element) {
      const node = new Node(element);
      let current;
      if (this.head == null) {
        this.head = node;
      } else {
        current = this.getElementAt(this.size() - 1);
        current.next = node;
      }
      // set node.next to head - to have circular list
      node.next = this.head;
      this.count++;
    }
    // 特定位置添加元素
    insert(element, index) {
      if (index >= 0 && index <= this.count) {
        const node = new Node(element);
        let current = this.head;
        if (index === 0) {
          if (this.head == null) {
            // if no node  in list
            this.head = node;
            node.next = this.head;
          } else {
            node.next = current;
            current = this.getElementAt(this.size());
            // update last element
            this.head = node;
            current.next = this.head;
          }
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

    // 移除特定位置的元素
    removeAt(index) {
      if (index >= 0 && index < this.count) {
        let current = this.head;
        if (index === 0) {
          if (this.size() === 1) {
            this.head = undefined;
          } else {
            const removed = this.head;
            current = this.getElementAt(this.size() - 1);
            this.head = this.head.next;
            current.next = this.head;
            current = removed;
          }
        } else {
          // no need to update last element for circular list
          const previous = this.getElementAt(index - 1);
          current = previous.next;
          previous.next = current.next;
        }
        this.count--;
        return current.element;
      }
      return undefined;
    }
  }

  export default CircularLinkedList