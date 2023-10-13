/* 
* 散列表-分离链接
 */

import { defaultToString } from '../util';
import LinkedList from './linkedList';
import { ValuePair } from './models/value-pair';

export default class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
    this.barrel = 37
  }
  // 散列函数
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key % this.barrel;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  // 散列函数
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  // 向散列表增加一个新的项
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      if (this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }
  //根据键值检索值
  get(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          return current.element.value;
        }
        current = current.next;
      }
    }
    return undefined;
  }
  // 根据键值从散列表移除值
  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while (current != null) {
        if (current.element.key === key) {
          linkedList.remove(current.element);
          if (linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
  // 判断是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 判断散列表大小
  size() {
    let count = 0;
    Object.values(this.table).forEach(linkedList => {
      count += linkedList.size();
    });
    return count;
  }
  // 清除散列表
  clear() {
    this.table = {};
  }
   // 获取全部散列表
  getTable() {
    return this.table;
  }
    // 负载因子
    getLoadFactor () {
      return this.keys().length / this.barrel
    }
    keys () {
      return this.getTable().keys()
    }
  // 字符串化
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`;
    }
    return objString;
  }
}
