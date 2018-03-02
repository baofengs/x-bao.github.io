---
title: VS Code 初体验
date: 2018-02-09 14:49:41
tags: [废话篇, 工具, 编辑器, 配置, VS Code]
---

听说 VS Code 很牛逼，我也小试一波
这篇同样属于废话篇，因为写的人是在是太多了，这里我就分享一下我花俩小时（具体时间不清楚）配置 VS Code 的体验

对我而言，好的编辑器以下几点是必须的
- 轻量级：足够轻，我就写个脚本啥的，还要上 IDE？想想就够了
- 配置：自由配置，随心所欲的改，直到天荒地老
- 主题：可以没有丰富的主题，但是传统优秀主题一定要有
- 体验：良好的书写体验

总得来说，VS Code 的配置还是超级简单的，现成的扩展直接进行安装即可

## Mac 配置 VS Code 命令行命令

在 *~/.zshrc(OR ~/.bashrc)* 中添加下边一句话

```bash
# 配置Visual Studio Code的命令行方式
alias vsc="'/Applications/Visual Studio Code.app/Contents/Resources/app/bin/code'"

source ~/.zshrc(~/.bashrc)
```

## 主题篇

个人比较喜欢 Solarizen-dark Theme，但是为了支持字体 *Operator Mono*，只能忍痛割爱选择 Material Theme
扩展直接安转，设置中无脑选择一下，搞定

## 配置文件

这是一个艰辛的过程，每当遇到一个头疼的配置，我都会默念，如果这个没有解决方案，这辈子就不用 VS Cosde 了

### 字体

强烈推荐：[Operator Mono](https://www.typography.com/fonts/operator/overview/)

关键字和注释都 `italics` 化，能够与代码充分区别开来，提升编码体验，放个图瞅瞅

![vs code preview](https://i.loli.net/2018/02/09/5a7d67ffa103e.png)

however，这玩意儿是要收费的，$200+ 貌似。。。但是什么能阻挡我大天朝人民的大无私分享精神，当然也有替代方案[Free alternative to Operator Mono Italic Theme for VSCode](https://github.com/mikaelbr/open-source-ideas/issues/10)

想要使用，需要添加以下几句话

```json
"editor.fontFamily": "Operator Mono",
// Enables font ligatures
"editor.fontLigatures": true,
// Controls whether the editor should render whitespace characters
"editor.renderWhitespace": "boundary",
```

Ps: VS Code 配置文件跟 sublime 相比有一个特点，鼠标 *hover* 到相关的配置行，会有配置的具体解释，告诉有关配置信息，还有一点就是，如果你写了一个没有的配置，或者配置单词写错了，在控制台有相关的报错信息

### 修改选中颜色

默认的颜色太浅了，眼力不错的就不改了吧

```json
"workbench.colorCustomizations": {
    "editor.selectionBackground": "#406068"
}
```

### 关闭右侧预览面板

![editor.minimap](https://i.loli.net/2018/02/22/5a8ec04cc0763.png)

```json
"editor.minimap.enabled": false
```

其他的内容好像通过图形界面配置后也会丢到这个里边

完整版配置文件
```json
{
    "workbench.colorTheme": "Solarized Dark",
    "workbench.statusBar.visible": true,
    "editor.minimap.enabled": false,
    "editor.fontFamily": "Operator Mono",
    // Enables font ligatures
    "editor.fontLigatures": true,
    "editor.renderWhitespace": "boundary",
    "editor.fontSize": 12,
    "workbench.fontAliasing": "antialiased",
    "workbench.iconTheme": "material-icon-theme",
    "sublimeTextKeymap.promptV3Features": true,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.snippetSuggestions": "top",
    "editor.formatOnPaste": true,
    "workbench.colorCustomizations": {
        "editor.selectionBackground": "#406068"
    },
    "workbench.activityBar.visible": true,
    "editor.tabSize": 4,
    "editor.insertSpaces": true,
    "editor.detectIndentation": false
}
```

### 快捷键

快捷键是切换编辑器的最大成本了，但是，VS Code 一个扩展就能完美解决这个头疼的问题
直接搜索扩展 `Sublime Text Keymap`，安装，搞定

其他快捷键
- 快速打开终端：*cmd + \`*
默认快捷键实在是太难受了，改成了 *cmd + t*
在 `设置 -> 键盘快捷方式 -> 搜索『终端』`，改一下就 OK 了

- 快速格式化代码：*^ + shift + f*
关于格式化，可以看看这个[How do you format code in Visual Studio Code (VSCode)](https://stackoverflow.com/questions/29973357/how-do-you-format-code-in-visual-studio-code-vscode)

就这么多吧，其他的移步 google

---

## 让 Emmet 飞

自从用上了 VS Code，然后就越来越回不到 Sublime 了😤

### Emmet *tab* 补全不总是能够生效

```bash
"emmet.triggerExpansionOnTab": true,
```

### 其他语言文件中开启 Emmet 缩写功能

有些语言默认状态下是不支持 Emmet 的，所有需要添加一个映射

```bash
"emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html"
}
```

### 其他

```bash
// 尽可能显示 Emmet 缩写建议
"emmet.showAbbreviationSuggestions": true,
// 在建议中显示展开的 Emmet 缩写。
// 选择 "inMarkupAndStylesheetFilesOnly" 选项将仅应用于 html、haml、jade、slim、xml、xsl、css、scss、sass、less 和 stylus 文件。
// 选择 "always" 选项将应用于所有适用文件不限于标记或 CSS 的所有部分。
"emmet.showExpandedAbbreviation": "always",
```

### 写在最后

show 下我的 VS Code

![VS Code](https://i.loli.net/2018/02/09/5a7d9df0d4fd6.png)
