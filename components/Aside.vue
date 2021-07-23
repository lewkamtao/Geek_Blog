<template>
  <div class="aside-wrapper">
    <div style="margin-bottom: 30px" v-if="false" class="part">
      <div class="main-title">目录</div>
      <div class="aside-list">
        <ul>
          <li><a href="#ia">adad</a></li>
          <li><a href="#ia">标签标签</a></li>
          <li><a href="#ia">asdad1ec</a></li>
          <li><a href="#ia">adad</a></li>
        </ul>
      </div>
    </div>
    <div style="margin-bottom: 30px" class="part">
      <div class="main-title">标签云</div>
      <div v-if="article.expand.tag">
        <span
          v-for="(item, index) in article.expand.tag"
          :key="index"
          class="badge"
          :class="getTagColor()"
          >{{ item.name }}</span
        >
      </div>
      <div v-if="!article.expand.tag">暂无标签</div>
    </div>
    <div class="part">
      <div class="main-title">
        <div class="title">
          评论 <span class="badge secondary">{{ comments.count }}</span>
        </div>

        <input class="modal-state" id="modal-reply" type="checkbox" />
        <div class="modal reply-modal">
          <label class="modal-bg" for="modal-reply"></label>
          <div class="modal-body">
            <label class="btn-close" for="modal-reply">X</label>
            <div v-if="replyObj.expand" class="reply-obj">
              <img :src="replyObj.expand.head_img" alt="" srcset="" />
              <div>
                <div class="nickname">{{ replyObj.nickname }}</div>
                <div class="content">
                  {{ replyObj.content }}
                </div>
                <div v-if="replyObj.create_time" class="create_time">
                  {{ getBeautifyTime(replyObj.create_time) }}
                </div>
              </div>
            </div>
            <div class="title badge">
              {{ replyObj.expand ? "回复评论" : "发表评论" }}
            </div>

            <div class="reply-form">
              <div class="concact">
                <div class="form-group">
                  <label for="paperInputs2"
                    >昵称<span class="badge danger">必填</span></label
                  >
                  <input
                    class="input-block"
                    type="text"
                    id="paperInputs2"
                    placeholder=""
                  />
                </div>
                <div class="form-group">
                  <label for="paperInputs3">邮箱</label>
                  <input
                    class="input-block"
                    type="text"
                    id="paperInputs3"
                    placeholder=""
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="paperInputs3">博客地址</label>
                <input
                  class="input-block"
                  type="text"
                  id="paperInputs3"
                  placeholder=""
                />
              </div>
              <div class="form-group">
                <label for="large-input"
                  >内容<span class="badge danger">必填</span></label
                >
                <textarea
                  style="width: 100%; height: 150px"
                  class="no-resize"
                  id="no-resize"
                  placeholder=""
                ></textarea>
              </div>
              <div class="row flex-right">
                <button class="btn-secondary reply-btn">发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label
        class="border border-secondary reply-main-btn"
        @click="
          setReply({
            nickname: article.expand.author.nickname,
            expand: article.expand.author,
          })
        "
        for="modal-reply"
        >发表评论
      </label>

      <div v-if="comments.data.length == 0">暂无评论</div>
      <div v-if="comments.data.length != 0" class="comments">
        <div
          class="comments-box"
          v-for="(item, index) in comments.data"
          :key="index"
        >
          <CommentCard @setReply="setReply" :comment="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
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
    };
  },
  watch: {},
  computed: {
    getBeautifyTime() {
      return function (time) {
        return util.getBeautifyTime(time);
      };
    },
  },
  methods: {
    getTagColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    },
    setReply(replyObj) {
      console.log(replyObj);
      this.replyObj = replyObj;
    },
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.aside-wrapper {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 75px;
}
.badge {
  cursor: pointer;
  margin-bottom: 7px;
  font-weight: 400;
  font-size: 12px;
  margin-right: 7px;
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
  height: 50px;
  line-height: 50px;
  color: #0071de;
  font-size: 26px;
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
    background: #0071de;
    font-size: 30px;
    margin: 20px 0px 0px 0px;
    display: inline-block;
  }
  .reply-obj {
    display: flex;
    margin: 20px 0px;
    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
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
    }
    .create_time {
      font-size: 14px;
      color: #999;
    }
  }
  .modal-body::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .modal-body {
    width: 600px;
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
          font-size: 18px;
        }
      }
      .reply-btn {
        padding: 10px 20px;
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