<template>
  <div class="messgae-wrapper part">
    <div class="messgae">
      <div class="messgae-title">
        <div class="title">
          留言墙
          <span class="badge secondary">{{ msg_wall.count }}</span>
        </div>
      </div>

      <div class="messgae-form">
        <div class="modal-body">
          <div class="reply-form">
            <div v-if="!isLogin" class="concact">
              <div class="form-group">
                <label for="paperInputs4">
                  昵称
                  <span class="badge danger">必填</span>
                </label>
                <input
                  v-model="comments_form.nickname"
                  class="input-block"
                  type="text"
                  id="paperInputs4"
                  placeholder
                />
              </div>
              <div class="form-group">
                <label for="paperInputs5">
                  邮箱
                  <span class="badge danger">必填</span>
                </label>
                <input
                  v-model="comments_form.email"
                  class="input-block"
                  type="text"
                  id="paperInputs5"
                  placeholder
                />
              </div>
            </div>

            <div v-if="!isLogin" class="form-group">
              <label for="paperInputs6">博客地址</label>
              <input
                v-model="comments_form.url"
                class="input-block"
                type="text"
                id="paperInputs6"
                placeholder
              />
            </div>
            <div class="form-group">
              <label>
                留言内容
                <span class="badge danger">必填</span>
              </label>
              <textarea
                v-model="comments_form.content"
                style="width: 100%; height: 150px"
                class="no-resize"
                id="no-resize"
                placeholder="这一刻的想法..."
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
                  align-items: center;
                  margin-top: -5px;
                  font-size: 25px;
                  transform: scaleX(1.8) rotate(-3deg);
                "
                class="btn-close"
                >X</label
              >
            </div>

            <div class="row flex-right">
              <button
                @click="submitComments('mes')"
                class="btn-secondary reply-btn"
              >
                发送
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 50px" v-if="msg_wall.data.length == 0">
        暂无留言
      </div>
      <div v-if="msg_wall.data.length != 0" class="comments">
        <div
          class="comments-box"
          v-for="(item, index) in msg_wall.data"
          :key="index"
        >
          <CommentCard @setReply="setReply" :comment="item" />
        </div>
      </div>
    </div>

    <div class="reply">
      <input class="modal-state" id="modal-reply" type="checkbox" />
      <div class="modal reply-modal">
        <label class="modal-bg"></label>
        <div class="modal-body">
          <label @click="openModal" class="btn-close" for="modal-reply"
            >X</label
          >
          <div v-if="replyObj.expand" class="reply-obj">
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
          <div v-if="replyObj.expand" class="title">
            {{
              replyObj.expand.pay
                ? "发表对" + replyObj.nickname + "的评论"
                : "回复" + replyObj.nickname + "的评论"
            }}
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
                placeholder="这一刻的想法..."
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
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import checkStr from "@/util/checkStr";
import CommentCard from "@/components/detail/parts/CommentCard.vue";

export default {
  components: { CommentCard },
  props: {
    msg_wall: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      replyObj: {},
      isLogin: false,
      comments_form: {
        email: "",
        nickname: "",
        url: "", 
        content: "",
      },
      error_tips: "",
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
    getBorderType() {
      return function () {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    },
  },
  methods: {
    getTagColor() {
      var tag_options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * tag_options.length);
      return tag_options[index];
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
    openModal() {
      //  显示遮罩 优先级
      if (process.browser) {
        util.openModal(false);
      }
    },
    submitComments(type) {
      if (type == "mes") {
        delete this.comments_form.pid;
      }
      var data = JSON.parse(JSON.stringify(this.comments_form));
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
      if (this.$cookies.get("token")) {
        data["login-token"] = this.$cookies.get("token");
      }
      data.type = "msg_wall";
      this.$axios.post("/comments", data).then((res) => {
        if (res.code == 200) {
          if (type != "mes") {
            if (process.browser) {
              document.getElementById("modal-reply").click();
              //  隐藏遮罩 优先级
              util.openModal(false);
            }
          }
          this.comments_form = {
            email: "",
            nickname: "",
            url: "",
            content: "",
          };
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
.messgae-wrapper {
  width: 100%;
  box-sizing: border-box;
}

.messgae {
  width: 500px;
  margin: 100px auto;
}
.tags-box {
  .badge {
    cursor: pointer;
    margin-bottom: 7px;
    font-weight: 400;
    font-size: 12px;
    margin-right: 7px;
  }
}
.messgae-list {
  margin-left: 25px;
  line-height: 25px;
}

.messgae-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  .title {
    font-size: 50px;
    font-weight: bold;
    color: #000;
    display: flex;
    align-items: center;
  }
  .badge {
    margin: 0px 0px 0px 10px;
    font-size: 30px;
  }
}
.reply-main-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #0071de;
  font-size: 24px;
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

.messgae-form,
.reply-modal {
  .title {
    font-size: 18px;
    font-weight: bold;
    color: #000;
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
.messgae-form .modal-body {
  overflow: hidden;
}
@media screen and (max-width: 1025px) {
  .messgae {
    width: 100%;
    margin: 20px auto;
    .messgae-title {
      margin-bottom: 0px;
      .title {
        font-size: 24px;
      }
      .badge {
        font-size: 18px;
      }
    }

    .messgae-form {
      .modal-body {
        width: 100%;
        .reply-form {
          .reply-btn {
            padding: 5px 20px;
            font-size: 15px;
          }
        }
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
  }
  .reply {
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
        .reply-btn {
          padding: 5px 20px;
          font-size: 15px;
        }
      }
    }
    .modal-body {
      width: 100vw !important;
      height: 100vh !important;
      max-height: 100vh !important;
      z-index: 9999999;
      border: none;
    }
  }
}
</style>