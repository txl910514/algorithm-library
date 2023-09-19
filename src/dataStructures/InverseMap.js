/* 
* 逆映射
 */
import Dictionary from './Dictionary'
class InverseMap {
    constructor () {
        this.revMap = new Dictionary() // 逆向映射
    }
      // 向字典添加新元素
  set(key, value) {
    if (key != null && value != null) {
      this.revMap.set(value, key)
      return true;
    }
    return false;
  }
  //查找特定键值的数值
  get(key) {
    return  this.revMap.get(key)
  }
    // 判断字典中是否有此键值
  hasKey(key) {
    return !!this.revMap.get(key)
  }
  // 移除字典值
  remove(key) {
    if (this.hasKey(key)) {
    this.revMap.remove(key)
      return true;
    }
    return false;
  }
  // 以数组返回数据值
  values() {
    return this.revMap.keys()
  }
  // 以数组返回键值
  keys() {
    return this.revMap.values()
  }
  // 将字典中的所有【键-值】返回
  keyValues() {
    return this.revMap.keyValues()
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
    return this.revMap.size();
  }
  // 清除字典
  clear() {
    this.revMap = new Dictionary() // 逆向映射
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

export default InverseMap
