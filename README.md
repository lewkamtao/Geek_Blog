# Geek Blog

> 新一代 Vue2 + Nuxt.js + Semantic UI 搭建的个人博客，支持服务端渲染。

## 链接

- 👥 演示站：<a href="https://blog.kamtao.com" target="_blank">https://blog.kamtao.com</a>

- 📘 inis 接口文档： <a href="https://inis.cc" target="_blank">https://inis.cc</a>

## 特征

- 服务端渲染

- 支持移动端

- 支持暗黑模式、圆滑和锐利模式。

- 代码拆分每一个 page

- 仅加载关键 css（页面级）

- 自定义底部等

- 路由平滑切换处理

## 安装

项目基于 inis 开发，相关 API 需要 inis 加持。

如未部署 inis 博客系统，请移步：https://inis.cn/#/article/1

#### 前期准备

- 安装好宝塔面板

- 一个可以连接你的服务器的 shh 工具

- 一颗坚持不懈的心（重要）

#### 第一步

首先先安装一下 pm2 管理工具，去宝塔软件商店里面下载。 （如果已经安装，忽略此步骤）

[![img](https://camo.githubusercontent.com/36e64aca2c5642203bae6eab7e4462578cff57b298c236eaaf0fa111d434a0f2/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f254535254145253839254538254133253835504d322545352539322538436e6f64652e706e6721637573746f6d)](https://camo.githubusercontent.com/36e64aca2c5642203bae6eab7e4462578cff57b298c236eaaf0fa111d434a0f2/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f254535254145253839254538254133253835504d322545352539322538436e6f64652e706e6721637573746f6d)

#### 第二步

添加站点，这个自行绑定域名哦

[![img](https://camo.githubusercontent.com/08fdce4b08eec8eb07c41d7278845ce16dc8b28a7ad79100895cd6dcf3882ded/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545362542372542422545352538412541302545372541422539392545372538322542392e706e6721637573746f6d)](https://camo.githubusercontent.com/08fdce4b08eec8eb07c41d7278845ce16dc8b28a7ad79100895cd6dcf3882ded/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545362542372542422545352538412541302545372541422539392545372538322542392e706e6721637573746f6d)

#### 第三步

然后把整个 nuxt 项目拷贝到域名绑定的目录下（这个目录位置是上一步的目录）

[![img](https://camo.githubusercontent.com/19f62297010357d8ca56bf688118bb982f307914154132b6eb6cb8a861464eef/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545392541312542392545372539422541452545362539342542452545352539432541382545372539422541452545352542442539352545392538372538432545392539442541322e706e6721637573746f6d)](https://camo.githubusercontent.com/19f62297010357d8ca56bf688118bb982f307914154132b6eb6cb8a861464eef/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545392541312542392545372539422541452545362539342542452545352539432541382545372539422541452545352542442539352545392538372538432545392539442541322e706e6721637573746f6d)

然后打开，项目文件 nuxt.config.js，把 api 地址修改为你的后台接口的域名，见图示。

[![img](https://camo.githubusercontent.com/f319606c4a5e6d7e8998edd92dfaa6fce4d5ecc57760f6f91b9f8291c842dc2b/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545342542462541452545362539342542392545362539362538372545342542422542362e706e6721637573746f6d)](https://camo.githubusercontent.com/f319606c4a5e6d7e8998edd92dfaa6fce4d5ecc57760f6f91b9f8291c842dc2b/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545342542462541452545362539342542392545362539362538372545342542422542362e706e6721637573746f6d)

[![img](https://camo.githubusercontent.com/3e212e267b43f9755d080aa8c8e4be8e9ddadb419a047b44252e66cd4887147e/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545342542462541452545362539342542392545362538452541352545352538462541332545352539432542302545352539442538302e706e6721637573746f6d)](https://camo.githubusercontent.com/3e212e267b43f9755d080aa8c8e4be8e9ddadb419a047b44252e66cd4887147e/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545342542462541452545362539342542392545362538452541352545352538462541332545352539432542302545352539442538302e706e6721637573746f6d)

#### 第四步

使用 ssh 工具连接你的服务器，之后进入到你网站目录里，如 cd /www/xxx,之后执行一下命令

```
# cd到网站目录（是你的项目目录）
$ cd /www/xxx

# 安装依赖（请注意 要在你的站点目录下执行）
$ npm install  或者 cnpm install

# 构建你的项目
$ npm run build 或者 nuxt build

# 运行
$ pm2 start

# 测试一下
$ pm2 list

# 如果看到以下的样子 说明成功了
```

[![img](https://camo.githubusercontent.com/e5d8a9fc6f8202d2cc14430d786e26800920fa93c089909f885b5aeef22687c7/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f254539253833254138254537254244254232706d322545352541452538432545362538382539302545372539412538342545362541302542372545352541442539302e706e6721637573746f6d)](https://camo.githubusercontent.com/e5d8a9fc6f8202d2cc14430d786e26800920fa93c089909f885b5aeef22687c7/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f254539253833254138254537254244254232706d322545352541452538432545362538382539302545372539412538342545362541302542372545352541442539302e706e6721637573746f6d)

#### 第五步

这个时候如果没有啥问题的话就成功了，之后我们去设置反向代理，找到刚刚创建的网站，点击设置，找到反向代理，具体设置如图

[![img](https://camo.githubusercontent.com/706fed7539de9fd637ea3a52196b42f17d927f03377d59a9956691ac56adac81/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545372541422541462545352538462541332545342542462539442545362538432538312545342542382538302545382538372542342e706e6721637573746f6d)](https://camo.githubusercontent.com/706fed7539de9fd637ea3a52196b42f17d927f03377d59a9956691ac56adac81/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545372541422541462545352538462541332545342542462539442545362538432538312545342542382538302545382538372542342e706e6721637573746f6d)

> 特别的：如果你当前的端口和你已经设置的冲突，那可以修改端口（在项目文件根目录的 ecosystem.config.js），请注意修改后要重启 PM2。(如果端口没有冲突，请忽略）

```
# 重启PM2
$ pm2 restart all
```

[![img](https://camo.githubusercontent.com/175699c48459358160fbb6b0f85c2dfacab3cfd42d0d24c6314993e583e2f76d/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545362539422542342545362539342542392545372541422541462545352538462541332e706e6721637573746f6d)](https://camo.githubusercontent.com/175699c48459358160fbb6b0f85c2dfacab3cfd42d0d24c6314993e583e2f76d/68747470733a2f2f746e6765656b2d6d616c6c2d313235353331303634372e636f732e61702d6775616e677a686f752e6d7971636c6f75642e636f6d2f7075626c69632f6765656b5f626c6f675f726561646d652f2545362539422542342545362539342542392545372541422541462545352538462541332e706e6721637573746f6d)

#### 最后一步

- 这个时候访问一下，你的网址试试。到了这里基本就已经成功了。

> 如果仍然无法访问，有可能是端口的问题。 阿里云、腾讯云在安全组那里开放一下，宝塔的安全组也要开放。

enjoy it!

## 反馈

安装和使用过程中，如果遇到问题，请给作者提 [Issue](https://github.com/lewkamtao/geek-blog/issues) 。
qq 交流群：632274746

## 贡献

欢迎小伙伴以各种形式的贡献，包括但不限于：界面、功能、改进、 修复 Bug 等。
