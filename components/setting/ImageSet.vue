<template>
  <div class="part">
    <form class="ui form">
      <h4 class="ui dividing header">图片设置</h4>
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
        <label>关于背景图链接</label>
        <input
          v-model="form.images_config.bg_about"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div class="field">
        <label>时光机背景图链接</label>
        <input
          v-model="form.images_config.timeline_about"
          type="text"
          placeholder="图片链接"
        />
      </div>
      <div class="field">
        <label>留言背景图链接</label>
        <input
          v-model="form.images_config.bg_msgwall"
          type="text"
          placeholder="图片链接"
        />
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
        images_config: {
          bg_about: "1",
          timeline_about: "2",
          bg_msgwall: "3",
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
