// 这是默认配置 用于第一次部署 开启通用设置之后，这个文件就不再生效了

export default {
    geek_config: {
        site_info: {
            title: "Geek2", // 站点标题
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
            song_list_id: "3",
            footer_html: `<div style=" line-height: 24px; color:#999">
            Powered by
            <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的Vue框架
            <br>Copyright (c) 2021-present, Kamtao (To) Lew
          </div>` // 脚部html
        },
        master_info: {
            name: "小卢他人不错",
            intro: "98年前端工程师，做一个很酷的人。",
            avatar_url: "https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100",
            about_detail_html: ``
        },
        menu_switch: {
            about: true,
            photo: true,
            time_line: true,
            music_box: true,
            links: true,
            message: true,
            adm: true
        }
    }
}