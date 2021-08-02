<template>
  <img style="width: 100%; height: auto" :src="url" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAAA/xl1SAAAA/klEQVR4nO3SQREAIADDsIEo/EtDRj+JhF7PtjeIXOEpGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQB6Wz7qpMA6icD3IEAAAAASUVORK5CYII=", // 先加载loading.gif
    };
  },
  mounted() {
    var newImg = new Image();
    newImg.src = this.src;
    newImg.onerror = () => {
      // 图片加载错误时的替换图片
      newImg.src =
        "https://api.ixiaowai.cn/api/api.php?&" + new Date().getTime();
    };
    newImg.onload = () => {
      // 图片加载成功后把地址给原来的img
      this.url = newImg.src;
    };
  }, 
};
</script>