/**
 * 双散列法
*/
import HashTable from "./HashTable";

class DoubleHashTable  extends HashTable {
    constructor (toStrFn) {
        super(toStrFn)
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
          return key;
        }
        const tableKey = super.toStrFn(key);
        let hash = 0;
        for (let i = 0; i < tableKey.length; i++) {
          hash += tableKey.charCodeAt(i);
        }
        return hash % 37;
    }
    loseloseHashCode1 (key) {
       return (key +1) % (total-2)
    }
    loseloseHashCode2 (key,j) {
        return ((this.loseloseHashCode(key) + j* this.loseloseHashCode1(key))) % total
    }
    hashCode(key) {
        let hashKey = this.loseloseHashCode(key)
        const hashKeys = super.keys()
        if (hashKeys.indexOf(hashKey) > -1) {
            let cTNum = 0;
            while (hashKeys.indexOf(hashKey) > -1) {
                ++ cTNum
                hashKey = loseloseHashCode2(item, cTNum)
            }
            
        }
        return hashKey;
    }
    findHashCode (key) {
        let hashKey = this.loseloseHashCode(key)
        const hashKeys = super.keys()
        if (hashKeys.indexOf(hashKey) === -1) {
            let cTNum = 0;
            while (hashKeys.indexOf(hashKey) === -1 && cTNum < hashKeys.length) {
                ++ cTNum
                hashKey = loseloseHashCode2(item, cTNum)
            }
            
        }
        return hashKey;
    }
        //根据键值检索值
    get(key) {
        const valuePair = this.table[this.findHashCode(key)];
        return valuePair == null ? undefined : valuePair.value;
    }
        // 根据键值从散列表移除值
    remove(key) {
        const hash = this.findHashCode(key);
        const valuePair = this.table[hash];
        if (valuePair != null) {
        delete this.table[hash];
        return true;
        }
        return false;
    }
}

export default DoubleHashTable

// https://www.cnblogs.com/organic/p/6283476.html