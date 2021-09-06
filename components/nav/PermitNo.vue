<template>
  <div class="wrapper">
    <div v-html="geek_config.site_config.permit_no"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    geek_config: {
      type: Object,
      default: function() {
        return {};
      }
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
.wrapper {
  margin: 20px 0px 120px 0px;
}
</style>