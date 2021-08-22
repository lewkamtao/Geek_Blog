<template>
  <div class="tagCloud part">
    <div class="main-title">标签云</div>
    <tag-list :tags="tags" v-if="tags.length > 0"> </tag-list>
    <div v-if="tags.length == 0">暂无标签</div>
  </div>
</template>

<script>
import TagList from "../../custom/TagList.vue";

export default {
  components: { TagList },
  props: {
    tags: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tagsClass: [],
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
    },
  },
  created() {},
  mounted() {
    this.getTagColor();
  },
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
