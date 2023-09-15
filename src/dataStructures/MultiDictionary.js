/* 
* 字典
 */
import { defaultToString } from '../util';
import { ValuePair } from './models/value-pair';
import HashTable from './HashTable'
import LinkedList from './linkedList';
export default class MultiDictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = new HashTable();
  }
  // 向字典添加新元素
  set(key, value) {
    if (key != null && value != null) {
      const linkedListKey = this.table.get(key)
      if (linkedListKey) {
        linkedListKey.push(value)
      } else {
        const linkedList = new LinkedList()
        this.table.put(key, linkedList)
        linkedList.push(value)
      }
      return true;
    }
    return false;
  }
  //查找特定键值的数值
  get(key) {
    const valuePair = this.table.get(key);
    return valuePair == null ? undefined : valuePair.toString().split(',');
  }
    // 判断字典中是否有此键值
  hasKey(key) {
    return this.table.get(key) != null;
  }
  // 移除字典值
  remove(key) {
    if (this.hasKey(key)) {
      this.table.remove(key)
      return true;
    }
    return false;
  }
  // 以数组返回数据值
  values() {
    return this.keyValues().map(valuePair => valuePair.value.toString().split(','));
  }
  // 以数组返回键值
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  // 将字典中的所有【键-值】返回
  keyValues() {
    const getTable = this.table.getTable()
    return Object.values(getTable);
  }
  // 迭代字典中的所有键值对
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  // 判断是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 字典的大小
  size() {
    return this.table.size();
  }
  // 清除字典
  clear() {
    this.table = new HashTable();
  }
  // 字符串化
  toString() {
    return this.table.toString()
  }
}

/**
 * 
 * 多重映射是一种允许键和值都可以重复的数据结构。它可以使用各种底层实现方式，下面介绍几种常见的实现方式：

哈希表和链表：

使用哈希表作为底层数据结构，其中键被哈希函数映射到数组的索引位置。
每个哈希表槽点中存储的是一个链表，存储了相同哈希值的键值对。
在插入操作时，根据键的哈希值找到对应的槽点，在槽点内遍历链表进行查找和更新。
这种实现方式适用于需要快速的插入、查找和删除操作。
平衡搜索树（如红黑树、AVL树等）：

使用平衡搜索树来实现多重映射，其中键值对按照键的大小进行排序。
允许键和值都重复出现，可以根据键的大小关系进行插入、查找和删除操作。
这种实现方式适用于需要有序存储和快速的插入、查找和删除操作。
数组或列表：

使用数组或列表来存储多重映射的键值对。
每个键值对包括键和值，可以重复出现。
在插入和查找操作时，需要遍历数组或列表进行查找和更新。
这种实现方式适用于数据规模较小的情况，插入和查找操作的时间复杂度较高

需要根据具体的需求和性能要求选择最合适的底层实现方式。如果需要快速的插入、查找和删除操作，则哈希表和链表是一个不错的选择。如果需要有序存储和对键进行范围查询的操作，则平衡搜索树是一个不错的选择。如果数据规模较小且简单，可以考虑使用数组或列表来实现多重映射
 */
