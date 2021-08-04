<template>
  <div class="setting part">
    <div class="form">
      <div class="title">通用设置</div>
      <div class="subTitle">菜单显示设置</div>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 关于我 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            v-model="geek_config_form.menu_switch.about"
            checked
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 相册 </label>
        <label class="paper-switch">
          <input
            v-model="geek_config_form.menu_switch.photo"
            type="checkbox"
            checked
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 时光机 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.time_line"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 音乐 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.music_box"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 友情链接 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.links"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 留言墙 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.message"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 后台管理 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.adm"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <div class="subTitle">站点设置</div>
      <div class="form-group">
        <label for="back_site_url">博客标题</label>
        <input
          type="text"
          v-model="geek_config_form.site_info.title"
          placeholder="是一尘不染的猫"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">关键字（SEO）</label>
        <input
          v-model="geek_config_form.site_info.keywords"
          type="text"
          placeholder="Geek,博客,个人博客"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点简介</label>
        <textarea
          v-model="geek_config_form.site_info.intro"
          id="footer"
          placeholder="Powered by inis | 本站自豪使用了全世界最好的Vue框架 <br> Copyright (c) 2021-present, Kamtao (To) Lew"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="back_site_url">备案信息 (支持html)</label>
        <input
          v-model="geek_config_form.site_info.permit_no"
          type="text"
          placeholder="粤ICP备18056223号"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点 favicon 图标</label>
        <input
          v-model="geek_config_form.site_info.favicon_url"
          type="text"
          placeholder="https://tngeek.com/favicon.ico"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点 Logo 链接</label>
        <input
          v-model="geek_config_form.site_info.logo_url"
          type="text"
          placeholder="https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点地址</label>
        <input
          v-model="geek_config_form.site_info.blog_site_url"
          type="text"
          placeholder="https://api.kamtao.com/"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">后台地址</label>
        <input
          v-model="geek_config_form.site_info.adm_site_url"
          type="text"
          placeholder="https://api.kamtao.com/"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="footer">页面脚部 (支持html)</label>
        <textarea
          v-model="geek_config_form.site_info.footer_html"
          id="footer"
          placeholder="Powered by inis | 本站自豪使用了全世界最好的Vue框架 <br> Copyright (c) 2021-present, Kamtao (To) Lew"
        ></textarea>
      </div>

      <div class="subTitle">博主信息</div>
      <div class="form-group">
        <label for="back_site_url">博主名</label>
        <input type="text" placeholder="是一尘不染的猫" id="back_site_url" />
      </div>
      <div class="form-group">
        <label for="back_site_url">简介</label>
        <textarea
          v-model="geek_config_form.master_info.intro"
          id="footer"
          placeholder="Powered by inis | 本站自豪使用了全世界最好的Vue框架 <br> Copyright (c) 2021-present, Kamtao (To) Lew"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="back_site_url">头像</label>
        <input
          v-model="geek_config_form.master_info.avatar_url"
          type="text"
          placeholder="是一尘不染的猫"
          id="back_site_url"
        />
      </div>

      <div class="form-subTitle"># 关于我 - 页面配置</div>
      <div class="form-group">
        <label for="footer"
          >页面主体自定义HTML文本（这个页面高度个性化，支持html，可以自行发挥。暂不支持js）</label
        >
        <textarea
          v-model="geek_config_form.master_info.body_html"
          id="footer"
          placeholder="Powered by inis | 本站自豪使用了全世界最好的Vue框架 <br> Copyright (c) 2021-present, Kamtao (To) Lew"
        ></textarea>
      </div>
      <!-- <div class="form-subTitle"># 右侧模块显示设置</div>

      <fieldset class="form-group">
        <label class="paper-switch-label"> 联系方式 </label>
        <label class="paper-switch">
          <input type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>
      <div class="contact">
        <div class="left">
          <div class="form-group">
            <label for="paperSelects1">平台</label>
            <select id="paperSelects1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
        <div class="right">
          <div class="form-group">
            <label for="paperInputs3">联系方式 / 地址</label>
            <input class="input-block" type="text" id="paperInputs3" />
          </div>
        </div> 
  </div> -->
      <div class="row flex-center">
        <button @click="submit" class="btn-block save-btn">保存配置</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      geek_config_form: {
        site_info: {
          title: "Geek", // 站点标题
          keywords: "极简,清新,博客", // 关键词
          intro: "一个前端写的一个博客", // 介绍
          permit_no: `<div>粤ICP备18056223号</div>`, // 备案号
          favicon_url: "https://tngeek.com/favicon.ico", // 站点ico
          logo_url: "https://cos.tngeek.com/logo.png", // 站点logo
          blog_site_url: "https://blog.kamtao.com/", // 博客地址
          adm_site_url: "https://api.kamtao.com/", // 运营地址
          footer_html: `<div>
    Powered by
    <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的Vue框架
    <br>Copyright (c) 2021-present, Kamtao (To) Lew
  </div>`, // 脚部html
        },
        master_info: {
          name: "小卢他人不错",
          intro: "98年前端工程师，做一个很酷的人。",
          avatar_url: "https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100",
          body_html: `<h1>测试</h1>`,
        },
        menu_switch: {
          about: false,
          photo: false,
          time_line: false,
          music_box: false,
          links: false,
          message: false,
          adm: false,
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getOption() {
      const options = (await this.$axios.get("/options")).data;
      console.log(options);
    },
    submit() {
      var data = {};
      if (this.$cookies.get("token")) {
        data["login-token"] = this.$cookies.get("token");
      }
      data.keys = "geek_config";
      data.opt = JSON.parse(JSON.stringify(this.geek_config_form));
      this.$axios.post("/options", data).then((res) => {
        if (res.code == 200) {
          setTimeout(function () {
            location.reload();
          }, 200);
        }
      });
    },
  },
  created() {
    this.getOption();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.form {
  max-width: 600px;
  min-width: 500px;
  margin: 0 auto;
  padding: 60px 0px;
  .title {
    font-weight: bold;
    font-size: 28px;
    color: #000;
    padding-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    margin-top: 50px;
    padding: 40px 0px;
    font-weight: bold;
    color: #000;
    border-top: 1px #999 solid;
  }
  .form-group {
    margin-bottom: 20px;
    label {
      font-size: 14px;
      margin: 10px 20px 10px 0px;
    }
    .paper-switch {
      width: 60px;
    }
    .paper-switch-label {
      width: 80px;
    }
    input {
      padding: 10px;
      width: 100%;
      font-size: 14px;
    }
    textarea {
      height: 120px;
      width: 100%;
      padding: 20px 10px;
      font-size: 14px;
    }
  }
  .form-subTitle {
    font-weight: bold;
    margin: 50px 0px 30px 0px;
  }
  .contact {
    display: flex;
    margin-bottom: 0px;
    .left {
      margin-right: 20px;
      select {
        font-size: 14px;
        width: 150px;
        height: 40px;
      }
    }
    .right {
      width: calc(100% - 170px);
    }
  }
  .save-btn {
    width: 200px;
    margin-top: 30px;
    font-size: 16px;
    height: 40px;
    padding: 0px;
  }
}
</style>