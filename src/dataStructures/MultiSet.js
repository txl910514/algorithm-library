/* 
* 多重集合
 */
import LinkedList from './linkedList';
class MultiSet {
    constructor() {
        this.items = new LinkedList();
      }
      // 向集合添加新元素
      add(element) {
        this.items.push(element);
      }
      // 从集合移除一个元素
      delete(element) {
        if (this.has(element)) {
          this.items.remove(element)
          return true;
        }
        return false;
      }
      // 判断集合中是否有此元素
      has(element) {
        return this.items.indexOf(element)> -1;
      }
      // 返回包含所有值的数组
      values() {
        return this.items.toString().split(',')
      }
      // 集合运算并集
      union(otherSet) {
        const unionSet = new Set();
        this.values().forEach(value => unionSet.add(value));
        otherSet.values().forEach(value => unionSet.add(value));
        return unionSet;
      }
      // 集合运算交集
      intersection(otherSet) {
        const intersectionSet = new Set();
        const values = this.values();
        const otherValues = otherSet.values();
        let biggerSet = values;
        let smallerSet = otherValues;
        if (otherValues.length - values.length > 0) {
          biggerSet = otherValues;
          smallerSet = values;
        }
        smallerSet.forEach(value => {
          if (biggerSet.includes(value)) {
            intersectionSet.add(value);
          }
        });
        return intersectionSet;
      }
      // 集合运算差集
      difference(otherSet) {
        const differenceSet = new Set();
        this.values().forEach(value => {
          if (!otherSet.has(value)) {
            differenceSet.add(value);
          }
        });
        return differenceSet;
      }
      // 集合运算子集
      isSubsetOf(otherSet) {
        if (this.size() > otherSet.size()) {
          return false;
        }
        let isSubset = true;
        this.values().every(value => {
          if (!otherSet.has(value)) {
            isSubset = false;
            return false;
          }
          return true;
        });
        return isSubset;
      }
      // 判断集合是否为空
      isEmpty() {
        return this.size() === 0;
      }
      // 集合中的数量
      size() {
        return this.items.size();
      }
      //移除集合中的所有元素
      clear() {
        this.items = new LinkedList();
      }
      //字符串化
      toString() {
        if (this.isEmpty()) {
          return '';
        }
        const values = this.values();
        let objString = `${values[0]}`;
        for (let i = 1; i < values.length; i++) {
          objString = `${objString},${values[i].toString()}`;
        }
        return objString;
      }
}

export default MultiSet

/**
 * 
 * 多重集合是一种允许元素重复的集合，它的底层实现可以使用各种数据结构。以下是几种常见的底层实现方式：

数组或列表：

使用数组或列表来存储多重集合中的元素。
允许元素重复出现，可以按照添加的顺序进行存储。
在插入和删除操作时，需要遍历数组或列表进行查找和更新。
链表：

使用链表来存储多重集合中的元素。
允许元素重复出现，可以按照添加的顺序进行存储。
在插入和删除操作时，可以更高效地调整链表指针，但需要遍历链表进行查找。
哈希表：

使用哈希表作为底层数据结构，其中元素被哈希函数映射到数组的索引位置。
每个哈希表槽点可以存储多个元素，通常使用链表或红黑树来解决哈希冲突。
在插入、删除和查找操作中，根据元素的哈希值找到对应的槽点，在槽点内遍历查找或更新。
平衡搜索树（如红黑树、AVL树等）：

使用平衡搜索树来存储多重集合中的元素。
元素按照大小关系进行排序，允许元素重复出现。
在插入、删除和查找操作中，根据元素的大小关系进行操作。
根据具体的需求和性能要求，选择合适的底层实现方式。例如，如果需要快速插入和删除操作，并且不要求元素有序，可以选择数组或链表。如果需要快速的查找和高效的哈希冲突解决方案，可以选择哈希表。如果需要有序存储和快速的查找操作，可以选择平衡搜索树。
 */