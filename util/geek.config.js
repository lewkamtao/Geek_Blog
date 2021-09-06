// 这是默认配置 用于第一次部署 开启设置之后，这个文件就不再生效了

export default {
  geek_config: {
    site_config: {
      title: "Geek(请用inis账号登录后前往通用设置配置初始信息)", // 站点标题
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
      adm_site_url: "https://api.kamtao.com/", // 运营地址
      footer_html: `<div style=" line-height: 24px; color:#999">
      Powered by
      <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的Vue框架
      <br>Copyright (c) 2021-present, Kamtao (To) Lew
    </div>` // 脚部html
    },

    master_config: {
      nickname: "",
      description: "",
      email: "",
      phone: "",
      head_img: ""
    },
    images_config: {
      bg_about: "",
      bg_timeline: "",
      bg_msgwall: ""
    },

    contact_config: [],
    menu_config: [
      {
        value: "about",
        title: "关于",
        isShow: false
      },
      // {
      //   value: "photo",
      //   title: "相册",
      //   isShow: false,
      // },
      {
        value: "time_line",
        title: "时光机",
        isShow: false
      },
      {
        value: "music",
        title: "音乐",
        isShow: false
      },
      {
        value: "links",
        title: "朋友",
        isShow: false
      },
      {
        value: "msg_wall",
        title: "留言墙",
        isShow: false
      },
      {
        value: "adm",
        title: "后台",
        isShow: false
      }
    ]
  }
};
