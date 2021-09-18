<template>
  <div class="part">
    <nuxt-link to="/about">
      <div class="user-info">
        <div class="avatar">
          <v-img
            style="border-radius: 4px"
            class="ui image"
            width="50px"
            height="50px"
            :url="user.head_img"
          >
          </v-img>
        </div>
        <div class="info">
          <div class="nickname">{{ user.nickname }}</div>
          <div class="description">
            {{ user.description }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    user: {
      type: Object,
      default: function () {
        return {
          head_img: "",
          nickname: "Geek_Username",
          description: "description",
        };
      },
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.user-info {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 6px;
  .mode-setting {
    position: absolute;
    right: 10px;
    top: 30px;
    display: flex;
    align-items: center;
    .paper-switch-label {
      margin-top: 1px;
    }
  }
  .avatar {
    width: 50px;
    height: 50px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
  }
  .info {
    width: calc(100% - 60px);
    margin-left: 10px;
    .nickname {
      margin-top: 2px;
      margin-bottom: 5px;
      color: #000;
      font-size: 18px;
      font-weight: bold;
    }
    .description {
      font-size: 14px;
      line-height: 22px;
      color: #000;
      width: 140px;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
  }
}
</style>
