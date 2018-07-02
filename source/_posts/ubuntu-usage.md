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

做好备份

```bash
mv /etc/apt/sources.list ~/sources.list.backup
```

修改源

```bash
sudo vim /etc/apt/sources.list

deb http://cn.archive.ubuntu.com/ubuntu bionic main multiverse restricted universe
deb http://cn.archive.ubuntu.com/ubuntu bionic-updates main multiverse restricted universe
deb http://cn.archive.ubuntu.com/ubuntu bionic-security main multiverse restricted universe
deb http://cn.archive.ubuntu.com/ubuntu bionic-proposed main multiverse restricted universe
```

参考链接：https://blog.csdn.net/jmh1996/article/details/80432806

## 合上盖子不执行任何动作

图形界面太难找了，还不如通过终端，修改配置文件

修改 logind.conf

```
sudo vim logind.conf

将
#HandleLidSwitch=suspend
改成
HandleLidSwitch=ignore
```

重启 Login Manager

```bash
sudo restart systemd-logind
```

参考链接：https://linux.cn/article-2485-1.html

## 添加开机启动项

两种情况

**Ubuntu 16.04/14.04**

编辑 */etc/rc.local*，在 `exit 0` 之前添加相关脚本

**Ubuntu 18.04**

编辑 */lib/systemd/system/rc.local.service*

```bash
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.

# This unit gets pulled automatically into multi-user.target by
# systemd-rc-local-generator if /etc/rc.local is executable.
[Unit]
Description=/etc/rc.local Compatibility
ConditionFileIsExecutable=/etc/rc.local
After=network.target

[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
RemainAfterExit=yes
```

rc.local.service 文件内容说明

* [Unit] 段: 启动顺序与依赖关系 
* [Service] 段: 启动行为,如何启动，启动类型 
* [Install] 段: 定义如何安装这个配置文件，即怎样做到开机启动

添加以下内容

```bash
[Install]  
WantedBy=multi-user.target  
Alias=rc-local.service
```

创建软链

```bash
ln -s /lib/systemd/system/rc.local.service /etc/systemd/system/ 
```

创建 */etc/rc.local* 并添加测试代码

```bash
sudo touch /etc/rc.local
echo "this just a test" > /usr/local/text.log
```

重启测试

参考链接：

* https://blog.csdn.net/hcx25909/article/details/9068497
* http://www.r9it.com/20180613/ubuntu-18.04-auto-start.html

## 在 ~/.*shrc 中创建命令组

形如：function proxy_on () {}

## 语系错误

表现：使用 *ssh* 登录远程机器，执行某些命令时报错。如下

```bash
root@LePlanet:~# adduser lienZzzz
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
        LANGUAGE = (unset),
        LC_ALL = (unset),
        LC_CTYPE = "zh_CN.UTF-8",
        LANG = "en_US.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
```

原因：远程机器缺少当前环境的语系：zh_CN.UTF-8

新增 zh_CN.UTF-8

```bash
sudo locale-gen zh_CN.UTF-8
```

更新语系

```bash
sudo locale-gen
```

参考链接：https://www.douban.com/note/362250557/

## 用户管理

通用选项

- `-c comment`：指定注释性描述
- `-d dir`：指定用户主目录；若此目录不存在，则使用`-m`选项，创建主目录
- `-g 用户组`：指定用户所属用户组
- `-G 用户组, 用户组`：指定用户所属附加组
- `-s $SHELL`：指定用户登录 shell
- `-y 用户号`：指定用户号，若同时有 `-o` 选项，可以重复适应其他用户的标识号

**新增用户**

useradd

```bash
useradd -d /home/sam -m sam
```

创建用户 *sam*，同时指定主目录为 */home/sam*

```bash
userass -s /bin/sh -g group -G adm,root gem
```

创建用户 *gem*，同时指定登录 shell 为 */bin/sh*，用户组为 *group*，附加组为 *adm, root*

**修改用户**

usermod

```bash
usermod -s /usr/bin/zsh -d /home/sss -g sam
```

修改用户 *sam*，将登录 shell 改为 */usr/bin/zsh*，用户组改为 */home/sss*

**删除用户**

userdel

```bash
userdel sam
```

删除用户 *sam*

```bash
userdel -r sam
```

删除用户 *sam*，同时删除用户的主目录

**修改密码**

passwd [-i infosystem [-l location]] [-u authname] [user]

- -l 锁定，禁用帐号
- -u 解锁
- -d 使帐号无密码
- -f 用户下次登录时强制修改密码

**注意**：新创建的用户，如果没有指定密码，默认处于锁定状态，无法使用

```
passwd sam
# 输入两次同样的密码即可
```

**禁用用户**

```bash
passwd -l sam
```

参考链接：http://blog.sina.com.cn/s/blog_a954325f0101cpx8.html

## Ubuntu 安装 [fzf](https://github.com/junegunn/fzf)

```bash
#!/bin/bash
# all search should support fuzzy match
# so in github there two command support it. the fzf and the selecta
# so the fzf is more suit.
git clone --depth 1 https://github.com/junegunn/fzf.git ~/.fzf
~/.fzf/install
```

## 使用 fd 替代 find

详情：https://github.com/sharkdp/fd
