<template>
  <div class="aside-wrapper">
    <div style="margin-bottom:30px" class="part aside">
      <div class="main-title">目录</div>
      <div class="aside-list">
        <ul>
          <li><a href="#ia">adad</a></li>
          <li><a href="#ia">标签标签</a></li>
          <li><a href="#ia">asdad1ec</a></li>
          <li><a href="#ia">adad</a></li>
        </ul>
      </div>
    </div>
    <div style="margin-bottom:30px" class="part aside">
      <div class="main-title">标签云</div>
      <div>
        <span
          v-for="(item, index) in tags"
          :key="index"
          class="badge"
          :class="getColor()"
          >{{ item }}</span
        >
      </div>
    </div>
    <div class="part aside"><div class="main-title">评论</div></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      tags: [
        "很酷",
        "很酷",
        "评论",
        "很酷",
        "很酷",
        "评论",
        "很酷",
        "很酷",
        "评论",
        "很酷",
        "很酷",
        "评论",
        "评论",
        "炒米粉",
        "评论",
        "很酷",
        "很酷",
        "评论",
        "很酷",
        "很酷",
        "评论",
        "评论",
        "炒米粉"
      ]
    };
  },
  watch: {},
  computed: {},
  methods: {
    getColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.aside {
  position: relative;
  width: 350px;
}
.badge {
  cursor: pointer;
  margin-bottom: 10px;
  font-weight: 400;
  margin-right: 10px;
}
.aside-list {
  margin-left: 25px;
  line-height: 25px;
}

@media screen and (max-width: 1440px) {
  .aside {
    width: 250px;
  }
}
</style>