---
title: 外边距合并
tags:
  - CSS
  - 废话篇
date: 2018-03-02 10:47:42
---


## 产生外边距合并的情况

- 父子合并
- 相邻元素合并
- 自合并

## 清除外边距合并

- 父子合并、自合并
    - padding
    - border
- 相邻元素合并
    - 不处理
    - BFC

## 关于 BFC

BFC：块级格式化上下文
本质：页面上一个隔离的独立容器，描述了其子元素应该如何定位，以及和其他元素之间的关系和相互作用。容器内的子元素不会受到外界的影响，反之亦然。

### 如何生成 BFC

- HTML 本身就是一个BFC
- float: left/right
- position：absolute/fixed
- display: table-cell/table-caption/inline-block/flex/inline-flex
- overflow: scroll/hidden/auto
- display: flow-root
	- 触发 BFC，没有任何副作用

### BFC 特性

- 阻止外边距合并（Block formatting contexts prevent margin collapsing）
- 包裹浮动元素（Block formatting contexts contain floats）
- 不与浮动元素重叠 （Block formatting contexts do not overlap floats）

[CSS: The block formatting context](http://maxdesign.com.au/jobs/sample-block-formatting-context/index.htm)
