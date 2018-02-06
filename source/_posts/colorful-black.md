---
title: 实现一个五彩斑斓「黑」的标题
date: 2018-02-06 02:19:23
tags: [炫技篇, CSS]
---

五彩斑斓黑？不存在的。

兼容性？搞笑吧。。。不存在的。

<iframe src="https://x-bao.github.io/awesome-css/colorfule%20black/index.html"  frameborder="1" scrolling="no"> </iframe>

三行 CSS 搞定以上字体效果

```CSS
.awesome-text {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: -webkit-gradient(linear,0% 50%,25% 100%,from(#ff2c2c),to(#7a5e91));
}
```

## 详解

### background-clip

设置元素的背景（背景图片或颜色）是否延伸到边框的下边 --- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip)

<details>
<summary>语法详情</summary>
- 背景被裁剪为文字的前景色：`background-clip: text;`
- 背景延伸到边框外沿，但在边框之下: `background-clip: content-box;`
- 背景延伸到内边距外沿，边框下没有背景: `background-clip: padding-box;`
- 背景裁剪到内容外沿: `background-clip: content-box;`
</details>

```CSS
p {
   border: 5px navy;
   border-style: dotted double;
   margin: 1em;
   padding: 2em;
   background: #F8D575;
}
.border-box { background-clip: border-box; }
.padding-box { background-clip: padding-box; }
.content-box { background-clip: content-box; }
```

![background-clip](https://i.loli.net/2018/02/06/5a795c048b467.jpg)

### text-fill-color

设置文字的前景色。如果没有设置这个值，`color`值默认生效

### gradient

渐变，用于表现两种或者多种颜色的过渡转变

#### 线性渐变：linear-gradient

颜色值沿着某一个隐式的直线逐渐过渡

```CSS
.liear-gradient {
    width: 240px;
    height: 80px;
    background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)
}
```

![linear-gradient](https://i.loli.net/2018/02/06/5a795be74062b.png)

#### 径向渐变: radial-gradient

颜色由一个中心点向外扩散，并逐渐过渡到其他的颜色值

```CSS
.radial-gradient {
    width: 240px;
    height: 80ox;
    background: radial-gradient(red, yellow, rgb(30, 144, 255))
}
```

![radial-gradient](https://i.loli.net/2018/02/06/5a795c046082b.png)

