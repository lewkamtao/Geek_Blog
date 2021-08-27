<template>
  <div class="setting-wrapper part">
    <div v-if="geek_config_form" class="form">
      <div class="title">设置</div>
      <div class="subTitle">菜单显示设置</div>
      <fieldset class="form-group">
        <label class="paper-switch-label">关于</label>
        <label class="paper-switch">
          <input
            type="checkbox"
            v-model="geek_config_form.menu_switch.about"
            checked
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <!-- 暂时没开发好 -->
      <!-- <fieldset class="form-group">
        <label class="paper-switch-label">相册</label>
        <label class="paper-switch">
          <input
            v-model="geek_config_form.menu_switch.photo"
            type="checkbox"
            checked
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset> -->

      <fieldset class="form-group">
        <label class="paper-switch-label">时光机</label>
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
        <label class="paper-switch-label">音乐</label>
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
        <label class="paper-switch-label">朋友</label>
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
        <label class="paper-switch-label">留言墙</label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.menu_switch.msg_wall"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label class="paper-switch-label">后台管理</label>
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
        <label>博客标题</label>
        <input type="text" v-model="geek_config_form.site_info.title" />
      </div>
      <div class="form-group">
        <label>关键字（SEO）</label>
        <input v-model="geek_config_form.site_info.keywords" type="text" />
      </div>
      <div class="form-group">
        <label>站点描述（SEO）</label>
        <textarea
          v-model="geek_config_form.site_info.description"
          id="footer"
        ></textarea>
      </div>
      <div class="form-group">
        <label>备案信息 (支持html)</label>
        <textarea
          v-model="geek_config_form.site_info.permit_no"
          type="text"
          id="footer"
        ></textarea>
      </div>
      <div class="form-group">
        <label>站点 favicon 图标</label>
        <input v-model="geek_config_form.site_info.favicon_url" type="text" />
      </div>
      <div class="form-group">
        <label>站点 Logo 链接</label>
        <input v-model="geek_config_form.site_info.logo_url" type="text" />
      </div>
      <div class="form-group">
        <label>时光机头部背景图链接</label>
        <input v-model="geek_config_form.site_info.timeline_bg" type="text" />
      </div>
      <div class="form-group">
        <label>关于头部背景图链接</label>
        <input v-model="geek_config_form.site_info.about_bg" type="text" />
      </div>
      <div class="form-group">
        <label>朋友头部背景图链接</label>
        <input v-model="geek_config_form.site_info.links_bg" type="text" />
      </div>

      <div class="form-group">
        <label>站点地址</label>
        <input v-model="geek_config_form.site_info.blog_site_url" type="text" />
      </div>
      <div class="form-group">
        <label>后台地址</label>
        <input v-model="geek_config_form.site_info.adm_site_url" type="text" />
      </div>
      <div class="form-group">
        <label>歌单ID</label>
        <input v-model="geek_config_form.site_info.song_list_id" type="text" />
      </div>
      <!-- <div class="form-group">
        <label>建站日期（用于运行天数）</label>
        <input v-model="geek_config_form.site_info.adm_site_url" type="date" />
      </div>-->
      <div class="form-group">
        <label for="footer">页面脚部 (支持html)</label>
        <textarea
          v-model="geek_config_form.site_info.footer_html"
          id="footer"
        ></textarea>
      </div>

      <div class="subTitle">博主信息</div>
      <div class="form-group">
        <label>博主名</label>
        <input v-model="geek_config_form.master_info.nickname" type="text" />
      </div>
      <div class="form-group">
        <label>简介</label>
        <textarea
          v-model="geek_config_form.master_info.description"
          id="footer"
        ></textarea>
      </div>
      <div class="form-group">
        <label>手机</label>
        <input v-model="geek_config_form.master_info.phone" type="text" />
      </div>
      <div class="form-group">
        <label>邮箱</label>
        <input v-model="geek_config_form.master_info.email" type="text" />
      </div>

      <div class="form-group">
        <label>头像</label>
        <input v-model="geek_config_form.master_info.head_img" type="text" />
      </div>

      <div class="form-subTitle"># 关于 - 右侧模块显示设置</div>
      <fieldset class="form-group">
        <label class="paper-switch-label"> 联系方式 </label>
        <label class="paper-switch">
          <input
            type="checkbox"
            checked
            v-model="geek_config_form.master_info.concact_switch"
          />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>
      <div
        class="contact"
        v-for="(item, index) in geek_config_form.master_info.concact_array"
        :key="index"
      >
        <div class="left">
          <div class="form-group">
            <label>平台</label>
            <select v-model="item.key">
              <option
                v-for="(op_item, index) in concact_options"
                :key="index"
                :value="op_item.value"
              >
                {{ op_item.label }}
              </option>
            </select>
          </div>
        </div>
        <div class="right">
          <div class="form-group">
            <label>联系方式 / 地址</label>
            <input class="input-block" v-model="item.value" type="text" />
          </div>
        </div>
        <button
          class="add-btn"
          @click="addConcactItem"
          v-show="
            index == geek_config_form.master_info.concact_array.length - 1
          "
        >
          添加
        </button>
      </div>
    </div>
    <p>
      注意链接如需添加昵称在url中加入参数，例如：https://weibo.com/u/5107135569?nickname=小卢他人不错(如不需要，留空即可，保存自动清除空值)
    </p>
    <div class="row flex-center">
      <button @click="submit" class="btn-block save-btn">保存配置</button>
    </div>
  </div>
