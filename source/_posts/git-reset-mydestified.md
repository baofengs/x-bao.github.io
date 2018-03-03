---
title: git reset
tags:
  - git
  - reset
date: 2018-03-03 17:04:43
---

只写结论，详情参考：[Git 工具 - 重置揭密](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86)

git rest：重置提交

## `--soft`

```git
git reset --soft HEAD~
```

撤销上一次 `git commit` 命令，commit 的内容回到暂存区

## `--mixed`

git reset 默认模式

```git
git reset [--mixed] HEAD~
```

1. 撤销上一次的提交
2. 取消暂存区内容

回到 `git add` & `git commit`之前

## `--hard`

```git
git reset --hard HEAD~
```

1. 撤销上一次提交
2. 取消暂存区内容
3. 删除工作目录中的内容

## BTW

### git revert

```git
git revert HEAD~
```

撤销上一次提交，并添加一个提交，记录这次撤销动作

不影响之前的 commit
