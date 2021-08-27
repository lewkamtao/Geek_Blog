<template>
  <form class="ui form">
    <h4 id="setting_siteinfo" class="ui dividing header">站点信息</h4>
    <div class="field">
      <div class="two fields">
        <div class="field">
          <label>标题</label>
          <input type="text" name="shipping[first-name]" placeholder="姓" />
        </div>
        <div class="field">
          <label>关键字</label>
          <input type="text" name="shipping[last-name]" placeholder="名" />
        </div>
      </div>
    </div>

    <div class="field">
      <label>站点 favicon 图标</label>
      <input type="text" name="shipping[first-name]" placeholder="姓" />
    </div>
    <div class="field">
      <label>站点 Logo 链接</label>
      <input type="text" name="shipping[first-name]" placeholder="姓" />
    </div>
    <div class="field">
      <label>后台地址</label>
      <input type="text" name="shipping[first-name]" placeholder="姓" />
    </div>
    <div class="field">
      <label>站点描述</label>
      <textarea rows="2"></textarea>
    </div>
    <div class="field">
      <label>站点脚部</label>
      <textarea rows="2"></textarea>
    </div>
    <div class="field">
      <label>备案信息</label>
      <textarea rows="2"></textarea>
    </div>
    <div class="ui button blue" tabindex="0">保存配置</div>
  </form>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.form {
  margin-bottom: 50px;
  .header {
    padding-top: 80px;
  }
}
</style>
