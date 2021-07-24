<template>
  <div class="part pages" style="margin-bottom:30px">
    <div class="main-title">友情链接</div>
    <div class="list">
      <ul>
        <li v-for="(item, index) in links" :key="index">
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    links: {
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