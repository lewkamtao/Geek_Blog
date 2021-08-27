// 这是默认配置 用于第一次部署 开启设置之后，这个文件就不再生效了

export default {
  geek_config: {
    site_info: {
      title: "Geek(请用inis账号登录后前往设置配置初始信息)", // 站点标题
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

      timeline_bg: "https://img.keai.cool/2021/08/09/a11d5c69b9894.webp", // 朋友圈背景
      about_bg: "http://www.dmoe.cc/random.php", // 关于背景
      links_bg: "http://www.dmoe.cc/random.php", // 朋友圈背景
      song_list_id: "3",
      footer_html: `<div style=" line-height: 24px; color:#999">
            Powered by
            <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的Vue框架
            <br>Copyright (c) 2021-present, Kamtao (To) Lew
          </div>` // 脚部html
    },
    master_info: {
      nickname: "小卢他人不错",
      description: "98年前端工程师，做一个很酷的人。",
      email: "",
      phone: "",
      concact_array: [],
      concact_switch: true,
      head_img: "https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100",
      about_detail_html: ``
    },
    menu_switch: {
      about: true,
      photo: false,
      time_line: true,
      music_box: true,
      links: true,
      msg_wall: true,
      adm: true
    }
  }
};
