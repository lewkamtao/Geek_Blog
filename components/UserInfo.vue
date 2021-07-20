<template>
  <div class="part">
    <div class="user-info">
      <img class="logo" :src="options.site_img" alt="" srcset="" />
      <div class="title">{{ options.title }}</div>
      <div class="description">{{ options.description }}</div>
    </div>
 
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    options: {
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
.user-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  .logo {
    width: 80px;
  }
  .title {
    margin: 22px 0px 14px 0px;
    color: #fff;
    font-size: 20px;
    background: #0071de;
  }
  .description {
    font-size: 14px;
    line-height: 22px;
    color: #000;
    margin-bottom: 10px;
  }
}

</style>