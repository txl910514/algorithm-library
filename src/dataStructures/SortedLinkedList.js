/* 
* 有序链表
*/
import { Compare, defaultCompare,defaultEquals } from '../util';
import LinkedList from './linkedList';

class SortedLinkedList extends LinkedList {
    constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
      super(equalsFn);
      this.equalsFn = equalsFn;
      this.compareFn = compareFn;
    }
    // 尾部插入元素
    push(element) {
      if (this.isEmpty()) {
        super.push(element);
      } else {
        const index = this.getIndexNextSortedElement(element);
        super.insert(element, index);
      }
    }
    // 根据元素大小顺序插入元素
    insert(element, index = 0) {
      if (this.isEmpty()) {
        return super.insert(element, index === 0 ? index : 0);
      }
      const pos = this.getIndexNextSortedElement(element);
      return super.insert(element, pos);
    }
    // 根据数据大小获取插入的位置
    getIndexNextSortedElement(element) {
      let current = this.head;
      let i = 0;
      for (; i < this.size() && current; i++) {
        const comp = this.compareFn(element, current.element);
        if (comp === Compare.LESS_THAN) {
          return i;
        }
        current = current.next;
      }
      return i;
    }
  }

  export default SortedLinkedList