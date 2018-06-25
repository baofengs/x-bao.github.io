---
title: Array range
date: 2018-06-25 23:37:46
tags: ['JS', 'Array', 'Range']
---

标题实在不知道怎么取，用的是 [underscore](https://underscorejs.org/)中一个方法的名字。因为聊的话题 **_.range**有关。

## 需求

生成一个 0~99 的整数数组，形如：`[0, 2, 3 ... 99]`

### 解法一

```js
function arrayRange (start, end) {
    start = start || 0;
    if (end < start) return;
    const length = end - start;
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr[i] = i;
    }
    return arr;
}

console.log(arrayRange(0, 100));
```

简洁明了，一个 `for` 循环搞定。

### 解法二？

```js
const arr = Array(100).map((_, i) => i);
console.log(arr[0] === undefined);  // true
```

显然，失败了，并没有实现需求。为什么？

这篇文章：[Here’s Why Mapping a Constructed Array in JavaScript Doesn’t Work](https://itnext.io/heres-why-mapping-a-constructed-array-doesn-t-work-in-javascript-f1195138615a)，个人觉得解释的很到位，想详细了解的可以一看。

这里简单说一下原因：在 JS 内部，数组是 *key* 为数字的 *Object*。例如：

```js
['a', 'b', 'c']
```

本质上等价于以下对象

```js
{
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}
```

当访问数组中下标为 0 的值时，实际上访问的是 key 为 0 的对象的属性。使用 `Array(100)` 构造函数的方式生成数组，本质上得到的是如下的对象：

```js
{
    // no number keys
    length: 100
}
```

当访问 `arr[0]`时，由于在对象中不存在下标为 0 的属性，所以返回值为 `undefined`。

找到原因之后，稍微调整一下，就能得到好几种方法了。

### 解法二！

```js
const arr = [...Array(100)].map((_, i) => i);
```

### 解法三

```js
const arr = [...Array(100).keys()];
```

### 解法四

```js
const arr = Array.from({lenght: 100}, (_, i) => i);
```

### 解法五

```js
const arr = Array(100).fill().map((_, i) => i);

// fill() 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素 --- mdn
```

### 解法六

使用 `underscore`

```js
const arr = _.range(0, 100);
```

附上 `underscore` *range* 函数的源码

```js
// Generate an integer Array containing an arithmetic progression.
// A port of the native Python `range()` function. See
// [Python documentation](http://docs.python.org/library/functions.html#range).
_.range = function(start, stop, step) {
if (stop == null) {
    stop = start || 0;
    start = 0;
}
if (!step) {
    step = stop < start ? -1 : 1;
}

var length = Math.max(Math.ceil((stop - start) / step), 0);
var range = Array(length);

for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
}

return range;
};
```
