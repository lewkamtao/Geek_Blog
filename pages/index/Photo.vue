<template>
  <div class="index-wrapper-master part">
    <div class="search-box">
      <div class="ui icon input">
        <input type="text" placeholder="搜索图片" v-model="keyword" />
        <i class="search icon"></i>
      </div>
    </div>
    <div class="masonry">
      <a
        data-fancybox="gallery"
        :key="index"
        v-for="(item, index) in imgList"
        :href="item.oriPicUrl"
      >
        <img :src="item.thumbUrl" alt="" srcset=""
      /></a>
    </div>
    <div class="more-box">
      <button
        v-if="isMore"
        @click="getImgList"
        class="ui primary button"
        :class="{ loading: loading }"
      >
        点击加载更多
      </button>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      pageNum: 1,
      index: 1,
      hidMasonry: true,
      imgUrl: "",
      imgList: [],
      masonryWidth: 0,
      keyword: "",
      keytimer: "",
      isMore: false,
      loading: false,
    };
  },
  watch: {
    keyword: function () {
      clearTimeout(this.keytimer);
      this.keytimer = setTimeout(() => {
        this.getImgList("new");
      }, 350);
    },
  },
  computed: {},
  methods: {
    async getImgList(type) {
      this.pageNum += 1;
      if (type == "new") {
        this.pageNum = 0;
        this.imgList = [];
      }
      var keyword = "";
      keyword = this.keyword ? this.keyword : "风景高清壁纸";
      this.loading = true;
      var res = await this.$axios.get(
        `sogou/napi/pc/searchList?mode=13&dm=4&cwidth=2560&cheight=1440&start=${this.pageNum}&query=${keyword}`
      );
      this.loading = false;

      var imgs = res.data.items;
      if (imgs.length < 48) {
        this.isMore = false;
      } else {
        this.isMore = true;
      }
      this.imgList = this.imgList.concat(imgs);
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
  min-height: 100vh;
}

.more-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0px;
}

.masonry {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /*等同于1fr 1fr 1fr,此为重复的合并写法*/
  grid-template-rows: repeat(4, 1fr);
  border: 1px #eee solid;
  /*等同于1fr 1fr 1fr,此为重复的合并写法*/
  a {
    font-size: 0px;
    width: 100%;
    height: 240px;
  }
  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
    border: 1px #eee solid;
  }
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
  .index-wrapper-master {
    padding:20px 0px 10px 0px;
  }
  .search-box {
    .input {
      input {
        width: 270px;
      }
    }
  }
  .masonry {
    grid-template-columns: repeat(2, 1fr);
    /*等同于1fr 1fr 1fr,此为重复的合并写法*/
    grid-template-rows: repeat(2, 1fr);
    a {
      font-size: 0px;
      width: 100%;
      height: 140px;
    }
    img {
      width: 100%;
      height: 140px;
      object-fit: cover;
      border: 1px #eee solid;
    }
  }
}
</style>
