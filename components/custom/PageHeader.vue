<template>
  <header :style="'background:url(' + bgUrl + ');'"></header>
</template>

<script>
export default {
  components: {},
  props: {
    bgUrl: {
      type: String,
      default: function() {
        return "";
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
header {
  width: 100%;
  height: 300px;
  background: #eee;
  background-size: cover !important;
  background-position: center !important;
  border-radius: 8px 8px 0px 0px;
}
</style>
