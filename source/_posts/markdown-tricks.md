---
title: Markdown 中的奇技淫巧
date: 2018-02-06 17:01:17
tags: [Markdown, tricks]
---

作为一个合格的程序猿，怎么能不写 Markdown？！感觉没有 Markdown 完全没法扣字，有木有🍕

Markdown 所提供的功能完全可以 cover 平时笔记、邮件等扣字的需求，但是如果再来一丢丢小技巧啥的，会让你生成的文本更加丰富绚丽

这里总结了我平时常用的一些 Markdown 的奇技淫巧，持续更新~

## 给表格加一个空行

```html
| key | value |
|-----|-------|
| foo | bar   |
|                   ⃪ 空行
| baz | opps~ |
```

| key | value |
|-----|-------|
| foo | bar |
|
| baz | opps~ |

## 折叠一部分内容

虽然 Markdown 可以满足大部分的写作需要，但是还是比较弱的，这个时候需要配合 HTML 标签一起使用，有洁癖者慎用

`<details>`中的内容表现和`<pre>`标签一样，都是原文输出。也就是说，`<details>`中的 Markdown 是不会被解析的

```html
<details>
    <summary>click me</summary>
    * 因为我刚好遇见你
    * 留下足迹才美丽
    * 分吹花落泪如雨
    * 因为不想分离
</details>
```

<details>
	<summary>click me</summary>
	因为我刚好遇见你
	留下足迹才美丽
	分吹花落泪如雨
	因为不想分离
</details>

## 写个 todo

这个里边竟然不能解析，只能丢一个 github 的截图了😤

```Markdown
- [ ] Eat
- [x] Code
```

![markdown todo](https://i.loli.net/2018/02/07/5a79df0c4c576.png)


## 插入一个网页

其实就是添加一个 `<iframe>`，但是有几点需要注意一下

- 插入到`<iframe>`中 URL 链接，如果含有 *query string*类型参数，则必须将 *&* 转化为 ***`&amp;`***
- `<iframe> </iframe>`两个 *tag* 之间须留有空格，不要问为什么，都是这么说的，我也是这么做的
- `<iframe>`的结束标签一定要加上
	如果最后两点有问题，都会导致 `<iframe>` 标签之后的内容无法显示

```html
<iframe src="https://x-bao.github.io/awesome-css/colorfule%20black/index.html"  frameborder="1" scrolling="no"> </iframe>
```

<iframe src="https://x-bao.github.io/awesome-css/colorfule%20black/index.html"  frameborder="1" scrolling="no"> </iframe>



