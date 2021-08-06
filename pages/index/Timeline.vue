<template>
  <Detail :geek_config="geek_config" :options="{
      type: 'timeline',
    }" />
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: "时光机 - " + this.geek_config.site_info.title
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