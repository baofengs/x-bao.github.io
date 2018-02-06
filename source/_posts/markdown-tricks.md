---
title: Markdown 中的奇技淫巧
date: 2018-02-06 17:01:17
tags: [Markdown, tricks]
---

作为一个合格的程序猿，怎么能不写 Markdown？！感觉没有 Markdown 完全没法扣字，有木有🍕

这里总结了我平时常用的一些 Markdown 的奇技淫巧，持续更新~

## 给表格加一个空行

```Markdown
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

```HTML
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
  - [x] HTML
  - [x] CSS
  - [x] JavaScript
- [ ] Sleep
```

![markdown todo](https://i.loli.net/2018/02/06/5a79793862e3f.png)

