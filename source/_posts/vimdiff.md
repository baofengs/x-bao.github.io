---
title: 文件对比神器 - Vimdiff
date: 2018-02-09 00:34:49
tags: [vimdiff, vim, 技巧]
---

作为一个命令行控，就是一切的一切都要搞个命令行工具，当然，文件对比也是一样

使用 Vimdiff，一个命令快速查看两个文件的 diff

## 启动

启动方式有三种

- 直接使用命令 *vimdiff*

```bash
vimdiff DIFF_FILE_A DIFF_FILE_B
```

- 使用命令 *vim -d*

```bash
vim -d DIFF_FILE_A DIFF_FILE_B
```

- 在使用 *vim* 打开文件 *DIFF_FILE_A* 的前提下，需要进行 diff 操作

```bash
:vertical diffsplit DIFF_FILE_B
```

界面详情如下
![vimdiff](https://i.loli.net/2018/02/09/5a7c8e7273d5c.png)

## 更多操作

基本操作其实就是 *vim* 的那一套东西，这里就不介绍了，有兴趣可以使用 *vim* 官方提供教程快速入门，半小时左右即可搞定

在命令行输入以下命令即可

```bash
# vim 官方默认提供的教程
vimtutor
```

### 同步滚动

```bash
# 禁用同步滚动
:set noscrollbind

# 开启同步滚动
:set scrollbind
```

### 快速跳转

通过以下命令即可快速在不同的 diff 点之间跳转

```bash
# 向后至上一个更改的开始。当加上个数字后，便重复执行相应次
[c
# 向后跳转 * 个
[c*  // [c2 向后跳转两个 diff 点


# 向前至上一个更改的开始。当加上个数字前，便重复执行相应次
]c
# 向前跳转 * 个
]c*  // [c2 向前跳转两个 diff 点
```

### 折叠 & 展开

默认情况下，*vimdiff* 会把文件不同之处上下文各六行的文本都显示出来，以提供参考
这个值可用 'diffopt' 选项来设置，例如设置上下文为三行

```Bash
:set diffopt=filler,context:3
```

对于折叠后内容，可以在折叠点使用命令 `zo` 展开折叠，查看文本内容，同时可以使用命令 `zc` 将展开的内容重新折叠起来

```bash
# 展开折叠
zo
# 收起折叠
zc
```

### 合并

文件对比的目的有二

- 快速查看不同版本文件之间的差异
- 确定差异内容，合并文件，消除差异

使用 `do` 和 `dp` 进行，这一块看的不是特别明白，以后再慢慢研究吧

## 总结

Vimdiff 的优势

- 命令行操作，本地或者服务器无障碍使用
- 界面简洁，操作方便高效
- 适合快速简单查看文件之间的差异

劣势

- 文件合并上操作不太方便，可能是因为我没有研究透

### 其他

使用图形界面进行文件 diff，推荐使用 **[Beyond Compare](https://www.scootersoftware.com/)** 

[Vim 在线中文教程文档](http://man.chinaunix.net/newsoft/vi/doc/help.html)
