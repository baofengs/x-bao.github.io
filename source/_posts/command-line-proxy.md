---
title: 命令行科学上网实践
date: 2018-06-25 22:59:00
tags: ['Command line', 'Proxy']
---

阅尽无数命令行翻墙教程，尝试万种方法，这一个终于如愿以偿。

## Shadowsocks + privoxy

Shadowsocks 这个就不说了，建议购买其服务，一年才 99 而已。主要聊聊 `privoxy`，以及相关的配置。关于`privoxy`有关介绍，[官网](https://www.privoxy.org/)已经说的很明白了，有兴趣的自己去看看吧。

### 安装 privoxy

这里只简单列举一下，具体可以参考[官网-安装教程](https://www.privoxy.org/user-manual/installation.html)，方法多样，介绍详尽。

```bash
# ubuntu Or Debian
apt-get install xxxx

# Mac OS
下载源码，自己编译
```

### 配置 privoxy

```bash
# 就这么两行
listen-address 0.0.0.0:8118
forward-socks5 / localhost:1086 .
```

说明

**`loaclhost:1086`** 是 SS *HTTP* 代理端口，在 SS 的**配置**里边应该可以找到

### 启动

```bash
sudo privoxy /usr/local/etc/privoxy/config
```

检测启动状态

- 查看监听端口

```bash
netstat -an | grep 8118
# 效果如下
# tcp4     0    0  127.0.0.1.8118     *.*    LISTEN
# tcp4     0    0  *.8118             *.*    LISTEN
```

- 查看进程

```bash
ps -ef | grep privoxy
```

### 配置 *~/.zshrc* OR *~/.bashrc*

```bash
function proxy_off(){
    unset http_proxy
    unset https_proxy
    echo -e "Bye~"
}
function proxy_on() {
    export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
    export http_proxy="http://127.0.0.1:8118"
    export https_proxy=$http_proxy
    echo -e "Enjoy~"
}
```

记得 `source ~/.zshrc`

### 开启命令行代理

```bash
proxy_on
```

### 最后

Enjoy yourself~
