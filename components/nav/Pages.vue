<template>
  <div v-show="false" class="part pages" style="margin-bottom:30px">
    <div class="main-title">一些好玩的</div>
    <div class="nav-list">
      <div
        v-for="(item, index) in pages"
        :key="index"
        @click="openpages(item.id)"
        class="paper-btn btn-secondary"
      >{{ item.title }}</div>
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
  methods: {
    async openpages(id) {
      const data = (
        await this.$axios.get("/api/page", {
          params: { id: id }
        })
      ).data;
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.pages {
  width: 100%;
  margin-top: 30px;
}

.list {
  line-height: 30px;
  padding-left: 25px;
}
.text-secondary {
  background-image: none !important;
}
.nav-list {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  div {
    padding: 4px 7px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
  a {
    padding: 4px 7px;
    margin-right: 10px;
    margin-bottom: 10px;
    font-size: 18px;
  }
}
</style>
