<template>
  <div style="margin-bottom: 8px" class="record-wrapper part">
    <div v-if="record" class="record">
      <div class="box">
        <div class="count">{{ record.article.count }}</div>
        <div class="tag">文章</div>
      </div>
      <div class="box">
        <div class="count">
          {{ record.comments.count }}
        </div>
        <div class="tag">评论</div>
      </div>
      <div class="box">
        <div class="count">
          {{ record.links.count }}
        </div>
        <div class="tag">朋友</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      record: false,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getData() {
      const data = (
        await this.$axios.get("/group?field=links,article,comments")
      ).data;
      this.record = data;
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.record-wrapper {
  padding: 12px;
  .record {
    display: flex;
    justify-content: space-between;
    .box {
      width: calc(100% / 3 - 8px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 14px 0px;
      background: #eee;
      border-radius: 7px;
      color: #666;
      .tag {
        font-weight: 300;
      }
      .count {
        font-family: STHeiti Light [STXihei];
        font-size: 30px;
        margin-bottom: 10px;
      }
    }
    .box:nth-child(1) {
      background: rgba($color: #336633, $alpha: 0.05);
    }
    .box:nth-child(2) {
      background: rgba($color: #0099cc, $alpha: 0.05);
    }
    .box:nth-child(3) {
      background: rgba($color: #cc6699, $alpha: 0.05);
    }
  }
}
</style>
