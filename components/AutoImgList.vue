<template>
  <div class="wrapper">
    <div v-show="isShow" class="imgbox" :style="'width:' + width + 'px'">
      <img
        v-for="(item, index) in imgList"
        :key="index"
        :src="item.url"
        :width="item.width"
        :height="item.height"
        alt
      />
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    imgData: {
      type: Array,
      default: function() {
        return [
          "https://oss.30sec.com.cn/public/Left/media/2021621013207_%E3%80%8A%E9%87%8D%E5%A1%91%E5%93%81%E7%89%8C%E3%80%8B.jpg",
          "https://oss.30sec.com.cn/public/Left/media/2021625190948_interior25.jpg",
          "https://oss.30sec.com.cn/public/Left/media/2021625190948_interior30.jpg"
        ];
      }
    },
    width: {
      type: Number,
      default: function() {
        return 1000;
      }
    }
  },
  data() {
    return {
      imgW: 0,
      count: 0,
      isShow: false,
      imgList: [] // 存图片的宽高信息
    };
  },
  watch: {},
  computed: {},
  methods: {
    getImgInfo() {
      this.imgData.forEach((url, index) => {
        let img = new Image();
        img.src = url;
        const _this = this;
        img.onerror = () => {
          img.src =
            "https://api.ixiaowai.cn/api/api.php?" + new Date().getTime();
        };
        img.onload = function() {
          _this.count += 1;
          _this.imgList.push({
            url: img.src,
            height: 5,
            width: (img.width / img.height) * 5,
            orderNum: index
          });
          _this.imgW += (img.width / img.height) * 5;
          _this.formatImgList();
        };
      });
    },

    formatImgList() {
      if (this.count == this.imgData.length) {
        var p = this.imgW / this.width;
        this.imgList.forEach(img => {
          img.width = img.width / p;
          img.height = img.height / p;
        });
        this.isShow = true;
        this.imgList = this.imgList.sort(function(a, b) {
          return a.orderNum - b.orderNum;
        });
      }
    }
  },
  created() {
    this.getImgInfo();
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  overflow: hidden;
}
.imgbox {
  display: flex;
  justify-content: flex-start;
  font-size: 0px;
}
img {
  padding: 6px;
  opacity: 0.7;
  border-radius: 0px;
  transition: opacity 0.25s;
}
img:hover {
  opacity: 1;
}
</style>