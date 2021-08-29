<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">站点配置</h4>
      <div class="ui positive message" :class="status">
        <i class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
      <div class="field">
        <div class="two fields">
          <div class="field">
            <label>标题</label>
            <input type="text" placeholder="站点标题" />
          </div>
          <div class="field">
            <label>关键字</label>
            <input type="text" placeholder="SEO关键词" />
          </div>
        </div>
      </div>

      <div class="field">
        <label>站点 favicon 图标</label>
        <input type="text" placeholder="favicon 链接" />
      </div>
      <div class="field">
        <label>站点 Logo 链接</label>
        <input type="text" placeholder="LOGO 链接" />
      </div>
      <div class="field">
        <label>后台地址</label>
        <input type="text" placeholder="后台管理地址" />
      </div>
      <div class="field">
        <label>站点描述</label>
        <textarea rows="2" placeholder="支持HTML文本"></textarea>
      </div>
      <div class="field">
        <label>站点脚部</label>
        <textarea rows="2" placeholder="支持HTML文本"></textarea>
      </div>
      <div class="field">
        <label>备案信息</label>
        <textarea rows="2" placeholder="支持HTML文本"></textarea>
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
      status: "negative",
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
