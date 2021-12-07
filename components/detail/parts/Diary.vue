<template>
  <div class="info part">
    <div class="main-title" style="margin-bottom: 12px">ONE 一个</div>
    <div v-if="one" class="diary">
      <!-- <div class="tag">#{{ one.data.tag }}#</div> -->
      <p>{{ one.data }}</p>
      <!-- <div class="origin">来自 {{ one.data.origin }}</div> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: "",
    };
  },
  methods: {
    async getContent() {
      this.one = await this.$axios.get("/api/file/words");
    },
  },
  created() {
    this.getContent();
  },
};
</script>

<style lang="scss" scoped>
.diary {
  line-height: 24px;
  letter-spacing: 1px;
  background: rgba($color: #000000, $alpha: 0.025);
  padding: 15px;
  border-radius: 7px;
}
.tag {
  font-weight: bold;
  margin-bottom: 10px;
}
.origin {
  color: #999;
  text-align: right;
  margin-top: 10px;
}
</style>
