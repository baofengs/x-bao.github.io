---
title: Ubuntu 之旅
date: 2018-06-27 09:24:49
tags: ['Ubuntu', '问题', '技巧']
photos: ['https://imgs.sanbaofengs.com/18-6-27/98203735.jpg', 'https://imgs.sanbaofengs.com/18-6-27/3962079.jpg', 'https://imgs.sanbaofengs.com/18-6-27/55313682.jpg', 'https://imgs.sanbaofengs.com/18-6-27/61017399.jpg', 'https://imgs.sanbaofengs.com/18-6-27/69509897.jpg']
---

本文记录在使用 Ubuntu 过程中遇到的问题，使用技巧以及相关解决方案。

持续更新...

## 系统信息

在以下版本中，亲测有效

| 系统 | 系统版本 | 内核版本 |
|:------|:---------|:---------|
| Ubuntu (ali ECS) | 16.04 | 4.4.0-127-generic x86_64 |
| Ubuntu | 18.04 | 4.15.0-24-generic x86_64 |

### 查看系统信息相关命令

查看内核版本

```bash
cat /proc/version
# Linux version 4.4.0-127-generic (buildd@lcy01-amd64-023) (gcc version 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.9) ) #153-Ubuntu SMP Sat May 19 10:58:46 UTC 2018

uname -r
# 4.4.0-127-generic

uname -a
# Linux iZwz9bqg2v1h2g6tz9sovcZ 4.4.0-127-generic #153-Ubuntu SMP Sat May 19 10:58:46 UTC 2018 x86_64 x86_64 x86_64 GNU/Linux
```

查看 Linux 版本

```bash
lsb_release -a
# LSB Version: core-9.20160110ubuntu0.2-amd64:core-9.20160110ubuntu0.2-noarch:security-9.20160110ubuntu0.2-amd64:security-9.20160110ubuntu0.2-noarch
# Distributor ID: Ubuntu
# Description: Ubuntu 16.04.2 LTS
# Release: 16.04
# Codename: xenial

cat /etc/issue
# Ubuntu 16.04.2 LTS \n \l
```

## 更换到淘宝源

https://blog.csdn.net/jmh1996/article/details/80432806

## 合上盖子不执行任何动作

https://linux.cn/article-2485-1.html

## 添加开机启动项

https://blog.csdn.net/hcx25909/article/details/9068497
http://www.r9it.com/20180613/ubuntu-18.04-auto-start.html

## 在 ~/.*shrc 中创建命令组

形如：function proxy_on () {}

## 语系错误
