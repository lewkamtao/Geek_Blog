<template>
  <div class="part">
    <nuxt-link to="/about">
      <div class="user-info">
        <div class="avatar-wrapper">
          <div class="avatar">
            <v-img
              class="ui image"
              width="100px"
              height="100px"
              :url="user.head_img"
            >
            </v-img>
          </div>
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
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  padding:20px 6px;
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
  .avatar-wrapper {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    .avatar {
      width: 100px;
    }
  }
  .info {
    text-align: left;
    .nickname {
      margin-top: 15px;
      color: #000;
      font-size: 16px;
      font-weight: bold;
    }
    .description {
      font-size: 14px;
      line-height: 22px;
      color: #999;
      overflow: hidden; /*超出部分隐藏*/
      white-space: nowrap; /*不换行*/
      text-overflow: ellipsis; /*超出部分文字以...显示*/
    }
  }
}
</style>
