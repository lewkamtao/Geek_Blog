<template>
  <Detail :geek_config="geek_config" :options="{
      type: 'about',
    }" />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "关于我 - " + this.geek_config.site_info.title
    };
  },
  async asyncData({ $axios, route }) {},
  props: {
    geek_config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },

  watch: {},
  computed: {},
  methods: {}
};
</script>