/**
 * 冒泡排序
*/
import { Compare, defaultCompare, swap } from '../../util';

export function bubbleSort(array, compareFn = defaultCompare) {
  const { length } = array;
  for (let i = 0; i < length; i++) {
    // console.log('--- ');
    for (let j = 0; j < length - 1; j++) {
      // console.log('compare ' + array[j] + ' with ' + array[j + 1]);
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        // console.log('swap ' + array[j] + ' with ' + array[j + 1]);
        swap(array, j, j + 1);
      }
    }
  }
  return array;
}
