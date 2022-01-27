<template>
  <div class="tagCloud part">
    <div class="main-title">标签云</div>
    <tag-list :showJump=true :tags="tags" v-if="tags.length > 0"> </tag-list>
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
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
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
