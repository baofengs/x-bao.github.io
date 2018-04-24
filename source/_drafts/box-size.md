---
title: HTML元素大小
tags: ['废话篇', 'HTML', 'width', 'height']
---

- 文档流（Normal Flow）
    - 内联元素的宽高
    - 块级元素的宽高
    - 文本居中
- 文字溢出省略（多行）
    - 盒模型
    - 一比一的 div
    - outline

结论：
块级元素的高度（不写 height）

高度 = 内部文档流元素高度的总和
    
    - 脱离文档流的元素不计高度
        - position: absolute/fixed
        - float: left/right

- 如果只有文字
    - 单行：则高度由字体大小 * 建议行高决定
    - 多行：多行的行高之和
        - line-height: normal;
- div 中间有 div
    - 外边距合并了，高度：内部 div 内容的高度
        - 解决方案：
            - padding
            - border
            - 。
    - 使用 padding、border 解决外边距合并之后
        - 高度 = 内部 div 高度 + 上下 padding
- 所有内联元素高度

- 字体两端对齐方案

```css
span {
    text-align: justify;
    ...
}

span:after {
    content: '';
    display: inline-block;
    width: 100%;
}
```

任何两个 inline/inline-block 元素之间有 空格、tab、回车换行都会在元素之间出现空隙

- 解决方案：不用 inline-block，使用 float + clearfix


内联元素

- padding/margin 只能影响左右，不能影响上下
- 高度是由行高决定的
- 宽度是由内容 + 左右 padding、margin、border
