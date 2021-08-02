<template>
  <div class="index-wrapper-master part">
    <div class="masonry">
      <div class="card" :key="index" v-for="(item, index) in imgList">
        <div class="cover">
          <v-img :src="item.img"> </v-img>
          <!-- <v-img
              v-if="!item.img_src"
              :src="'https://picsum.photos/800/450?' + index"
            ></v-img> -->
          <h4 class="card-title">{{ item.title }}</h4>
        </div>
      </div>
    </div>
    <div @click="getImgList()" class="more-btn">点击加载更多</div>
  </div>
</template>

<script>
import VImg from "@/components/VImg";

export default {
  components: {
    "v-img": VImg,
  },
  props: {},
  async asyncData({ $axios }) {
    const imgList = (await $axios.get("https://api.apiopen.top/getImages"))
      .result;
    return { imgList };
  },
  data() {
    return {
      page: 1,
      limit: 10,
      hidMasonry: true,
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getImgList() {
      const imgList = (
        await this.$axios.get("https://api.apiopen.top/getImages")
      ).result;
      this.imgList = this.imgList.concat(imgList);
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
  columns: 4; // 默认列数
  column-gap: 15px; // 列间距
  .card {
    margin-bottom: 15px;
  }
}
</style>