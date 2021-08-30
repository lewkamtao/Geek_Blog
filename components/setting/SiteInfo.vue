<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">站点配置</h4>
      <div
        v-if="message.type"
        class="ui positive message"
        :class="message.type"
      >
        <i @click="message.type = ''" class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
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
      <div class="ui button blue" tabindex="0">保存配置</div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      message: {
        type: "negative", // message:success / negative
        title: "",
        info: "",
      },
      form: {
        site_config: {
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
          footer_html: `<div style=" line-height: 24px; color:#999">
            Powered by
            <a href="https://inis.cc/" >inis</a> | 本站自豪使用了全世界最好的Vue框架
            <br>Copyright (c) 2021-present, Kamtao (To) Lew
          </div>`,
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
