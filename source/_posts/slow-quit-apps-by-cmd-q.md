---
title: command + q 误操作终极解决方案
date: 2018-07-12 15:50:26
tags: ['Mac', 'command q', '使用技巧']
---

## 背景

使用快捷键是提升工作效率的最好方法。但是误触某个快捷键，比如 `command + q`，又是让人最头疼最难受的事。Google 一下，你会发现大家都被这个万恶的快捷键所折磨。有人建议改键，使用其他快捷键替换 `command + q`，但是这并不是一个优雅的解决方案。

这里推荐一个 Mac App，[Slow Quit Apps](https://github.com/dteoh/SlowQuitApps)，它能够全局监控`command + q`，延时一段时间（文档说是 1 秒）之后才真正触发 `command + q` ，给你一个缓冲时间，这个东西对所有的 Mac App 有效。

## 体验感受

有第一条就够了，其他的不重要

- **监控所有 App，简单有效的根除痛点**
- 没有图形界面
    - 难以获取 App 运行状态
    - 配置不友好，只能通过命令行进行
    - 配置后必须重启
- 如果加入开启启动，每次启动程序都会有提示对话框

## 安装 SlowQuitApps

**使用安装包**

在[这里](https://github.com/dteoh/SlowQuitApps/releases)下载，解压安装即可。

**Homebrew**

```bash
brew tap dteoh/sqa
brew cask install slowquitapps
```

## 更新 SlowQuitApps

```bash
brew update
brew cask reinstall slowquitapps
killall SlowQuitApps

OR

brew cu slowquitapps
```

## 配置

**查看配置文件**

```bash
defaults read com.dteoh.SlowQuitApps
```

**修改延时时间**

```bash
# 时间改为 5S
defaults write com.dteoh.SlowQuitApps delay -int 5000
```

**白名单设置**

加入白名单的应用将会直接触发 `command + q` 事件，具体操作步骤：

获取应用的 bundle ID，"Note" 为例

```bash
osascript -e 'id of app "Notes"'

# com.apple.Notes
```

加入白名单

```bash
defaults write com.dteoh.SlowQuitApps whitelist -array-add com.apple.Notes
```

查看白名单列表

```bash
defaults read com.dteoh.SlowQuitApps whitelist

# (
#     "com.apple.Notes"
# )
```

清空白名单

```bash
defaults delete com.dteoh.SlowQuitApps whitelist
```

**黑名单模式**

在这个模式下，只有加入黑名单的应用才会被 SlowQuitApps 监控，即使用`command + q`时会有延时。

启用黑名单模式

```bash
defaults write com.dteoh.SlowQuitApps invertList -bool YES
```

关闭黑名单模式

```bash
defaults delete com.dteoh.SlowQuitApps invertList
```

## 关于配置命令

这里的配置命令第一次接触，感觉比较奇葩，Google 了一下，发现这些命令是真的好玩儿。这些命令出自于 [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html)。这里推荐几个资源，后期再掏出来玩儿玩儿。

- **官方文档**：[Introduction to AppleScript Language Guide](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html)
- **gayhub**：[herrbischoff/awesome-macos-command-line](https://github.com/herrbischoff/awesome-macos-command-line)
