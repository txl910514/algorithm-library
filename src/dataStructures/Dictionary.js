/* 
* 字典
 */
import { defaultToString } from '../util';
import { ValuePair } from './models/value-pair';

export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  // 向字典添加新元素
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  //查找特定键值的数值
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
    // 判断字典中是否有此键值
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  // 移除字典值
  remove(key) {
    if (this.hasKey(key)) {
      delete this.table[this.toStrFn(key)];
      return true;
    }
    return false;
  }
  // 以数组返回数据值
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  // 以数组返回键值
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  // 将字典中的所有【键-值】返回
  keyValues() {
    return Object.values(this.table);
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
    return Object.keys(this.table).length;
  }
  // 清除字典
  clear() {
    this.table = {};
  }
  // 字符串化
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`;
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    return objString;
  }
}