</template>

<script>
import first_geek_config from "@/util/geek.config.js";

export default {
  components: {},
  props: {},
  data() {
    return {
      geek_config_form: false,
      checkSubmit: 0,
      concact_options: [
        {
          label: "手机",
          value: "Phone",
        },
        {
          label: "QQ",
          value: "QQ",
        },
        {
          label: "微信",
          value: "Wechat",
        },
        {
          label: "微博",
          value: "Weibo",
        },
        {
          label: "邮箱",
          value: "Mail",
        },
        {
          label: "Github",
          value: "Github",
        },

        {
          label: "Instagram",
          value: "Instagram",
        },
        {
          label: "Twitter",
          value: "Twitter",
        },
        {
          label: "Wordpress",
          value: "Wordpress",
        },
        {
          label: "Youtube",
          value: "Youtube",
        },
      ],
    };
  },
  watch: {},
  computed: {},
  methods: {
    addConcactItem() {
      this.geek_config_form.master_info.concact_array.push({
        key: "",
        value: "",
      });
    },
    async getOption() {
      const res_geek_config = await this.$axios.get(
        "/options?key=geek_config&cache=false"
      );
      if (res_geek_config.code == 200 && res_geek_config.data.opt) {
        this.geek_config_form = res_geek_config.data.opt;
        if (this.geek_config_form.master_info.concact_array.length == 0) {
          this.geek_config_form.master_info.concact_array[0] = {
            key: "",
            value: "",
          };
        }
      } else {
        this.geek_config_form = first_geek_config.geek_config;
      }
    },
    submit() {
      if (this.$cookies.get("token")) {
        var form = JSON.parse(JSON.stringify(this.geek_config_form));

        form.master_info.concact_array = form.master_info.concact_array.filter(
          (item) => {
            return item.key != "" && item.value != "";
          }
        );

        var data = {
          "login-token": this.$cookies.get("token"),
          keys: "geek_config",
          opt: form,
        };

        this.$axios.post("/options", data).then((res) => {
          if (res.code == 200) {
            this.checkSubmit += 1;
            this.reload();
          }
        });

        var userdata = {
          "login-token": this.$cookies.get("token"),
          id: this.$cookies.get("user").id,
          nickname: this.geek_config_form.master_info.nickname,
          description: this.geek_config_form.master_info.description,
          email: this.geek_config_form.master_info.email,
          phone: this.geek_config_form.master_info.phone,
          head_img: this.geek_config_form.master_info.head_img,
        };

        this.$axios.post("/users", userdata).then((res) => {
          if (res.code == 200) {
            this.checkSubmit += 1;
            this.reload();
          }
        });
      }
    },
    reload() {
      if (this.checkSubmit == 2) {
        location.reload();
      }
    },
  },
  created() {
    this.getOption();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.setting-wrapper {
  min-height: calc(100vh - 70px);
}
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
    position: relative;
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
    .add-btn {
      position: absolute;
      right: -70px;
      font-size: 14px;
      bottom: 20px;
      padding: 0px;
      width: 60px;
      height: 40px;
      line-height: 40px;
    }
  }
}
.save-btn {
  position: fixed;
  top: 47px;
  right: 110px;
  width: 100px;
  margin-top: 30px;
  font-size: 16px;
  height: 40px;
  padding: 0px;
}
@media screen and (max-width: 1025px) {
  .form {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
  .form {
    .save-btn {
      bottom: 30px;
      transform: translateX(calc(-50%));
    }
  }
}
</style>
