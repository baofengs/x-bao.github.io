---
title: 重拾 Quiver
date: 2018-09-10 23:29:39
tags: [Quiver, Tools]
---

## 主题配置

经过这么多年的 Quiver 使用，今天终于配置上了最爱的主题：Solarized Dark。究其原因是昨天晚上看书，有一句话我特别认同：轻松的事情，才能做的长久。比如说刷抖音。同样的道理，好看的工具，才能长久的使用。当然这也是建立在好用基础之上。至于 Quiver 好不好用，只有用过才知道。那好不好看全靠自己的配置了。

主题配置的过程相当简单。找个喜欢的主题（[Themes](https://github.com/HappenApps/Quiver/wiki/Themes)），按照官方指导：[How to Design a Custom Theme](https://github.com/HappenApps/Quiver/wiki/How-to-Design-a-Custom-Theme)，分分钟就能搞定。我是一个爱折腾而且有些强迫症的 FE。看到以下清醒怎么能忍。

![](https://imgs.sanbaofengs.com/18-9-10/71545203.jpg)
<center><font color="#bbb" font-size="12px">不统一的 Selection</font></center>

![](https://imgs.sanbaofengs.com/18-9-10/3986002.jpg)
<center><font color="#bbb" font-size="12px">消失的分割线</font></center>

![](https://imgs.sanbaofengs.com/18-9-10/51691321.jpg)
<center><font color="#bbb" font-size="12px">过度吸引的行号</font></center>

## 主题优化

接下来就是主题优化了。仔细阅读过官方指导文件[How to Design a Custom Theme](https://github.com/HappenApps/Quiver/wiki/How-to-Design-a-Custom-Theme)之后，你会发现 editor/preview/presentation这三部分竟然是webviews，可以使用 CSS 对页面中的内容进行自定义。webviews见下图红框指示的部分

![](https://imgs.sanbaofengs.com/18-9-10/45629931.jpg)

既然是 webviews，如果能像使用 Chrome 检查元素那样进行调试，那就太方便了。如何开启 webview inspector功能呢？官方指向了[stackoverflow](http://stackoverflow.com/questions/695038/is-there-a-way-to-use-the-webkit-web-inspector-from-a-cocoa-webview-object)，具体的做法就是将 `WebKitDeveloperExtras` 设置为 `YES`，想要完成这个设置，需要进行以下三步：

### 获取 Quiver 的 Bundle Id，具体的获取方法有以下三种：

1. `osascript -e 'id of app "SomeApp"'`

    ```bash
    osascript -e 'id of app "Quiver"'
    com.happenapps.Quiver
    ```
2. `mdls -name kMDItemCFBundleIdentifier -r SomeApp.app`

    ```bash
    mdls -name kMDItemCFBundleIdentifier -r /Applications/Quiver.app/
    com.happenapps.Quiver
    ```

3. 图形界面方式：打开 Finder -> 进入 Applications -> 找到 Quiver，右键「显示包内容」-> 在 Contents 目录下找到 *Info.plist* 文件，打开文件，找到下图所示内容即可

图片Info.plist

### 配置 **WebKitDeveloperExtras**

执行命令

```bash
defaults write com.happenapps.Quiver WebKitDeveloperExtras -bool true
```

### 重启 Quiver

为啥要重启呢？[stackoverflow](http://stackoverflow.com/questions/695038/is-there-a-way-to-use-the-webkit-web-inspector-from-a-cocoa-webview-object) 上回答的很清楚

> Side note: It sets the setting on the first load, which doesn't take effect until the app is restarted. 

至此如果不出意外，重启之后 Quiver 的右键菜单中会多出一项：Inspect Element。

![](https://imgs.sanbaofengs.com/18-9-10/46932408.jpg)

开启后的状态如下

![](https://imgs.sanbaofengs.com/18-9-10/50299424.jpg)

剩下的就开始将不爽的内容替换掉吧。

最后奉上我的配置：[Quiver Solarized Dark](https://github.com/x-bao/whatIuse/blob/master/configs/Solarized%20Dark.json)
