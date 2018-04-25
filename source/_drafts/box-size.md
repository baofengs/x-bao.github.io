---
title: 块/行级元素的宽高
tags: ['废话篇', 'HTML', 'width', 'height']
---


## Normal Flow

- 块级元素
    - 垂直方向，从上到下依次排列
    - 默认宽度占满一整行
    - 兄弟盒之间的距离由`margn`决定，同一格式化上下文中`margin`会合并
- 行内元素
    - 水平方向，从左到右依次排列
    - 一行铺满之后自动换行
    - 水平`padding`、`margin`、`border`都有效
    - 垂直`padding`、`margin`、`border`都无效，对元素的高度无影响

## `<div>`的高度

### 1. 只有文本

- **单行**
    - `<div>`高度 = 字体大小 * 字体设置的默认行高
- **多行**
    - `<div>`高度 = (字体大小 * 字体默认设置的默认行高) * 行数


#### 关于『建议行高』
字体的默认行高是由设计师设计时写入字体文件中的，通常称为『建议行高』，不同的字体对应的建议行高不一致

```css
/* by default */
line-height: normal;
```

### 2. `<div>`中包含 `<div>`

形如：`<div class="container">`中包含`<div class="item">`

- **`margin`合并**
    - `<div class="container">`高度 = (字体大小 * 建议行高) * 行数 + `padding-top` + `padding-bottom`
- **`margin`不合并**
    - `<div class="container">`高度 = (字体大小 * 建议行高) * 行数 + `padding-top` + `padding-botom` + `margin-top` + `margin-bottom`

这里的 `margin` 合并是父子间的合并

组织合并的方法：
- 父元素建一道墙 OR 父子之间添加任何可以隔开的元素
    - 父元素添加`border-top`
    - 父元素添加 `padding-top`
- BFC

## `<div>`的宽度

默认占满一行

## 字体两端对齐方案

核心：

- text-align: justify;
- label::after

```html
<form action="#">
  <div>
    <label for="name">姓名</label>
    <input type="text">
  </div>
  <div>
    <label for="phone">联系方式</label>
    <input type="text">
  </div>
</form>
```

```css
div {
  border: 1px solid;
}

div input {
  vertical-align: top;
}

label {
  border: 1px solid;
  display: inline-block;
  width: 4em;
  height: 25px;
  text-align: justify;
  overflow: hidden;
}

label:after {
  content: '';
  display: inline-block;
  width: 100%;
}
```

![](https://imgs.sanbaofengs.com/18-4-25/44471667.jpg)

## inline/inline-block 元素的宽高

* 高度
    * line-height 决定
* 宽度
    * 内容的宽度
    * 如果 inline 元素之间又多个空格、tab、回车都会合并成一个空格

小故事

有些 FE，当他们遇到 inline 元素间的空隙问题，是这样想的：

「我懂了，我来用 `font-size: 0` 来解决」

这样，他就有其他问题了

#### 缝隙问题最佳实践

使用 `float` + `.clearfix` 解决

## 居中问题

对于块级元素单行文本居中，不到万不得已不要写高度

必要时使用 `padding` 凑设计稿上给定的高度


## 文本溢出省略

### 单行

```css
.overflow {
  border: 1px solid;
  width: 5em;
  overflow: hidden;
  text-overflow: ellipsis
}
```

### 多行

```css
.line-clapm {
    border: 1px dashed;
    width: 5em;
    white-space: brack-all;
    overflow: hidden;
    /* 核心 */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical; 
}
```
