<template>
  <div class="part pages" style="margin-bottom: 30px">
    <div class="main-title">推荐友链</div>
    <div class="list">
      <ul>
        <a
          v-for="(item, index) in links"
          :key="index"
          :href="item.url"
          target="_blank"
          class="user-item"
        >
          <div class="avatar border border-primary">
            <img :src="item.head_img" />
          </div>
          <div class="user-info">
            <div class="name">{{ item.name }}</div>
            <p class="description">{{ item.description }}</p>
          </div>
        </a>
      </ul>
      <nuxt-link to="/Links" class="more-btn">查看更多</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    links: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.pages {
  width: 100%;
}

.list {
  width: 100%;
  line-height: 35px;
}
.text-secondary {
  background-image: none !important;
}

.more-btn {
  width: 100%;
  display: inline-block;
  background-image: none !important;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: #000;
  opacity: 0.5;
  transition: opacity 0.25s;
}
.more-btn:hover {
  opacity: 1;
}

.user-item {
  display: flex;
  background-image: none;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 10px;

  .avatar {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: auto;
      border-radius: 0px;
    }
  }
  .user-info {
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .name {
      font-weight: bold;
      color: #5f6984;
      font-size: 14px;
      line-height: 16px;
    }
    .description {
      font-size: 13px;
      line-height: 16px;
      margin-top: 5px;
      color: #999;
    }
  }
}

.user-item::before {
  position: absolute;
  top: 0px;
  left: 0px;
  height: 1px;
  width: 100%;
  background: rgba($color: #000000, $alpha: 0.05);
  content: "";
}
.user-item:hover::before {
  display: none;
}
.user-item:hover + .user-item::before {
  display: none;
}
.user-item:first-child::before {
  display: none;
}

.user-item:hover {
  background: rgba($color: #000000, $alpha: 0.05);
}
</style>