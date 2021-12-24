<template>
  <div class="info part">
    <div class="main-title" style="margin-bottom: 12px">一言&nbsp;
      <span v-if="isLoading === false">
        <i class="sync alternate icon" style="cursor: pointer" @click="reload()"></i>
      </span>
      <span v-if="isLoading === true">
        <i class="sync alternate loading icon"></i>
      </span>
    </div>
    <div v-if="one" class="diary">
      <div class="tag">#{{ one.from }}#</div>
      <p>{{ one.hitokoto }}</p>
      <div class="origin">来自 {{ one.from_who || one.creator }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      one: "",
      isLoading: false
    };
  },
  methods: {
    async getContent() {
      this.one = await this.$axios.get("https://v1.hitokoto.cn/");
    },
    async reload() {
      this.isLoading = true
      let one = await this.$axios.get("https://v1.hitokoto.cn/");
      // 防止暴力点击
      setTimeout(() => {
        this.isLoading = false
        this.one = one
      }, 1500)
    }
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
