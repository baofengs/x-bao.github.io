---
title: toString-toLocalString
date: 2018-05-16 17:54:55
tags: ['JavaScript', 'Note']
---

这篇聊聊 JavaScript 中 toString 和 toLocalString 的区别

在 JavaScript 中，每个对象都有 toString 和 toLocalString 两个方法，下边这片儿代码完美诠释两者区别

```js
var person1 = {
    toLocalString: function () {
        return 'Nikoloas';
    },
    toString: function () {
        return 'Nicholas';
    }
};

var person2 = {
    toLocalString: function () {
        return 'Grigorios';
    },
    toString: function () {
        return 'Greg';
    }
};

var people = [person1, person2];
console.log(people.toString());         // Nicholoas, Greg
console.log(people.toLocalString());    // Nicholoas, Grigorios
```

当调用 toString 时，对数组的每一个元素都执行 toString 方法
当调用 toLocalString 时，对数组的每一个元素都执行 toLocalString 方法
