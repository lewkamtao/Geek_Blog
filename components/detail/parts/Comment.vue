<template>
  <div class="part">
    <div class="main-title">
      <div class="title">
        评论
        <span class="badge secondary">{{ comments.count }}</span>
      </div>
    </div>
    <div style="margin-bottom: 20px" v-if="comments.data.length == 0">
      暂无评论
    </div>
    <label
      class="border border-secondary reply-main-btn"
      @click="
        setReply({
          nickname: '',
          expand: {},
        })
      "
      for="modal-reply"
      >发表评论</label
    >
    <input class="modal-state" id="modal-reply" type="checkbox" />
    <div class="modal reply-modal">
      <label class="modal-bg"></label>
      <div class="modal-body">
        <label class="btn-close" @click="openModal" for="modal-reply">X</label>
        <div v-if="replyObj && replyObj.expand.head_img" class="reply-obj">
          <div class="avatar border border-primary" :class="getBorderType">
            <img :src="replyObj.expand.head_img" alt srcset />
          </div>
          <div class="user-info">
            <div class="nickname">{{ replyObj.nickname }}</div>
            <div class="content">
              {{ replyObj.content || replyObj.expand.description }}
            </div>
            <div v-if="replyObj.create_time" class="create_time">
              {{ getBeautifyTime(replyObj.create_time) }}
            </div>
          </div>
        </div>

        <div class="reply-form">
          <div v-if="!isLogin" class="concact">
            <div class="form-group">
              <label for="paperInputs1">
                昵称
                <span class="badge danger">必填</span>
              </label>
              <input
                v-model="comments_form.nickname"
                class="input-block"
                type="text"
                id="paperInputs1"
                placeholder
              />
            </div>
            <div class="form-group">
              <label for="paperInputs2">
                邮箱
                <span class="badge danger">必填</span>
              </label>
              <input
                v-model="comments_form.email"
                class="input-block"
                type="text"
                id="paperInputs2"
                placeholder
              />
            </div>
          </div>

          <div v-if="!isLogin" class="form-group">
            <label for="paperInputs3">博客地址</label>
            <input
              v-model="comments_form.url"
              class="input-block"
              type="text"
              id="paperInputs3"
              placeholder
            />
          </div>
          <div class="form-group">
            <label>
              内容
              <span class="badge danger">必填</span>
            </label>
            <textarea
              v-model="comments_form.content"
              style="width: 100%; height: 150px"
              class="no-resize"
              id="no-resize"
              placeholder
            ></textarea>
          </div>

          <div
            v-show="error_tips"
            class="alert alert-danger dismissible alert-reply"
          >
            {{ error_tips }}
            <label
              @click="error_tips = ''"
              style="
                position: static;
                color: #cb453c;
                margin-top: -5px;
                font-size: 25px;
                transform: translateX(10px) scaleX(1.8) rotate(-3deg);
              "
              class="btn-close"
              >X</label
            >
          </div>

          <div class="row flex-right">
            <button @click="submitComments" class="btn-secondary reply-btn">
              发送
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="comments.data.length != 0" class="comments">
      <div
        class="comments-box"
        v-for="(item, index) in comments.data"
        :key="index"
      >
        <comment-card @setReply="setReply" :comment="item"></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import CommentCard from "./CommentCard.vue";
import checkStr from "@/util/checkStr";

