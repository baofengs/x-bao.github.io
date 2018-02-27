---
title: 字体那点事儿
tags:
  - 废话篇
  - 字体
date: 2018-02-27 04:45:08
---


这篇单独聊聊字体那点事儿，本打算放到[字体图标那些事儿]()里边，但是可能会导致篇幅太长了，故而拎出来，单独聊聊。

## Web 字体工作原理

1. 浏览器加载页面，对 HTMl 进行解析渲染
2. 将字体转化为对应的 unicode 编码
3. 如果没有设置 font-family，使用默认字体
4. 设置了 font-family，根据设置的 font-family 查找对应的字体文件，如果有自定义字体 font-face，则先进行 5
5. 加载 font-face 指定的字体文件
6. 根据步骤2中的 unicode 码，在字体文件中找到对应的字体外形，然后绘制在页面上

## font-family

### 字体系列

每个 font-family 都包含一组具有共同特征的字体。看看五大字体类型：

| 字体系列   | 特征                                                         | 示例                            |
| ---------- | ------------------------------------------------------------ | ------------------------------- |
| Serif      | 衬线字体：字母末端含有装饰性的「小细线」，新闻报纸文字排版     | Times、Times New Roman、Georgia |
| Sans-serif | 非衬线字体：不含有衬线，通常用于计算机屏幕字体               | Verdana、Arial                  |
| Monospace  | 等宽字体：每个字母在水平方向所占的宽度一致，通常用于代码展示 | Courier、Andale Mono            |
| Cursive    | 手写体：类似手写效果，标题中常见                             | Comic Sans、Apple Chancery      |
| Fantasy    | 具有某种风格的装饰性字体                                     | Last Ninja、Impact              |

[效果预览](https://sanbaofengs.com/slaughter/css/font/index.html)：

<iframe src="https://sanbaofengs.com/slaughter/css/font/index.html"  frameborder="1" scrolling="yes">字体示例</iframe>

### CSS 中指定 font-family

本质：指定一个首选字体列表。CSS 会根据这个列表设置的字体顺序选择第一个可用的字体。越靠前，优先级就越高。

```css
body {
    font-family: 'Comic Sans', 'Verdana', 'Times', 'Serif';
}
```

### 不存在的字体

在设置`font-family`时，一般都会在末尾添加 `Serif` 或者 `Sans Serif`，真的存在这种字体名称的字体么？

不存在的。使用 `Serif` 和 `Sans Serif`，实际上表示，使用系统默认的该字体系列的字体，不同的操作系统或平台可能存在差异。

### font-family 最佳实践

font-family 的本质是一个字体的优先级列表，比较靠谱的策略如下：
- 将最希望使用的字体放在靠前的位置
- 由于用户可能没有安装相应的字体，需要指定同字体系列的字体，最为备选方案
- 提供一个任何平台上都可能有的字体
- 最后提供一个字体系列，当以上都不满足时，由系统指定默认的字体

## font-face

### 字体格式

| 字体                | 文件后缀 | 详情 |
| ------------------- | -------- | ---- |
| TrueType 字体 | .ttf | TrueType 和 OpenType 字体紧密相关，OpenType 建立在 TrueType 基础之上，比 TrueType 更新 |
| OpenType 字体 | .otf | 见上 |
| Emmbedded OpenType | .eot | Embedded OpenType(EOT)是 OpenType 的一种压缩形式。这种格式是 Microsoft 专用的，仅 IE 提供支持 |
| SVG 字体 | .svg | 通用图像格式，SVG 使用这种格式标志字符 |
| Web 开放字体格式 | .woff | Web 开放字体格式建立在 TrueType 之上，已经发展为 web 字体的一个标准，大多数现代浏览器对这种格式提供了很好的支持 |

### CSS 中 @font-face 干了啥

1. 指定自定义字体的名称，通过 font-family 设置
2. 告诉浏览器：加载由 src 指定的字体文件。浏览器会尝试加载每一个 src 文件，直到找到一个它能支持的文件
3. 一旦加载，就能使用 font-family 指定的名称的字体了

```css
@font-face {
  font-family: "icons";
  src: url("../font/icons.eot");
  src: url("../font/icons.eot?#iefix") format("embedded-opentype"),
       url("../font/icons.woff2") format("woff2"),
       url("../font/icons.woff") format("woff"),
       url("../font/icons.ttf") format("truetype"),
       url("../font/icons.svg#icons") format("svg");
}
```

### font-face 引发的性能危机

后期补充

## 字体高度

设置一个字体高度为 `font-size: 14px`，说明这个字母的最低部分与最高部分之间有 14像素，示意图见下：

![字体高度示例](https://i.loli.net/2018/02/27/5a9471203539b.png)


## 写在最后：
免费字体下载：[911fonts](http://www.911fonts.com/)
字体服务：[google fonts](https://fonts.google.com)
