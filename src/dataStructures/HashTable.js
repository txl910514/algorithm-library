/* 
* 散列表
 */

import { defaultToString } from '../util';
import { ValuePair } from './models/value-pair';

export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
    this.barrel = 37
  }
  // 扩充桶 添加元素之前做判断
  expansionBucket () {
            const newTable = {}
            const hashkeys = this.keys()
            this.barrel *= 2
            hashkeys.forEach(item => {
            this.table[item] = 1
            this.#putFunc(this.table[item].key, this.table[item].value, newTable)
            })
  }
  #putFunc (key,value ,table) {
    
  }
  // 散列函数
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % this.barrel;
  }
  // 散列函数-社区实现
  /* djb2HashCode(key) {
    const tableKey = this.toStrFn(key);
    let hash = 5381;
    for (let i = 0; i < tableKey.length; i++) {
      hash = (hash * 33) + tableKey.charCodeAt(i);
    }
    return hash % 1013;
  } */
  // 散列函数
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
    // 向散列表增加一个新的项
  put(key, value) {
    // 负载因子大于0.75 桶长度扩展两倍
    // if (this.getLoadFactor() > 0.75) {
    //   this.expansionBucket()
    // }
    if (key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
    //根据键值检索值
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
    // 根据键值从散列表移除值
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if (valuePair != null) {
      delete this.table[hash];
      return true;
    }
    return false;
  }
  // 获取全部散列表
  getTable() {
    return this.table;
  }
  // 判断散列表是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 散列表的大小
  size() {
    return Object.keys(this.table).length;
  }
  // 清除散列表
  clear() {
    this.table = {};
  }
  // 负载因子 散列个数/桶的长度
  getLoadFactor () {
    return 0
    // return this.keys().length / this.barrel
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
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    return objString;
  }
}
