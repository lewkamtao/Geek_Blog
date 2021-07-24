<template>
  <div class="messgae-wrapper part">
    <div class="messgae">
      <div class="messgae-title">
        <div class="title">
          留言墙
          <span class="badge secondary">{{ article.expand.comments }}</span>
        </div>
      </div>

      <div class="messgae-form">
        <div class="modal-body">
          <div class="reply-form">
            <div class="concact">
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

            <div class="form-group">
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
                placeholder
              ></textarea>
            </div>
            <div v-show="error_tips" class="alert alert-danger dismissible alert-reply">
              {{ error_tips }}
              <label
                @click="error_tips = ''"
                style="position:static; color:#cb453c;     align-items: center; margin-top:-5px; font-size:25px; transform:scaleX(1.8) rotate(-3deg);"
                class="btn-close"
              >X</label>
            </div>

            <div class="row flex-right">
              <button @click="submitComments('mes')" class="btn-secondary reply-btn">发送</button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top:50px" v-if="comments.data.length == 0">暂无留言</div>
      <div v-if="comments.data.length != 0" class="comments">
        <div class="comments-box" v-for="(item, index) in comments.data" :key="index">
          <CommentCard @setReply="setReply" :comment="item" />
        </div>
      </div>
    </div>

    <div class="reply">
      <input class="modal-state" id="modal-reply" type="checkbox" />
      <div class="modal reply-modal">
        <label class="modal-bg"></label>
        <div class="modal-body">
          <label @click="closeModal" class="btn-close" for="modal-reply">X</label>
          <div v-if="replyObj.expand" class="reply-obj">
            <div class="avatar border border-primary" :class="getBorderType()">
              <img :src="replyObj.expand.head_img" alt srcset />
            </div>
            <div class="user-info">
              <div class="nickname">{{ replyObj.nickname }}</div>
              <div class="content">{{ replyObj.content || replyObj.expand.description }}</div>
              <div
                v-if="replyObj.create_time"
                class="create_time"
              >{{ getBeautifyTime(replyObj.create_time) }}</div>
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
            <div class="concact">
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

            <div class="form-group">
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
            <div v-show="error_tips" class="alert alert-danger dismissible alert-reply">
              {{ error_tips }}
              <label
                @click="error_tips = ''"
                style="position:static; color:#cb453c; margin-top:-5px; font-size:25px; transform:translateX(10px) scaleX(1.8) rotate(-3deg);"
                class="btn-close"
              >X</label>
            </div>

            <div class="row flex-right">
              <button @click="submitComments" class="btn-secondary reply-btn">发送</button>
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
import CommentCard from "./CommentCard.vue";

export default {
  components: { CommentCard },
  props: {
    article: {
      type: Object,
      default: {}
    },
    comments: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      replyObj: {},
      comments_form: {
        email: "",
        nickname: "",
        url: "",
        content: ""
      },
      error_tips: ""
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function(time) {
        return util.getBeautifyTime(time);
      };
    },
    getBorderType() {
      return function() {
        return "border-" + Math.floor(Math.random() * 6 + 1);
      };
    }
  },
  methods: {
    getTagColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    },
    setReply(replyObj) {
      if (replyObj.id >= 0 && !replyObj.expand.pay) {
        this.comments_form.pid = replyObj.id;
      }
      // 关闭topNav条 显示遮罩 优先级
      if (process.browser) {
        util.showTopNav(false);
      }
      this.replyObj = replyObj;
    },
    closeModal() {
      // 开启topNav条 显示遮罩 优先级
      if (process.browser) {
        util.showTopNav(true);
      }
    },
    submitComments(type) {
      if (type == "mes") {
        delete this.comments_form.pid;
      }
      this.comments_form.article_id = this.article.id;
      var data = JSON.parse(JSON.stringify(this.comments_form));
      if (data.nickname == "") {
        this.error_tips = "* 昵称不能为空";
        return;
      } else if (data.email == "") {
        this.error_tips = "* 邮箱不能为空";
        return;
      } else if (data.content == "") {
        this.error_tips = "* 内容不能为空";
        return;
      } else if (!checkStr(data.email, "email")) {
        this.error_tips = "* 邮箱格式错误";
        return;
      } else if (data.url && !checkStr(data.url, "URL")) {
        this.error_tips = "* 网址格式错误(需要加http://或https://)";
        return;
      }

      this.$axios.post("/comments", this.comments_form).then(res => {
        if (res.code == 200) {
          if (type != "mes") {
            if (process.browser) {
              document.getElementById("modal-reply").click();
              // 开启topNav条 隐藏遮罩 优先级
              util.showTopNav(true);
            }
          }
          this.comments_form = {
            email: "",
            nickname: "",
            url: "",
            content: ""
          };
          this.$emit("reloadComments");
        } else {
          this.error_tips = "*必填项不能为空";
        }
      });
    }
  },
  created() {},
  mounted() {}
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
    font-size: 30px;
    color: #000;
    margin: 20px 0px 0px 0px;
    display: inline-block;
  }
  .reply-obj {
    display: flex;
    margin: 20px 0px;
    .avatar {
      width: 70px;
      height: 70px;
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
      font-weight: 500;
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
        font-size: 18px;
        padding: 5px;
        line-height: 25px;
      }
      textarea {
        font-size: 18px;
        padding: 15px 10px;
        line-height: 25px;
      }
      .form-group {
        label {
          display: flex;
          align-items: center;
          font-size: 18px;
        }
        .badge {
          font-size: 12px;
          padding: 2px;
          margin-left: 5px;
          font-weight: 400;
        }
      }
      .reply-btn {
        padding: 5px 20px;
      }
    }
  }
}
</style>