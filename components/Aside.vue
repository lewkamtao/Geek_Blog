<template>
  <div class="aside-wrapper">
    <div style="margin-bottom: 30px" v-if="false" class="part">
      <div class="main-title">目录</div>
      <div class="aside-list">
        <ul>
          <li>
            <a href="#ia">adad</a>
          </li>
          <li>
            <a href="#ia">标签标签</a>
          </li>
          <li>
            <a href="#ia">asdad1ec</a>
          </li>
          <li>
            <a href="#ia">adad</a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="type=='article'" style="margin-bottom: 30px" class="part">
      <div class="main-title">标签云</div>
      <div v-if="article.expand.tag" class="tags-box">
        <span
          v-for="(item, index) in article.expand.tag"
          :key="index"
          class="badge"
          :class="getTagColor()"
        >{{ item.name }}</span>
      </div>
      <div v-if="!article.expand.tag">暂无标签</div>
    </div>
    <div class="part">
      <div class="main-title">
        <div class="title">
          评论
          <span class="badge secondary">{{ article.expand.comments }}</span>
        </div>
      </div>
      <div style="margin-bottom:10px" v-if="comments.data.length == 0">暂无评论</div>
      <label
        class="border border-secondary reply-main-btn"
        @click="
          setReply({
            nickname: article.expand.author.nickname,
            expand: article.expand.author
          })
        "
        for="modal-reply"
      >{{type=='article'?"发表评论":"立即申请"}}</label>
      <input class="modal-state" id="modal-reply" type="checkbox" />
      <div class="modal reply-modal">
        <label class="modal-bg"></label>
        <div class="modal-body">
          <label class="btn-close" @click="closeModal" for="modal-reply">X</label>
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
          <div v-if="replyObj.expand&&type=='article'" class="title">
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
            <div v-if="replyObj.expand&&replyObj.expand.pay&&type=='links'">
              <h5>申请示例：</h5>
              <ul style="margin:10px 0px 30px 18px">
                <li>名称：{{replyObj.expand.nickname}}</li>
                <li>地址：{{replyObj.expand.address_url || "https://kamtao.com/"}}</li>
                <li>头像：{{replyObj.expand.head_img}}</li>
                <li>描述：{{replyObj.expand.description || "做一个很酷的人"}}</li>
              </ul>
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
      <div v-if="comments.data.length != 0" class="comments">
        <div class="comments-box" v-for="(item, index) in comments.data" :key="index">
          <CommentCard @setReply="setReply" :comment="item" />
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
    type: {
      type: String,
      default: {}
    },
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
    closeModal() {
      // 开启topNav条  隐藏遮罩 优先级
      if (process.browser) {
        util.showTopNav(true);
      }
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
    submitComments() {
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
          this.comments_form = {
            email: "",
            nickname: "",
            url: "",
            content: ""
          };

          if (process.browser) {
            document.getElementById("modal-reply").click();
            // 开启topNav条 隐藏遮罩 优先级
            util.showTopNav(true);
          }
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
.aside-wrapper {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 70px;
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
.aside-list {
  margin-left: 25px;
  line-height: 25px;
}

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
    font-size: 15px;
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

@media screen and (max-width: 1440px) {
  .aside {
    width: 280px;
  }
}
</style>