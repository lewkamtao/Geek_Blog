# Geek 博客

> 一个前端，写了一个博客，很简单，不强大。

## Build Setup

```bash
# 安装
$ npm install 或者 cnpm install

# 运行在 localhost:3000
$ npm run dev

# 打包和启动服务器构建
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### 项目介绍

项目中整合 vue + nuxt + axios + vuex + vue-router (nuxt 自带 vuex 和 vue-router)，一个基于 Nuxt 的服务器端渲染的博客

- 本主题基于 inis 开发的（https://inis.cc/）
- 免费开源
- 目前不支持过多的魔改，后续也不会支持
- 文章页富文本仅支持 md，因为自用，不喜欢过多样式，如果需要，可自行二次开发。
- 适用于会 nuxt 的选手进行二次开发，api 文档（https://docs.inis.cc/）

### [线上预览地址](https://blog.kamtao.com)

## 简单讲一下宝塔的安装教程

### 第一步

首先先安装一下 pm2 管理工具，去宝塔软件商店里面下载。
（如果已经安装，忽略此步骤）

### 第二步

下载之后我们去添加网站，这个自行绑定域名哦。

### 第三步

然后把整个 nuxt 项目拷贝到域名绑定的目录下

### 第四步

使用 ssh 工具连接你的服务器，之后进入到你网站目录里，如 cd /www/xxx,之后执行一下命令

```bash

# cd到网站目录
$ cd /www/xxx

# 安装依赖
$ npm install

# 构建你的项目
$ npm run build

# 运行
$ pm2 start

# 测试一下
$ pm2 list

# 如果看到一下的样子 说明成功了


```

### 第五步

这个时候如果没有啥问题的话就成功了，之后我们去设置反向代理，找到刚刚创建的网站，点击设置，找到反向代理，具体设置如图

### 第六步

这个时候访问一下，你的网址试试。到了这里基本就已经成功了。

> 如果无法访问，有可能是端口的问题。
> 阿里云、腾讯云在安全组那里开放一下，宝塔的安全组也要开放。

### 最后一步（重要）

点一个 star 哈哈哈
