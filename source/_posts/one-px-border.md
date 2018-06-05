---
title: 实用 1px border 总结
date: 2018-06-05 16:00:06
tags: ['CSS', '1px']
---

## 关于 1px border

[Can you have a 0.5px border on a Retina Display?](https://stackoverflow.com/questions/8640521/can-you-have-a-0-5px-border-on-a-retina-display/25910251#25910251)

## 实现方式

### 1. linear-gradient

```css
/* 水平方向 */
.border-onepx-v {
    background-image: linear-gradient(to bottom, #ccc 0%,#ccc 51%, transparent 51%);
    background-repeat: no-repeat;
    background-size: 100% 1px;
}

/* 垂直方向 */
.border-onepx-h {
    background-image: linear-gradient(to right, #ccc 0%,#ccc 51%, transparent 51%);
    background-repeat: no-repeat;
    background-size: 1px 100%;
}
```

### 2. box-shadow

```css
.box-shadow-1px {
    box-shadow: inset -1px -1px 1px -1px #ccc, 
    inset 1px 1px 1px -1px #ccc;
}
```

### 3. transform: scale

```css
/* 单条 */
.scale-1px {
    position: relative;
    border:none;
}
.scale-1px::after {
    content: '';
    position: absolute;
    bottom: 0;
    background: #000;
    width: 100%;
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 0 0;
}

/* 四条 */
.scale-1px {
    position: relative;
    border:none;
}
.scale-1px::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #000;
    box-sizing: border-box;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: left top;
}
```

## 参考链接

[CSS retina hairline, the easy way.](http://dieulot.net/css-retina-hairline#note-gradient-back)
[使用Flexible实现手淘H5页面的终端适配](https://github.com/amfe/article/issues/17)
[7种方法解决移动端Retina屏幕1px边框问题](https://www.jianshu.com/p/7e63f5a32636)
