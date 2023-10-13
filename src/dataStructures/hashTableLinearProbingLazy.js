/* 
* 散列表-线性探查-软删除(惰性删除)
 */

import { defaultToString } from '../util';
import { ValuePairLazy } from './models/value-pair-lazy';

export default class HashTableLinearProbingLazy {
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
      if (
        this.table[position] == null ||
        (this.table[position] != null && this.table[position].isDeleted)
      ) {
        this.table[position] = new ValuePairLazy(key, value);
      } else {
        let index = position + 1;
        while (this.table[index] != null && !this.table[position].isDeleted) {
          index++;
        }
        this.table[index] = new ValuePairLazy(key, value);
      }
      return true;
    }
    return false;
  }
  //根据键值检索值
  get(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].value;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined;
        }
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        return this.table[position].value;
      }
    }
    return undefined;
  }
  // 根据键值从散列表移除值
  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true;
        return true;
      }
      let index = position + 1;
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++;
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true;
        return true;
      }
    }
    return false;
  }
  // 判断散列表是否为空
  isEmpty() {
    return this.size() === 0;
  }
   // 判断散列表大小
  size() {
    let count = 0;
    Object.values(this.table).forEach(valuePair => {
      count += valuePair.isDeleted === true ? 0 : 1;
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
