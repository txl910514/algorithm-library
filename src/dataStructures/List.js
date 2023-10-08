/* 
* 列表
*/
import LinkedList from './linkedList';
class List extends LinkedList {
    constructor () {
        super()
        this.length = 0;
        this.pos = 0;
    }
    //尾部添加元素
    append(element) {
        super.push(element)
        this.length = super.size()
    }
    //删除元素
    remove (element) {
        super.remove(element)
        this.length = super.size()
    }
    // 字符串化
    toString () {
        super.toString()
    }
    // 向列表插入一个元素
    insert (element, index) {
        super.insert(element, index)
        this.length = super.size()
    }
    // 清除列表
    clear () {
        super.clear()
        this.length = super.size()
    }
    // 判断给定值是否在列表中
    contains (element) {
        return super.indexOf(element) > -1
    }
    // 将列表位置移动到第一个
    front () {
        this.pos = 0;
    }
     // 将列表位置移动到最后一个
    end () {
        this.pos = this.length
    }
    // 将列表位置移动到下一个
    prev () {
        --this.pos
    }
    // 将列表位置移动到前一个
    next () {
        if (this.pos < this.length) {
            ++this.pos
        }
    }
    // 当前位置
    currPos () {
       return this.pos
    }
     // 移动指定位置
    moveTo (position) {
        if (position <0) {
            this.front()
        }
        else if (position > this.length) {
            this.end()
        } else {
            this.pos = position
        }
    }
    // 获取当前位置的元素
    getElement () {
        return this.getElementAt(this.pos)
    }
    // 是否有下一个
    hasNext () {
        return this.pos < this.length
    }
    // 是否有上一个
    hasPrev () {
        return this.pos >=0
    }
}

export default List