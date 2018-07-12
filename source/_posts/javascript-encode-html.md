---
title: 使用 JavaScript 对 HTML 编码
date: 2018-07-12 10:42:22
tags: ['JavaScript', 'HTML', 'Encode']
---

在工作中，常常要写一些防 QA 的代码。比如说把一个可爱小哥哥的起个 `&nbsp;` 的名字。如果直接把 `&nbsp;` 丢到页面上，浏览器就会将它转化为空格，然后 QA 小姐姐就要给你提 Bug 啦。

修复这个 bug 其实很简单。只需要在 `&nbsp;` 显示之前进行一次编码，得到 `&amp;nbsp;`，然后浏览器渲染只进行一次解码，最终得到想要显示的字符串。

```js
/**
 * 对字符串进行 HTML 编码
 *
 * @param {string} source 字符串
 * @return {string}
 */

'use strict';

export default function(source) {
    return String(source)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
};

/**
 * @file test.js
 */
import encodeHTML from 'encodeHTML.js';

encodeHTML('&nbsp;'); // &amp;nbsp
```

上述代码首先将传入的参数转化为字符转，然后使用正则表达式将字符串中的 HTML 特殊字符替换为 HTML 命名实体，使用`/g`选项进行全局替换。最终，浏览器只会把替换的 HTML 命名实体渲染为特殊字符，而不会将 `&nbsp;` 当做一个特殊字符去渲染。

HTML 特殊符号编码对照表可以参考[这里](http://tool.chinaz.com/tools/htmlchar.aspx)