export default {
  components: { CommentCard },
  props: {
    type: {
      type: String,
      default: {},
    },
    comments: {
      type: Object,
      default: {},
    },
    articleId: {
      type: Number,
      default: "",
    },
  },
  data() {
    return {
      replyObj: false,
      isLogin: false,

      comments_form: {
        email: "",
        nickname: "",
        url: "",
        content: "",
      },
      tagsClass: [],
      error_tips: "",
    };
  },
  watch: {},
  computed: {
    getBeautifyTime(time) {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
    getBorderType() {
      return "border-" + Math.floor(Math.random() * 6 + 1);
    },
  },
  methods: {
    openModal() {
      //   隐藏遮罩 优先级
      if (process.browser) {
        util.openModal(false);
      }
    },
    setReply(replyObj) {
      if (replyObj.id >= 0 && !replyObj.expand.pay) {
        this.comments_form.pid = replyObj.id;
      }
      //  显示遮罩 优先级
      if (process.browser) {
        util.openModal(true);
      }

      this.replyObj = replyObj;
    },
    submitComments() {
      var data = JSON.parse(JSON.stringify(this.comments_form));
      switch (this.type) {
        case "article":
          data.article_id = this.articleId;
          break;
        case "links":
          data.type = "links";
          break;
        case "msg_wall":
          data.type = "msg_wall";
          break;
        case "about":
          data.type = "about";
          break;
        default:
          break;
      }

      if (!this.isLogin) {
        if (data.nickname == "") {
          this.error_tips = "* 昵称不能为空";
          return;
        } else if (data.email == "") {
          this.error_tips = "* 邮箱不能为空";
          return;
        } else if (!checkStr(data.email, "email")) {
          this.error_tips = "* 邮箱格式错误";
          return;
        } else if (data.url && !checkStr(data.url, "URL")) {
          this.error_tips = "* 网址格式错误(需要加http://或https://)";
          return;
        }
      } else if (data.content == "") {
        this.error_tips = "* 内容不能为空";
        return;
      }

      // 博主
      if (this.$cookies.get("token")) {
        data["login-token"] = this.$cookies.get("token");
      }

      this.$axios.post("/comments", data).then((res) => {
        if (res.code == 200) {
          this.comments_form = {
            email: "",
            nickname: "",
            url: "",
            content: "",
          };
          if (process.browser) {
            document.getElementById("modal-reply").click();
            //  隐藏遮罩 优先级
            util.openModal(false);
          }
          this.$emit("reloadComments");
        } else {
          this.error_tips = "*必填项不能为空";
        }
      });
    },
  },
  created() {
    if (this.$cookies.get("token")) {
      this.isLogin = true;
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.main-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    display: flex;
    align-items: center;
  }
  .badge {
    margin: 0px 0px 0px 10px;
    padding: 1px 3px;
    font-size: 14px;
  }
}
.reply-main-btn {
  width: 100%;
  height: 40px;
  line-height: 35px;
  color: #0071de;
  font-size: 18px;
  background: rgba($color: #0071de, $alpha: 0.1);
  opacity: 0.8;
  text-align: center;
  cursor: pointer;
  transform: scale(1);
  transition: all 0.25s;
  display: inline-block;
  margin-bottom: 20px;
}
.reply-main-btn:hover {
  opacity: 1;
}
.reply-main-btn:active {
  transform: scale(0.95);
}

.reply-modal {
  .title {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 0px 0px 0px;
    display: inline-block;
  }
  .reply-obj {
    display: flex;
    margin: 20px 0px;
    .avatar {
      width: 64px;
      height: 64px;
      margin-right: 20px;
      overflow: hidden;
      img {
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
        width: 100%;
        height: auto;
      }
    }
    .user-info {
      width: calc(100% - 80px);
    }
    .nickname {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .content {
      font-size: 16px;
      line-height: 24px;
      margin-bottom: 10px;
      color: #666;
    }
    .create_time {
      font-size: 14px;
      color: #999;
    }
  }
  .modal-bg {
    cursor: default;
  }
  .modal-body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .modal-body {
    width: 500px;
    max-height: 80vh;
    overflow-y: scroll;

    .reply-form {
      margin-top: 30px;
      .concact {
        display: flex;
        justify-content: space-between;
        .form-group {
          width: calc(50% - 10px);
        }
      }
      input {
        font-size: 14px;
        padding: 5px;
        line-height: 25px;
      }
      textarea {
        font-size: 14px;
        padding: 15px 10px;
        line-height: 25px;
      }
      .form-group {
        label {
          display: flex;
          align-items: center;
          font-size: 16px;
        }
        .badge {
          font-size: 12px;
          padding: 2px;
          margin-left: 5px;
          font-weight: 400;
        }
      }
      .reply-btn {
        font-size: 16px;
        padding: 5px 20px;
      }
    }
  }
}

@media screen and (max-width: 1440px) {
  .aside {
    width: 280px;
  }
}

@media screen and (max-width: 1025px) {
  .modal-body {
    width: 100vw !important;
    height: 100vh !important;
    max-height: 100vh !important;
    z-index: 9999999;
    border: none;
  }

  .reply-modal {
    .modal-body {
      .reply-form {
        input {
          font-size: 14px;
        }
        textarea {
          font-size: 14px;
        }
      }
    }
  }

  .catalogue {
    display: none;
  }
}
</style>
