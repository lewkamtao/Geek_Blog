<template>
  <div class="index-wrapper-master part">
    <div class="more-btn" style="margin-bottom: 50px">
      相册功能
      尚未完善，图库来源：https://www.kancloud.cn/lizhixuan/free_api/1165107 和 https://api.ixiaowai.cn/api/api.php
    </div>
    <div ref="masonry" class="masonry">
      <div class="img-box" :key="index" v-for="(item, index) in imgData">
        <auto-img-list :width="masonryWidth" :imgData="item"></auto-img-list>
      </div>
    </div>
    <div @click="getImgList()" class="more-btn">点击加载更多</div>
  </div>
</template>

<script>
import AutoImgList from "@/components/AutoImgList";
import qs from "qs";

export default {
  components: {
    AutoImgList,
  },
  props: {},
  async asyncData({ $axios }) {
    const imgList = (
      await $axios.post(
        "https://api.apiopen.top/getImages",
        qs.stringify({
          count: "10000",
        })
      )
    ).result;
    return { imgList };
  },
  data() {
    return {
      page: 1,
      limit: 10,
      hidMasonry: true,
      imgList: [],
      imgData: [],
      masonryWidth: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getImgList() {
      const imgList = (
        await this.$axios.post(
          "https://api.apiopen.top/getImages",
          qs.stringify({
            count: "100",
          })
        )
      ).result;
      this.$nextTick(function () {
        this.masonryWidth = this.$refs.masonry.clientWidth;
      });
      this.imgList = imgList;
      this.imgList = this.imgList.map((img) => {
        return img.img;
      });
      this.formatImgData();
    },
    formatImgData() {
      var rnum = this.randomNum(3, 5);
      if (this.imgList.length > rnum) {
        this.imgData.push(this.imgList.slice(0, rnum));
        this.imgList = this.imgList.splice(rnum);
        if (this.imgList.length != 0) {
          this.formatImgData();
        }
      } else if (this.imgList.length != 0) {
        this.imgData.push(this.imgList);
      }
    },
    //生成从minNum到maxNum的随机数
    randomNum(minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10);
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        default:
          return 0;
      }
    },
  },
  created() {
    this.getImgList();
  },
  mounted() {},
};
</script> 
<style lang="scss" scoped>
.index-wrapper-master {
  width: 100%;
}

.more-btn {
  margin-top: 20px;
  width: 100%;
  height: 45px;
  line-height: 45px;
  background: #eee;
  font-size: 16px;
  text-align: center;
  opacity: 0.4;
  color: #000;
  border-radius: 15px;
  transition: opacity 0.25s;
  cursor: pointer;
}
.loading {
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 400px;
 
  }
}
.more-btn:hover {
  opacity: 1;
}
.masonry {
  width: 100%;
}
</style>