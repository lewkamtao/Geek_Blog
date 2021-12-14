// 这是默认配置 用于第一次部署 开启设置之后，这个文件就不再生效了

export default {
  geek_config: {
    site_config: {
      title: "Geek", // 站点标题
      keywords: "Geek,博客,个人博客", // 关键词
      description: "一个前端写的一个博客", // 描述
      permit_no: `<div class="permit-no-text"  style="">粤ICP备18056223号</div>
            <style>
            .permit-no-text{
             line-height: 24px;text-align:center; color:#999
            }
            </style>`, // 备案号
      favicon_url: "https://tngeek.com/favicon.ico", // 站点ico
      logo_url: "https://cos.tngeek.com/logo.png", // 站点logo
      blog_site_url: "https://blog.kamtao.com/", // 博客地址
      adm_site_url: "", // 运营地址


      footer_html: `<div style=" line-height: 24px; color:#999">
      Powered by
      <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的 Vue 框架
      <br>Copyright (c) 2021-present, Kamtao (To) Lew
    </div>`, // 脚部html
    },

    images_config: {
      bg_about: "https://img.keai.cool/2021/08/09/317925aefec4b.webp",
      bg_links: "https://img.keai.cool/2021/08/09/9b328ede4b74c.webp",
      bg_msgwall: "https://img.keai.cool/2021/08/09/352c4682bfc83.webp",
      bg_timeline: "https://img.keai.cool/2021/08/09/456778ab7ef4e.webp",
    },
    contact_config: [],
    menu_config: [
      {
        value: "about",
        title: "关于",
        isShow: true,
      },
      {
        value: "photo",
        title: "图库",
        isShow: true,
      },
      {
        value: "time_line",
        title: "时光机",
        isShow: true,
      },
      {
        value: "music",
        title: "音乐",
        isShow: true,
      },
      {
        value: "links",
        title: "朋友",
        isShow: true,
      },
      {
        value: "msg_wall",
        title: "留言墙",
        isShow: true,
      },
      {
        value: "adm",
        title: "后台",
        isShow: true,
      },
    ],
  },
};
