---
title: Vanilla Tilt 源码阅读总结
tags:
  - JS
  - vanilla-tilt
  - 源码阅读
date: 2018-05-08 19:29:11
---


## 关于 vanilla tilt

[vanilla-tilt](https://micku7zu.github.io/vanilla-tilt.js/) 是一个 3D 倾斜的 JavaScript 库，具有以下特点
- 流畅
- 轻量级
- 60FPS
- 原生 JS
- 不依赖第三方库
- 简单易用

Ps：详情请参考其[官网](https://micku7zu.github.io/vanilla-tilt.js/)

举个栗子

<iframe src="https://sanbaofengs.com/slaughter/js/vanillaTilt/"  frameborder="1" scrolling="no"> </iframe>

本文主要记录对 vanilla-tilt 源码阅读的过程

## 作用域包裹

老套路，使用 **立即执行函数** 将自己的业务逻辑包裹起来，这么做的好处：

- **避免全局污染**：所有库相关的逻辑，定义的变量，以及使用到的变量，统统封装到该函数作用域中
- **隐私保护**：但凡在立即执行函数中声明的变量，函数，除非自己想要暴露，否则从外界是不可能获取的

```js
var VanillaTilt = (function (){
    // add your logic
}())
```

## 自动加载 & 批量初始化

核心类采用 ES6 的 `class` 进行编写，使用类的静态方法 *static init (elements, settings)*，对元素进行初始化

### 自动加载

当加载 `vanilla-tilt` 库之后，校验是否处在浏览器环境，如果是，则对设置了 `data-tilt` 属性的元素进行初始化

```js
if (document !== undefined) {
    // init
    // ...
    VanillaTilt.inti(document.querySelectorAll('[data-tilt]'));
}
```

### 批量初始化

在类 VanillaTilt 的静态方法 init 中，优先对元素进行一系列的校验，详情看以下注释

```js
static init (elements, settings) {
    // 检测 elements 是否为节点类型
    // 在用户手动调用 init 的时候可能触发
    if (elements instanceof Node) {
        elements = [elements];
    }
    // 检测 elements 是否是 NodeList
    // 自动加载 || 用户手动调用 init 时触发
    if (elements instanceof NodeList) {
        // NodeList to Array
        elements = [].slice.call(elements);
    }

    // elememts 必须为 Array 类型
    // 原因：后续讲调用 Array 有关方法
    if (!(elements instanceof Array)) {
        return ;
    }

    elements.forEach((element) => {
        // 检测元素是否含有 vanillaTilt 属性
        // 防止元素重复注册
        if (!('vanillaTilt' in element)) {
            element.vanillaTilt = new VanillaTilt(element, settings);
        }
    })
}
```

## 初始化 `setting`

`settings` 指定方法
- 初始化时，以对象的方式传入初始化函数
```html
<script type="text/javascript">
VanillaTilt.init(document.querySelector(".your-element"), {
    max: 25,
    speed: 400
});
</script>
```
- 以`HTML 属性`方式指定有关属性
```html
<div data-tilt data-tilt-reverse="true"></div>
```

实现的核心代码 & 解读

```js
extendSettings(settings) {
    // 初始值
    let defaultSettings = {
        // ...
    };

    let newSettings = {};
    // 循环全量的 defaultSettings
    for (var property in defaultSettings) {
        if (property in settings) {
            // 通过对象传入 settings；检测用户是否指定对应的属性值
            newSettings[property] = settings[property];
        } else if (this.element.hasAttribute("data-tilt-" + property)) {
            // 通过 HTML 属性方式传入属性值
            let attribute = this.element.getAttribute("data-tilt-" + property);
            // 这里为啥要使用 try/catch，防止 JSON.parse 解析失败？
            // JSON.parse 解析可能失败的情况，举个栗子
            // 在 HTML 中 这样设置 data-tilt-reverse="" 时；使用 JSON.parse 会报错
            // 但是在这种情况下该框架认为设置的 reverse 值为 true；
            // 同时自己实现了一个 function isSettingTrue 来检测
            try {
                // 通过 getAttribute 获取的值是 String；使用 JSON.parse 将结果转化为 Javascript 值
                newSettings[property] = JSON.parse(attribute);
            } catch (e) {
                // JSON.parse 失败， 直接将获取的属性值赋值给新属性值
                newSettings[property] = attribute;
            }
        } else {
            // 没有指定有关属性，直接使用默认值
            newSettings[property] = defaultSettings[property];
        }
    }

    return newSettings;
}
```

## 自定义真值检测

为了同时兼容以上提到的两种 `settings` 设置方式，本库自定义了一个真值检测函数

```js
// 原因：用户可能指定 data-tilt-reverse="" 方式，本库认为，reverse 值为 true
isSettingTrue (data) {
    return data == '' || data == true || data == 1)
}
```

## 使用 `bind` 显示指定`this`

使用如 `this.onMouseEnterBind = this.onMouseEnter.bind(this);` 的方法，显示的指定 `this`

## 三大事件处理函数

### onMouseEnter

确定元素位置

```js
// 返回元素的大小 && 相对于视口的位置
// 返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合
const rect = this.element.getBoundingClientRect();
```

![](https://imgs.sanbaofengs.com/18-5-8/55951300.jpg)

使用 `will-change` 进行优化

```js
this.element.style.willChange = "transform";
```

防抖处理

详情见 `setTransition ()` 方法

### onMouseMove

这个库的核心代码

使用 `requestAnimationFrame` 进行节流处理，防止动画触发太过于频繁

两个方法

- getValue：参数值处理

```js
getValues() {
    // event.clientX/clientY：鼠标到视口左上角的距离
    // 计算得到的 x/y 表示鼠标点击位置占被点击元素的比例
    let x = (this.event.clientX - this.left) / this.width;
    let y = (this.event.clientY - this.top) / this.height;

    // 将 x/y 的值限制在区间 [0, 1] 中
    x = Math.min(Math.max(x, 0), 1);
    y = Math.min(Math.max(y, 0), 1);

    // 计算倾斜值：this.settings.max / 2 - x * this.settings.max 相当于，从中点开始计算
    // 问题：为啥要保留两位小数
    let tiltX = (this.reverse * (this.settings.max / 2 - x * this.settings.max)).toFixed(2);
    let tiltY = (this.reverse * (y * this.settings.max - this.settings.max / 2)).toFixed(2);
    // 计算角度
    let angle = Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI);

    return {
        tiltX: tiltX,
        tiltY: tiltY,
        percentageX: x * 100,
        percentageY: y * 100,
        angle: angle
    };
}
```

- update：更新动画

```js
update() {
    let values = this.getValues();

    // perspective：透视；指定观察者到 z=0 平面的距离，使具有三维变换的元素产生透视效果
    this.element.style.transform = "perspective(" + this.settings.perspective + "px) " +
        "rotateX(" + (this.settings.axis === "x" ? 0 : values.tiltY) + "deg) " +
        "rotateY(" + (this.settings.axis === "y" ? 0 : values.tiltX) + "deg) " +
        "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")";

    if (this.glare) {
        this.glareElement.style.transform = `rotate(${values.angle}deg) translate(-50%, -50%)`;
        this.glareElement.style.opacity = `${values.percentageY * this.settings["max-glare"] / 100}`;
    }

    // 问题：这里为啥会有一个事件
    // 对外暴露
    this.element.dispatchEvent(new CustomEvent("tiltChange", {
        "detail": values
    }));

    this.updateCall = null;
}
```

### onMouseLeave

根据配置，将元素是否恢复到原始状态

## Tricks

- 使用 JSON.parse 将获取属性值（字符串）转化为 JavaScript 值

```js
JSON.parse('true')  // true (boolean)
```

完整注释版 [vanilla-tilt.js](https://sanbaofengs.com/slaughter/js/vanillaTilt/vanilla-tilt.js)

## 写在最后

27 行核心代码写一个简版的

```js
function $ (element) {
    return document.querySelector(element);
}

const tilter = $('#tilt');
const max = 35;

function doTilt (e) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const rect = this.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;

    const tiltX = max / 2 - (clientX - left) / width * max;
    const tiltY = (clientY - top) / height * max - max / 2;

    this.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;
}

function reset () {
    this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
}

tilter.addEventListener ('mousemove', doTilt);
tilter.addEventListener('mouseleave', reset);
```

效果：

<iframe src="https://sanbaofengs.com/slaughter/js/vanillaTilt/myTilt.html"  frameborder="1" scrolling="no"> </iframe>
