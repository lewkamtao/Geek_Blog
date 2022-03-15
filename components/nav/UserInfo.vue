<template>
  <div class="part">
    <nuxt-link to="/about">
      <div class="user-info">
        <div class="avatar-wrapper">
          <div class="avatar">
            <v-img
              class="ui image"
              width="120px"
              height="120px"
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
      <div class="record">
        <div class="box">
          <div class="count">{{ record.article.count }}</div>
          <div class="tag">文章</div>
        </div>
        <div class="box">
          <div class="count">
            {{ record.comments.count }}
          </div>
          <div class="tag">评论</div>
        </div>
        <div class="box">
          <div class="count">
            {{ record.links.count }}
          </div>
          <div class="tag">友链</div>
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
    return {
      record: {
        article: {
          count: 0,
        },
        links: {
          count: 0,
        },
        comments: {
          count: 0,
        },
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    async getData() {
      const data = (
        await this.$axios.get("/api/group?field=links,article,comments")
      ).data;
      this.record = data;
    },
  },
  created() {},
  mounted() {
    this.getData();
  },
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
  flex-direction: column;
  box-sizing: border-box;
  padding: 10px 10px 0px 10px;
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
    height: 120px;
    display: flex;
    .avatar {
      width: 120px;
    }
  }
  .info {
    text-align: left;
    .nickname {
      margin-top: 7px;
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
.record {
  display: flex;
  justify-content: space-between;

  .box {
    width: calc(100% / 3 - 8px);
    padding: 10px;
    border-radius: 7px;

    .tag {
      font-weight: 300;
      color: #999;
      font-size: 12px;
    }
    .count {
      font-size: 18px;
      color: #000;
    }
  }
}
@media screen and (max-width: 765px) {
  .user-info {
    align-items: center;
    margin-top: 30px;
    .description {
      text-align: center;
    }
  }
  .avatar-wrapper {
    justify-content: center;
  }
  .record {
    justify-content: center;
    width: 60%;
    margin: 0 auto;
    margin-bottom: 30px;
    .box {
      text-align: center;
    }
  }
}
</style>
