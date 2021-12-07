<template>
  <div class="timeline-wrapper">
    <header
      :style="'background:url(' + geek_config.images_config.bg_timeline + ')'"
    ></header>
    <div class="user-info">
      <div class="user-box">
        <div class="nickname">{{ user.nickname }}</div>
        <div class="avatar">
          <img :src="user.head_img" alt="" />
        </div>
      </div>
      <div class="direction">{{ user.description }}</div>
    </div>

    <div class="timeline">
      <div
        class="timeline-box"
        v-for="(item, index) in timelineData.data"
        :key="index"
      >
        <div class="avatar">
          <img :src="item.expand.head_img" alt="" srcset="" />
        </div>
        <div class="right">
          <div class="nickname">
            {{ item.nickname || "" }}
          </div>
          <div v-html="item.content" class="content"></div>
          <div class="create_time">
            {{ getBeautifyTime(item.create_time) }}
            <span
              v-if="isLogin"
              @click.stop="delConfirm(index, item.id)"
              class="del-btn no-select"
            >
              删除</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";

export default {
  components: {},
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    user: {
      type: Object,
      default: function () {
        return {};
      },
    },
    timeline: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      isLogin: false,
      timelineData: {
        data: [],
      },
    };
  },
  watch: {
    timeline: function (val) {
      this.timelineData = val;
    },
  },
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    delConfirm(index, id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(index, id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    del(index, id) {
      if (this.$cookies.get("token")) {
        var data = {
          "login-token": this.$cookies.get("token"),
          mode: "remove",
          id: JSON.stringify(id),
        };

        this.$axios.post("/api/comments", data).then((res) => {
          if (res.code == 200) {
            this.timelineData.data.splice(index, 1);
            this.$notify({
              type: "success",
              title: "恭喜！",
              message: "成功删除了一条时光机",
              duration: 5000,
              offset: 65,
            });
          }
        });
      }
    },
  },
  created() {
    this.timelineData = this.timeline;

    if (this.$cookies.get("token")) {
      this.isLogin = true;
    }
  },
  mounted() {},
};
</script>
<style>
.timeline-wrapper .timeline-box .right .content img {
  max-width: 100%;
}
</style>
<style lang="scss" scoped>
.timeline-wrapper {
  padding: 0px;
  overflow: hidden;
  .user-info {
    margin-top: -50px;
    width: 100%;
    .user-box {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-right: 20px;
      color: #fff;
      .nickname {
        transform: translateY(-50%);
        font-size: 16px;
        font-weight: bold;
      }
      .avatar {
        width: 70px;
        height: 70px;
        margin-left: 15px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }
    }
    .direction {
      text-align: right;
      margin: 15px 20px;
      color: #666;
    }
  }
  header {
    background-color: #eee;
    height: 300px;
    background-size: cover !important;
    background-position: center !important;
  }
  .timeline-box {
    border-bottom: 1px rgba($color: #000000, $alpha: 0.05) solid;
    padding: 20px;
    display: flex;
    .avatar {
      width: 45px;
      height: 45px;
      margin-right: 10px;
      img {
        width: 45px;
        height: 45px;
        border-radius: 5px;
      }
    }
    .right {
      width: calc(100% - 55px);
      .nickname {
        color: #5f6984;
        font-weight: bold;
        font-size: 14px;
      }
      .content {
        margin-top: 8px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
      }
      .create_time {
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
      .del-btn {
        color: #a7342d;
        cursor: pointer;
        margin-left: 20px;
      }
    }
  }
  .timeline-box:last-child {
    border-bottom: none;
  }
}
</style>
