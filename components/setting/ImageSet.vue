<template>
  <form class="ui form">
    <h4 id="image_set" class="ui dividing header">图片设置</h4>
    <div class="field">
      <label>关于背景图链接</label>
      <input type="text" placeholder="图片链接" />
    </div>
    <div class="field">
      <label>时光机背景图链接</label>
      <input type="text" placeholder="图片链接" />
    </div>
    <div class="field">
      <label>留言背景图链接</label>
      <input type="text" placeholder="图片链接" />
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
