---
title: 命令封装技巧
date: 2018-07-02 16:17:11
tags: ['Shell', 'Git', 'Commands']
---

在使用命令行时，经常会遇到执行一组命令的情况，当熟练使用这一组命令之后，重复输入显得很繁琐。这时将相关命令进行适当的封装，可以达到事半功倍的效果。

## *.zshrc*中封装命令

这种情况下，只需要添加一个 `function` 即可，示例如下：

```bash
function proxy_on() {
    export no_proxy="localhost,127.0.0.1,localaddress,.localdomain.com"
    export http_proxy="http://127.0.0.1:8118"
    export https_proxy=$http_proxy
    echo -e "Enjoy~"
}
```

这个是我在[命令行科学上网实践](https://sanbaofengs.com/2018/06/25/command-line-proxy/)中用到的，目的是为了开启命令行代理。详情参考之前文章。

## hexo 部署脚本优化

使用 *git* 检测是否有修改

```bash
git diff-index --quiet HEAD --
```

参考链接：https://stackoverflow.com/questions/5143795/how-can-i-check-in-a-bash-script-if-my-local-git-repository-has-changes

完整脚本

```bash
#!/bin/sh
if ! git diff-index --quiet HEAD --; then

# commit blogs to *blog*
git add -A
git commit -m 'update'
git push origin blog

# generate posts && deploy
hexo g
hexo d
else
echo 'Nothing has changed...'
fi
```
