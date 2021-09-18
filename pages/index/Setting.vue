<template>
  <Detail
    :geek_config="geek_config"
    :options="{
      type: 'setting',
      catalogue: false,
      tag: false,
      article: false,
      commentsGroup: false,
    }"
  />
</template>

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙

export default {
  components: {},
  head() {
    return {
      title: "设置 - " + this.geek_config.site_config.title,
    };
  },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      }
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
};
</script>
