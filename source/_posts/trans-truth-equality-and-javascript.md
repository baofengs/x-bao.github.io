---
title: '【译】Truth, Equality and JavaScript'
tags:
  - JavaScript
  - Truth
  - Equaity
date: 2018-02-24 18:45:44
---


原文：[Truth, Equality and JavaScript](https://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/)

作为 JavaScript 新手，对下列两种情况可能感到惊恐

```js
if ([0]) {
    console.log([0] == true); // false
    console.log(!![0]); // true
}
```

```js
if ("potato") {
    console.log("potato" == false); // false
    console.log("potato" == true); // true
}
```

好消息是有一个所有浏览器都通用的标准。有些老司机教育你尽量不要用这些。我认为真正的勇士应该敢于面对惨淡的人生，敢于正视淋漓的鲜血...（意译过头了好像😤）

x 为真？x 和 y 相等？关于真假，等价的问题，在 JavaScript 中可以分为三个大块：

- 条件表达式以及操作符：if, && , ||等
- 等于：==
- 严格相等：===

下面就来分情况讨论

## 条件表达式

在 JavaScript 中，所有的条件表达式和条件操作符遵循同样的规则，这里就直接用`if`作为范例

`if` 条件判断，会将括号中的表达式通过 *ToBoolean* 将结果转化为 boolean 类型。*ToBoolean* 在 [ES5 spec](http://ecma262-5.com/ELS5_HTML.htm) 中的具体定义如下：

| 参数类型  | 结果                                    |
| --------- | --------------------------------------- |
| Undefined | false                                   |
| Null      | false                                   |
| Boolean   | 和输入结果相同（没有转化）              |
| Number    | false: +0, -0, NaN<br>true: 其他        |
| String    | false：空字符串，长度为 0<br>true: 其他 |
| Object    | true                                    |

看一些示例：

```js
var trutheyTester = function (expr) {
    return expr ? "truthey" : "falsey";
}
// Object
trutheyTester({}); // trutyey (对象永远是对的！！！)
// Boolean
trutheyTeseter(false); // falsey
trutheyTester(new Boolean(false)); // truthey(她是你对象!!!)
// String
trutheyTester("") // falsey
trutheyTester(new String("")) // truthey (她是对象!!!)
// Number
trutheyTester(NaN) // falsey
trutheyTester(new Number(NaN)) // truthey (对象啊!!!)
```

## 等于（==）
`==`是相当宽松的，类型不同的值都有可能相等。因为在进行比较之前，JS 引擎可能将等号左边或右边或两边的操作数转换为同样的类型，然后再进行比较，所谓的隐式类型转换。这也是为啥老司机们不让你使用的原因。

俗话说：逃避是解决不了问题的。你要想掌握一门语言，你就得从里到外全面了解。就算你无视 `==` 的存在，你也不可能摆脱 coercion 的的纠缠。在 JavaScript 中 coercion 无处不在。合理使用 coercion 将会给你的编码带来极大的便利。

接下来就瞅瞅 `==` 在 ECMA 中是怎么工作的。不要慌张，只需要记住：`Undefined` 和 `Null` 相等；以及 JS 为了极速对比效率，大部分情况都会将类型往 `Number`转化。详情见下：

| Type(x)            | Type(y)            | Result              |
| ------------------ | ------------------ | ------------------- |
| x，y类型相同       | x，y类型相同       | 同严格相等（===）   |
| null               | Undefined          | true                |
| undefined          | null               | true                |
| Number             | String             | x == toNumber(y)    |
| String             | Number             | toNumber(x) == y    |
| Boolean            | (any)              | toNumber(x) == y    |
| (any)              | Boolean            | x == toNunber(y)    |
| String <br> Number | Object             | x == toPrimitive(y) |
| Object             | String <br> Number | toPrimitive(x) == y |
| otherwise...       | otherwise...       | false               |

当结果为表达式的时候，将会继续进行转化，直到结果为 Boolean
`toNumber` 和 `toPrimitive` 按照以下规则运行：

* toNumber

| 参数类型  | 结果                                              |
| --------- | ------------------------------------------------- |
| Undefined | NaN                                               |
| Null      | 0                                                 |
| Boolean   | true: 1 <br> false: 0                             |
| Number    | 不转化                                            |
| String    | "123" => 123 <br> "123a" => NaN <br> "abc" => NaN |

* toPrimitive

| 参数类型 | 结果                                                                                  |
| -------- | ------------------------------------------------------------------------------------- |
| Object   | 先尝试 valueOf()，如果没有定义或者结果不是原始类型，调用 toString()，否则，返回 error |
| 其他     | 不转化                                                                                |

看些示例：

### [0] == true

```js
// 等值判定
[0] == true
// 转化过程
// 使用 toNumber 转化 boolean
[0] == 1
// 使用 toPrimitive 转化 [0]
// [0].valueOf() => [0]，结果不是原始类型，调用 toString()
// [0].toString(0) => "0"
"0" == 1
// 使用 toNumber 转化 string
0 == 1 // false
```

### "potato" == true

```js
// 等值判定
"potato" == true
// 使用 toNumber 转化 boolean
"potato" == 1
// 使用 toNumber 转化 string
NaN == 1 // false
```

### "potato" == false

```js
// 等值判定
"potato" == false
// 使用 toNumber 转化 boolean
"potato" == 0
// 使用 toNumber 转化 string
NaN == 0 // false
```

### object with valueOf

```js
// 等值判定
var crazyNumeric = new Number(1);
crazyNumeric.toString = function () { return "2" };
crazyNumeric == 1;
// 使用 toPrimitive 转化 object
// 调用 valueOf()
1 == 1 // true
```

### object with toString

```js
var crazyObj = {
    toString: function () {
        return "2";
    }
}
crazyObj == 1;
// 使用 toPrimitive 转化 object
// 尝试 valueOf() 返回 Object，尝试 toString()
"2" == 1;
// 使用 toNumber 转化 string
2 == 1 // false
```

## 严格相等（===）
这个就比较简单了，类型不同，永远不相等；然后记住：

- object 必须指向同一个对象才相等
- 字符串必须含有相同的字符集才相等
- 其他值必须一样才相等
- NaN, nul, undefined 永远互不相等
- NaN 不等于 NaN

| Type(x)           | Valuse                    | Result |
| ----------------- | ------------------------- | ------ |
| x，y类型不同      | x，y 类型不同             | false  |
| Undefined OR Null | Undefined OR Null         | true   |
| Number            | x，y 值相同（都不是 NaN） | true   |
| String            | 含有相同字符集            | true   |
| Boolean           | 都为 true 或者 false      | true   |
| Object            | x，y 指向同一个对象       | true   |
| 其他              | 其他                      | false  |

## 一些过度相等的例子

```js
// unnecessary
if (typeof myVal === 'function')
// better
if (typeof myVal == 'function')
```

typeof 返回值就是 String 类型，所有待比较的两个值始终是 String，使用 `==` 就够了

```js
// unnecessary
var missing = (myVal === undefined || myVal === null);
// better
var missing = (myValue == null);
```

null == undefined
Note: 由于`undefined`的变量可能是由于重复定义来的，所以用`null`进行判断比较保险

```js
// unnessary
if (myArray.length === 3);
// better
if (myArray.length == 3);
```
