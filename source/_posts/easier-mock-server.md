---
title: 更简单的 Mock Server
date: 2018-06-12 23:19:54
tags: ['JS', 'server', 'Mock']
---

在日常开发工作中，Mock 数据是常干的一件事儿。这篇总结一下，我在工作中用到的两种类别的 Mock 方式。

## Hapi

官网地址在[这里](https://hapijs.com/)，按照文档指示，配置一下，就能够跑起来了。技术成熟，易上手。

## Express

我们反过来思考一下，在本地进行 mock 是为了什么？

1. **更高效的开发**。目前，大多是前后端分离的模式进行开发。首先，后端定义好数据接口以及有关字段；然后，前端使用本地 mock 的方式，模拟后端数据的返回，从而保证两端能够并行开发。
2. **自测**。在前后端联调之前，前端使用 mock 数据的方式进行自测，提前解决一部分问题，提高联调的效率。

对于第一点而言，大部分时候，我们只需要获取列表数据，或者数据详情。所以我们只需要 mock 这部分数据就可以了。像提交、删除、新增、修改这些请求，作为前端老司机的你，有没有写对，一眼就看穿了，写代码时有个 404 又何妨。如果你有「洁癖」，请忽略上一句。

对于第二点，我推荐使用 Charles 的 **map remote** 功能，将远程的请求代理到本地，能够极为简便的进行调试工作。前提是后端开发完毕，并且已经部署到相关机器上。

扯了这么多，直接上代码了

目录结构

```bash
.
├── index.js
├── mock
│   └── foo.json
├── package-lock.json
└── package.json
```

```js
/**
 * @file index.js
 */
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.use(function (req, res, next) {
    const url = req.path;
    const dataPath = path.join(__dirname, 'mock', url);
    fs.readFile(dataPath, function (err, data) {
        if (err) {
            next();
        } else {
            res.type('application/json');
            res.send(data.toString());
        }
    });
});

app.listen(1235, '0.0.0.0', function () {
    console.log('dataServer running at port 1235');
});
```

以上代码，使用了 express 中间件对请求进行处理。例如，接口地址为：`http://localhost/foo.json`，中间件会读取 *__dirname/mock/foo.json* 文件，然后，将数据返回给浏览器。如果没有找到指定文件，则返回 404。

这里为什么要用 express 的中间件，为何不直接写一个路由呢？原因是，在本地 mock 的时候可能会处理 POST 请求，使用中间件，仅仅将指定文件的内容返回给浏览器。mock 数据不就是为了这个么？

## 优点

* **简单**。20 行代码，轻松搞定所有 POST 和 GET 请求数据 mock。
* **清晰**。在 mock 文件夹中，按照后端接口路径创建相关的 `.json` 文件，将请求的数据当做一个个资源返回。
* **不需要写重复的配置**。使用 *hapi* 进行 mock 时，需要写大量类似的配置。
* **扩展性强**。自己的服务，想怎么改就这么改。

## 缺点

* **不是那么清晰**。使用 *hapi* 能够将同一类请求，放在同一个配置文件当中，结构更加清晰，在后期维护、修改方面更加方便。
* **功能较弱**。不具备像 *hapi* 类似 Mock Server 强大的功能。当然，你可以自己完善。

## [demo here](https://github.com/x-bao/easier-mock-server)
