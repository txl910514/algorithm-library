import HashTable from "./HashTable";

class DoubleHashTable  extends HashTable {
    constructor (toStrFn) {
        super(toStrFn)
    }
    loseloseHashCode(key) {
        if (typeof key === 'number') {
          return key % 37;
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
        return ((loseloseHashCode(key) + j* loseloseHashCode1(key))) % total
    }
    hashCode(key) {
        let hashKey = this.loseloseHashCode(key)
        const hashKeys = this.keys()
        if (hashKeys.indexOf(hashKey) > -1) {
            let cTNum = 0;
            while (hashKeys.indexOf(hashKey) > -1) {
                ++ cTNum
                hashKey = loseloseHashCode2(item, cTNum)
            }
            
        }
        return hashKey;
    }
    keys () {
        return super.getTable().keys()
    }
}

export default DoubleHashTable
