<template>
  <div class="index-wrapper-master part">
    <div style="margin-bottom:20px" v-show="this.imgData.length == 0">
      <form class="ui reply form">
        <div class="field">
          <div class="field">
            <textarea
              style="height:100px"
              v-model="imgUrl"
              placeholder="输入爬取图片URL..."
            ></textarea>
          </div>
        </div>
        <div
          @click="getImgList('new')"
          class="ui blue labeled submit icon button"
        >
          <i class="icon edit"></i> 立即获取
        </div>
      </form>
    </div>
    <div ref="masonry" class="masonry">
      <div class="img-box" :key="index" v-for="(item, index) in imgData">
        <auto-img-list :width="masonryWidth" :imgData="item"></auto-img-list>
      </div>
    </div>
    <div v-show="imgList.length != 0" @click="getImgList()" class="more-btn">
      点击加载更多
    </div>
  </div>
</template>

<script>
import AutoImgList from "@/components/custom/AutoImgList";

export default {
  components: {
    AutoImgList
  },
  props: {},
  data() {
    return {
      page: 1,
      limit: 10,
      hidMasonry: true,
      imgUrl: "",
      imgList: [],
      imgData: [],
      masonryWidth: 0
    };
  },
  watch: {},
  computed: {},
  methods: {
    getImgList(type) {
      if (type == "new") {
        this.imgList = [];
        this.imgData = [];
      }
      for (var i = 0; i <= this.limit; i++) {
        this.imgList.push(this.imgUrl + "?" + new Date().getTime() + i);
      }
      this.formatImgData();
    },
    formatImgData() {
      var rnum = this.randomNum(3, 5);
      this.$nextTick(function() {
        this.masonryWidth = this.$refs.masonry.clientWidth;
      });
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
    }
  },
  created() {},
  mounted() {}
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
  opacity: 0.7;
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
