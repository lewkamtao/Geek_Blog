<template>
  <div class="part" style="marin-top:0px">
    <form class="ui form">
      <h1 style="margin-bottom: 30px" id="setting_menu">设置</h1>
      <div class="ui message">
        <div class="header">
          <font style="vertical-align: inherit"
            ><font style="vertical-align: inherit"> 新网站功能 </font></font
          >
        </div>
        <ul class="list">
          <li v-for="(item, index) in news" :key="index">
            <font style="vertical-align: inherit"
              ><font style="vertical-align: inherit">{{
                item.info
              }}</font></font
            >
          </li>
        </ul>
      </div>
      <h4 class="ui dividing header">站点配置</h4>

      <div class="field">
        <div class="two fields">
          <div class="field">
            <label>标题</label>
            <input
              type="text"
              v-model="form.site_config.title"
              placeholder="站点标题"
            />
          </div>
          <div class="field">
            <label>关键字</label>
            <input
              v-model="form.site_config.keywords"
              type="text"
              placeholder="SEO关键词"
            />
          </div>
        </div>
      </div>
      <div class="field">
        <label>站点描述</label>
        <textarea
          v-model="form.site_config.description"
          rows="2"
          placeholder="支持HTML文本"
        ></textarea>
      </div>
      <div class="field">
        <label>站点 favicon 图标</label>
        <input
          v-model="form.site_config.favicon_url"
          type="text"
          placeholder="favicon 链接"
        />
      </div>
      <div class="field">
        <label>站点 Logo 链接</label>
        <input
          v-model="form.site_config.logo_url"
          type="text"
          placeholder="LOGO 链接"
        />
      </div>
      <div class="field">
        <label>后台地址</label>
        <input
          v-model="form.site_config.adm_site_url"
          type="text"
          placeholder="后台管理地址"
        />
      </div>

      <div class="field">
        <label>站点脚部</label>
        <textarea
          v-model="form.site_config.footer_html"
          rows="4 "
          placeholder="支持HTML文本"
        ></textarea>
      </div>
      <div class="field">
        <label>备案信息</label>
        <textarea
          v-model="form.site_config.permit_no"
          rows="4"
          placeholder="支持HTML文本"
        ></textarea>
      </div>
      <div
        class="ui button blue"
        :class="{ loading: loading }"
        @click="submit"
        tabindex="0"
      >
        保存配置
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    site_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      loading: false,
      news: [
        {
          info: "您现在可以在博客页面上使用封面图片",
        },
        { info: "你也可以自定义站点信息、个人信息。" },
        { info: "还可以添加你的社交媒体的信息" },
      ],
      form: {
        site_config: {
          title: "", // 站点标题
          keywords: "", // 关键词
          description: "", // 描述
          permit_no: ``, // 备案号
          favicon_url: "", // 站点ico
          logo_url: "", // 站点logo
          blog_site_url: "", // 博客地址
          adm_site_url: "", // 运营地址
          footer_html: ``,
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    submit() {
      this.loading = true;
      var data = {
        "login-token": this.$cookies.get("token"),
        keys: "geek_config",
        opt: this.form,
      };
      this.$axios.post("/api/options", data).then((res) => {
        this.loading = false;
        if (res.code == 200) {
          this.$notify({
            type: "success",
            title: "恭喜！",
            message: "配置成功，刷新页面之后立即生效。",
            duration: 5000,
            offset: 65,
          });
        }
      });
    },
  },
  created() {
    this.form.site_config = this.site_config;
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
