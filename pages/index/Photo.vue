<template>
  <div class="index-wrapper-master part">
    <div class="search-box">
      <div class="ui big icon input">
        <input type="text" placeholder="搜索图片" />
        <i class="search icon"></i>
      </div>
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
import AutoImgList from "@/components/custom/AutoImgList";

export default {
  components: {
    AutoImgList,
  },
  props: {},
  data() {
    return {
      page: 1,
      limit: 10,
      index: 1,
      hidMasonry: true,
      imgUrl: "",
      imgList: [],
      imgData: [],
      masonryWidth: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getImgList(type) {
      var res = await this.$axios.get(
        "https://pic.sogou.com/napi/pc/searchList?mode=13&dm=4&cwidth=2560&cheight=1440&start=0&xml_len=48&query=%E9%BB%91%E4%B8%9D%E7%BE%8E%E8%85%BF%E7%BE%8E%E5%A5%B3%E6%A8%A1%E7%89%B9%E5%88%B6%E6%9C%8D%E8%AF%B1%E6%83%91%E5%86%99%E7%9C%9F%E5%A3%81%E7%BA%B8"
      );
      console.log(res)
      if (type == "new") {
        this.imgList = [];
        this.imgData = [];
      }
      if (this.index <= 1600) {
        this.index += 1;
        for (var i = 1; i <= 100; i++) {
          this.index += 1;
          this.imgList.push(
            "https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/images/pexels/" +
              this.index +
              ".jpg!blog_mainPic"
          );
        }
      }
      this.formatImgData();
    },
    formatImgData() {
      var rnum = this.randomNum(3, 4);
      this.$nextTick(function () {
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
    },
  },
  created() {},
  mounted() {
    this.getImgList();
  },
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

.search-box {
  margin: 20px;
  display: flex;
  justify-content: center;
  .input {
    input {
      width: 400px;
      border-radius: 50px;
      border: rgba($color: #000000, $alpha: 0.025) solid 2px;
      background: rgba($color: #000000, $alpha: 0.025);
      outline: none;
    }
    input:hover {
      background: rgba($color: #000000, $alpha: 0.045);
    }
    input:focus {
      border: #000 solid 2px;
      background: rgba($color: #000000, $alpha: 0);
    }
  }
}
@media screen and (max-width: 1024px) {
  .part {
    padding: 5px;
  }
}
</style>
