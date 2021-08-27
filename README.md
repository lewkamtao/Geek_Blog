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
- api 文档（https://docs.inis.cc/）

### [线上预览地址](https://blog.kamtao.com)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_1.png!custom)

## 简单讲一下宝塔的安装教程（大佬请忽略）

### 前期准备

- 安装好宝塔面板
- 一个可以连接你的服务器的 shh 工具
- 一颗坚持不懈的心（重要）

### 第一步

首先先安装一下 pm2 管理工具，去宝塔软件商店里面下载。
（如果已经安装，忽略此步骤）

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E5%AE%89%E8%A3%85PM2%E5%92%8Cnode.png!custom" style="zoom:50%;" />

### 第二步

添加站点，这个自行绑定域名哦

[这是教程，如果会的，请忽略]: https://jingyan.baidu.com/article/eae07827e0a9ff5eec548591.html

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E6%B7%BB%E5%8A%A0%E7%AB%99%E7%82%B9.png!custom" style="zoom: 50%;" />

### 第三步

然后把整个 nuxt 项目拷贝到域名绑定的目录下（这个目录位置是上一步的目录）

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E9%A1%B9%E7%9B%AE%E6%94%BE%E5%9C%A8%E7%9B%AE%E5%BD%95%E9%87%8C%E9%9D%A2.png!custom" style="zoom:50%;" />

然后打开，项目文件 nuxt.config.js，把 api 地址修改为你的后台接口的域名，见图示。

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E4%BF%AE%E6%94%B9%E6%96%87%E4%BB%B6.png!custom" style="zoom: 50%;" />

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E4%BF%AE%E6%94%B9%E6%8E%A5%E5%8F%A3%E5%9C%B0%E5%9D%80.png!custom" style="zoom:50%;" />

### 第四步

使用 ssh 工具连接你的服务器，之后进入到你网站目录里，如 cd /www/xxx,之后执行一下命令

```bash

# cd到网站目录
$ cd /www/xxx

# 安装依赖（请注意 要在你的站点目录下执行）
$ npm install

# 构建你的项目
$ npm run build

# 运行
$ pm2 start

# 测试一下
$ pm2 list

# 如果看到以下的样子 说明成功了
```

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E9%83%A8%E7%BD%B2pm2%E5%AE%8C%E6%88%90%E7%9A%84%E6%A0%B7%E5%AD%90.png!custom" style="zoom:50%;" />

### 第五步

这个时候如果没有啥问题的话就成功了，之后我们去设置反向代理，找到刚刚创建的网站，点击设置，找到反向代理，具体设置如图

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E7%AB%AF%E5%8F%A3%E4%BF%9D%E6%8C%81%E4%B8%80%E8%87%B4.png!custom" style="zoom:50%;" />

> 特别的：如果你当前的端口和你已经设置的冲突，那可以修改端口（在项目文件根目录的 ecosystem.config.js），请注意修改后要重启 PM2。(如果端口没有冲突，请忽略）

```bash
# 重启PM2
$ pm2 restart all
```

<img src="https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/%E6%9B%B4%E6%94%B9%E7%AB%AF%E5%8F%A3.png!custom" style="zoom:50%;" />

### 第六步

- 这个时候访问一下，你的网址试试。到了这里基本就已经成功了。

> 如果仍然无法访问，有可能是端口的问题。
> 阿里云、腾讯云在安全组那里开放一下，宝塔的安全组也要开放。

### 最后一步（重要）

- 点一个 star

### 联系

如果你遇到了问题，很乐意为你解答

mail：div@kamtao.com

QQ：1057072668

### 预览图

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_1.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_2.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_3.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_4.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_5.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_6.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_7.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_8.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_9.png!custom)

![](https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/geek_blog_readme/geek_10.png!custom)
