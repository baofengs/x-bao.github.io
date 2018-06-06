---
title: Sentry 使用总结
date: 2018-06-05 21:01:48
tags: ['Sentry', 'JavaScript']
---

1. Sentry 的配置
2. Sentry 调用的接口与界面内容的对应关系

## 开始使用 Sentry

我用的 Sentry 的是公司自己搭建的 Sentry 服务。如果是个人可以使用 [Sentry 官方](https://sentry.io/welcome/)提供的服务，或者在 [Gayhub](https://github.com/getsentry/sentry) 上获取源码，自己搭建服务。

### 1. 新建项目

点击 `Start Project` 即可

### 2. 项目配置

设置保持默认即可

拷贝数据 - 客户端密钥（DSN）备用，**这里用的是 DSN（公共）**

### 3. 在项目代码中使用

1） 初始化

```js
// your-DSN-public 第二步拷贝的 DSN（公共）
Raven.config('your-DSN-public').install()
```

2） 使用详情

上报错误信息

```js
try {
    doSomething(a[0])
} catch(e) {
    Raven.captureException(e)
}
```

默认为 `error` 类型，每 `catch` 一次，都会往 Sentry 服务中 report 一条错误信息，Sentry 会对同类型的错误进行合并。

注意：captureException：参数为 *Error Object*，eg：`throw new Error('broken')`

![](https://imgs.sanbaofengs.com/18-6-6/19805568.jpg)

追踪用户

```
Raven.setUserContext({
    email: 'matt@example.com',
    id: '123'
})
```

![](https://imgs.sanbaofengs.com/18-6-6/13438728.jpg)

捕获信息

```js
Raven.captureMessage('broken!');
```

![](https://imgs.sanbaofengs.com/18-6-6/8941141.jpg)

添加额外信息

* level 错误级别
```js
Raven.captureMessage('Something happened', {
    level: 'info' // one of 'info', 'warning', or 'error'
});
```

![](https://imgs.sanbaofengs.com/18-6-6/98419793.jpg)

* logger
```js
Raven.captureException(new Error('Oops!'), {
    logger: 'my.module'
});
```

![](https://imgs.sanbaofengs.com/18-6-6/22689615.jpg)

* tags
```js
Raven.wrap({
    tags: {git_commit: 'c0deb10c4'}
}, function () { /* ... */ });

Raven.wrap({
    tags: {key: 'value'}
}, function () { /* ... */ });
```

![](https://imgs.sanbaofengs.com/18-6-6/76220204.jpg)

* extra
```js
Raven.context({
    extra: {foo: 'bar'}
}, function () { /* ... */ });

Raven.setExtraContext({ foo: "bar" })
```

![](https://imgs.sanbaofengs.com/18-6-6/96583821.jpg)

就这样儿吧，其他详细的配置参考 [官方文档](https://docs.sentry.io)，建议对照文档一对一的操作👀
