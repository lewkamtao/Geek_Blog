<template>
  <div class="aside-wrapper">
    <div style="margin-bottom: 30px" class="part aside">
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
    <div style="margin-bottom: 30px" class="part aside">
      <div class="main-title">标签云</div>
      <div v-if="article.expand.tag">
        <span
          v-for="(item, index) in article.expand.tag"
          :key="index"
          class="badge"
          :class="getTagColor()"
          >{{ item.name }}</span
        >
      </div>
      <div v-if="!article.expand.tag">暂无标签</div>
    </div>
    <div class="part aside">
      <div class="main-title">评论 <span class="badge secondary">123</span></div>

      <div class="comon">
        这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />这是又长又臭的评论<br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    article: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    getTagColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.aside {
  width: 350px;
  padding-top: 30px;
}
.badge {
  cursor: pointer;
  margin-bottom: 7px;
  font-weight: 400;
  font-size: 12px;
  margin-right: 7px;
}
.aside-list {
  margin-left: 25px;
  line-height: 25px;
}

.aside-wrapper::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  display: none;
}
.comon {
  line-height: 300px;
}
.main-title {
  .badge {
    margin: 0px 0px 0px 10px;
    font-size: 15px;
  }
}
@media screen and (max-width: 1440px) {
  .aside {
    width: 250px;
  }
}
</style>