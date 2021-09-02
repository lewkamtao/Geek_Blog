<template>
  <img :style="'width:' + width + ';height:' + height + ';'" :src="src" />
</template>

<script>
export default {
  props: {
    nullUrl: {
      type: String,
      default: "",
    },
    url: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    height: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAABaCAYAAAA/xl1SAAAA/klEQVR4nO3SQREAIADDsIEo/EtDRj+JhF7PtjeIXOEpGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQBSRmQlAFJGZCUAUkZkJQB6Wz7qpMA6icD3IEAAAAASUVORK5CYII=", // 先加载loading.gif
    };
  },
  mounted() {
    var newImg = new Image();
    newImg.src = this.url;
    newImg.onerror = () => {
      // 图片加载错误时的替换图片
      newImg.src = this.nullUrl + "?&" + new Date().getTime();
    };
    newImg.onload = () => {
      // 图片加载成功后把地址给原来的img
      this.src = newImg.src;
    };
  },
};
</script>
