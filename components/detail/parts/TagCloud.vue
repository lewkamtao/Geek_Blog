<template>
  <div class="tagCloud part">
    <div class="main-title">标签云</div>
    <div class="tags-box">
      <span
        v-for="(item, index) in tag"
        :key="index"
        class="badge"
        :class="tagsClass[index]"
      >{{ item.name }}</span>
    </div>
    <div v-if="tag.length==0">暂无标签</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tag: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      tagsClass: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTagColor() {
      if (this.tag && this.tag.length > 0) {
        this.tag.forEach((tag, index) => {
          var options = ["", "secondary", "success", "warning", "danger"];
          var i = Math.floor(Math.random() * options.length);
          this.tagsClass[index] = options[i];
        });
        this.$forceUpdate();
      }
    }
  },
  created() {},
  mounted() {
    this.getTagColor();
  }
};
</script>
<style lang="scss" scoped>
.tags-box {
  .badge {
    cursor: pointer;
    margin-bottom: 7px;
    font-weight: 400;
    font-size: 12px;
    margin-right: 7px;
  }
}
</style>