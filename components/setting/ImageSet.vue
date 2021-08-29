<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">图片设置</h4>
      <div class="ui positive message" :class="status">
        <i class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { status: "" };
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
