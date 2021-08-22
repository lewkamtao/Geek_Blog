<template>
  <div style="margin-bottom:14px" class="info part">
    <div class="main-title" style="margin-bottom: 12px">
      甜狗日记
      <svg
        @click="getContent"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        stroke="currentColor"
        stroke-width="2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="css-i6dzq1 rotate-cw"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    </div>
    <div class="diary">{{ content }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: ""
    };
  },
  methods: {
    async getContent() {
      this.content = await this.$axios.get(
        "https://api.ixiaowai.cn/tgrj/index.php"
      );
    }
  },
  created() {
    this.getContent();
  }
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
.rotate-cw {
  cursor: pointer;
  color: #999;
  margin-left: 5px;
}
.rotate-cw:hover {
  color: #000000;
}
</style>
