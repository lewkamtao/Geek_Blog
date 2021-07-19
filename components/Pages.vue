<template>
  <div class="part pages" style="margin-bottom:30px">
    <div class="main-title">一些好玩的</div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in pages" :key="index">
          <nuxt-link class="text-secondary" :to="'/Article?id=' + item.id">
            {{ item.title }}</nuxt-link
          >
        </li>
        <li>
          <nuxt-link class="text-secondary" :to="'/Article?id='">
            友情链接</nuxt-link
          >
        </li>
        <li>
          <nuxt-link class="text-secondary" :to="'/Article?id='">
            友情链接</nuxt-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pages: {
      type: Array,
      default: []
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
.pages {
  width: 100%;
}

.list {
  line-height: 30px;
  padding-left: 25px;
}
.text-secondary {
  background-image: none !important;
}
</style>