<template>
  <div class="article-wrapper">
    <pre>{{ article }}</pre>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.article-wrapper {
  min-height: calc(100vh - 60px);
}
</style>