---
title: 字体图标
tags:
  - 废话篇
  - font
  - font icon
  - font custom
date: 2018-02-28 01:17:48
---


只要你体验过使用 **fontcustom** 的快感之后，你这辈子都不想在用在线服务的方式生成字体图标了😤

之前聊了一下字体相关的内容，算是这篇的前置知识。

字体图标的本质其实是字体，只要搞懂了字体的渲染原理，以及如何使用 web 字体，那么字体图标就引刃而解了。关于字体相关内容，参考[字体那点事儿](https://sanbaofengs.com/2018/02/27/font/)即可

其实核心内容已经在『字体那点事儿』中已经聊完了，这篇就来聊聊应用

## 在线服务

我在项目中常用的有两个

- [IcoMoon](https://icomoon.io/)
- [Iconfont-阿里巴巴矢量图标库](http://www.iconfont.cn/)

这两个是在线服务，按照官网的教程，点吧点吧应该就可以了

## 命令行模式

作为一个命令行控，追求的是能用命令行的坚决不用其他方式😤，在完成配置之后，只需要一条命令，就能够完美解决繁琐的操作

当然，这么做的最大成本就是安装相关的命令，以及一些需要注意的配置

## Font Custom

### 安装

讲道理，这个的安装还是超级方便的，按照 [gayhub/fontcustomer](https://github.com/FontCustom/fontcustom)给出的详细介绍，只需要执行下列代码即可完成安装，亲测有效，无毒无害，放心食用

```bash
# On Mac
brew tap bramstein/webfonttools
brew update
brew install woff2

brew install fontforge --with-python
brew install eot-utils
gem install fontcustom
# On Linux
sudo apt-get install zlib1g-dev fontforge
git clone https://github.com/bramstein/sfnt2woff-zopfli.git sfnt2woff-zopfli && cd sfnt2woff-zopfli && make && mv sfnt2woff-zopfli /usr/local/bin/sfnt2woff
git clone --recursive https://github.com/google/woff2.git && cd woff2 && make clean all && sudo mv woff2_compress /usr/local/bin/ && sudo mv woff2_decompress /usr/local/bin/
gem install fontcustom
```

关于 win 下如何使用，请参考文档（没有试过，不敢乱贴）

### 使用

基本命令只用四个：

- fontcustom compile my/vectors：将*my/vectors*中的`.svg`文件，编译生成字体图标到*fontcustom/*中
- fontcustom watch my/vectors：监控*my/vectors*目录，如果有改变，则自动进行编译
- fontcustom compile：使用*./fontcustom.yml* OR *config/fontcustom.yml*中的配置，进行编译（**强烈推荐**）
- fontcustom config：生成空的配置文件

操作步骤

1. 在项目目录中执行 `fontcustom config` 生成空白的配置文件 *fontcustom.yml*
2. 修改配置，核心配置以及说明见下

    ```
    # 设置字体名称，font-family 中指定需要
    font_name: icons

    # 字体图标 CSS 对应的选择器名称，{{glyph}}是图标名称
    # 例如：添加的图标名称为 foo.svg，
    # 则最后生成的 CSS 选择器名称为 `.i-foo`
    # 通过 <i class="i-foo"></i>即可使用图标
    css_selector: .i-{{glyph}}

    # 设置输入/输出信息
    # input：放置 svg 图标的目录
    input:
    vectors: assets/svg

    # output：生成的文件信息
    ## fonts：生成的字体存放目录
    ## css：css 格式文件存放位置，最终引入该文件即可
    ## preview：预览文件存放位置
    output:
    fonts: app/assets/fonts
    css: app/assets/stylesheets
    preview: app/views/styleguide

    # templates：生成的具体文件有哪些，这里会生成 .css, .scss 以及预览文件
    templates:
    - css
    - scss
    - preview
    ```
3. 执行命令：`fontcustom complie` 完成编译，生成需要的字体图标
4. 在项目中引入生成的样式文件（`app/assets/stylesheets/icon.css`）即可

这是一个一劳永逸的活儿，上诉内容你只需要配置一次，需要添加新的图标的时候，只需要将 icon-xxx.svg 拷贝到目录`my/vectors`中，然后再次执行命令`fontcustom complie` 就可以啦

只要你用过这个之后，你这辈子都不想用在线方式生成字体图标啦😤

这里有一个 [Demo](https://sanbaofengs.com/slaughter/css/font-icon/index.html) 可供参考

<iframe src="https://sanbaofengs.com/slaughter/css/font-icon/index.html"  frameborder="1" scrolling="no"> </iframe>

Demo 目录结构预览

```
.
├── app
│   ├── assets
│   │   ├── fonts                  // 生成的所有格式字体
│   │   │   ├── icons_91b9515c5e216be14df223e8d7345de8.eot
│   │   │   ├── icons_91b9515c5e216be14df223e8d7345de8.svg
│   │   │   ├── icons_91b9515c5e216be14df223e8d7345de8.ttf
│   │   │   ├── icons_91b9515c5e216be14df223e8d7345de8.woff
│   │   │   └── icons_91b9515c5e216be14df223e8d7345de8.woff2
│   │   └── stylesheets             
│   │       ├── _icons.scss
│   │       └── icons.css          // 需要引用的 css 文件
│   └── views                      // 预览文件目录
│       └── styleguide
│           └── icons-preview.html // 预览文件，预览所有生成的字体图标
├── assets                         // 存放 svg 字体原型文件夹
│   └── svg
│       └── elephent.svg
├── fontcustom.yml                 // fontcustom 配置文件
├── index.html
├── main.js
├── package-lock.json
└── package.json
```
