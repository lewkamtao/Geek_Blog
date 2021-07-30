<template>
  <div class="comment-wrapper">
    <div class="comment-card">
      <div class="left">
        <div class="avatar border border-primary">
          <img :class="getBorderType()" :src="comment.expand.head_img" alt srcset />
        </div>
      </div>
      <div class="right">
        <div class="nickname">
          {{ comment.nickname }}
          <label v-if="comment.users_id == 2" class="badge master">博主</label>
        </div>
        <div class="content">{{ comment.content }}</div>
        <!-- <div v-show="comment.url && comment.users_id != 2" class="blog-url">
          博主站点：
          <a :href="'http://' + comment.url" target="_blank">
            {{
            comment.url
            }}
          </a>
        </div>-->
        <div class="create_time">{{ getBeautifyTime(comment.create_time) }}</div>
      </div>
      <label class="reply-btn" @click="reply(comment)" for="modal-reply">
        <svg
          class="Zi Zi--Reply"
          fill="currentColor"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          style="margin-right: 5px;"
        >
          <path
            d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z"
            fill-rule="evenodd"
          />
        </svg>回复
      </label>
    </div>
    <div v-if="comment.son&&comment.son.length != 0" class="son-box">
      <div class="comments-box" v-for="(son, index) in comment.son" :key="index">
        <div class="comment-card">
          <div class="left">
            <div class="avatar border border-primary" :class="getBorderType()">
              <img :src="son.expand.head_img" alt srcset />
            </div>
          </div>
          <div class="right">
            <div class="nickname">
              {{ son.nickname }}
              <label v-if="son.users_id == 2" class="badge master">博主</label>
            </div>
            <div class="content">{{ son.content }}</div>
            <!-- <div v-show="son.url && son.users_id != 2" class="blog-url">
              博主站点：
              <a :href="'http://' + son.url" target="_blank">{{ son.url }}</a>
            </div>-->
            <div class="create_time">{{ getBeautifyTime(son.create_time) }}</div>
          </div>
          <label class="reply-btn" @click="reply(son)" for="modal-reply">
            <svg
              class="Zi Zi--Reply"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              style="margin-right: 5px;"
            >
              <path
                d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z"
                fill-rule="evenodd"
              />
            </svg>回复
          </label>
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
    comment: {
      type: Object,
      default: {
        id: 61,
        pid: 0,
        content: "demo",
        nickname: "demoName",
        email: "div@kamtao.com",
        url: "",
        ip: "117.140.124.103",
        type: "article",
        status: 1,
        agent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36",
        is_show: 1,
        users_id: null,
        article_id: 74,
        opt: null,
        create_time: "2021-03-22 17:45:09",
        create_time: "2021-03-23 18:36:31",
        son: []
      }
    }
  },
  data() {
    return {};
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
    reply(replyObj) {
      this.$emit("setReply", replyObj);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.comment-wrapper {
  background: rgba($color: #000, $alpha: 0.025);
  border-radius: 10px;
  margin-bottom: 12px;
  overflow: hidden;
  .son-box {
    width: calc(100% - 30px);
    margin: 0px 0px 0px 30px;
  }
  .comment-card:hover {
    background: rgba($color: #000, $alpha: 0.05);
    .reply-btn {
      opacity: 0.8;
      transition: all 0.25s;
    }
    .reply-btn:hover {
      opacity: 1;
      transform: scale(1.05);
    }
  }
  .comment-card {
    position: relative;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    .left {
      width: 40px;
      margin-right: 10px;
      .avatar {
        width: 40px;
        height: 40px;
        overflow: hidden;
        display: flex;
        align-items: center;

        img {
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
          border-top-left-radius: 0px;
          border-top-right-radius: 0px;
          width: 100%;
          height: auto;
        }
      }
    }
    .right {
      width: calc(100% - 60px);
      .nickname {
        font-size: 14px;
        color: #5f6984;
        font-weight: bold;
      }
      .content {
        color: #1e1e1e;
        margin: 3px 0px 6px 0px;
        font-size: 14px;
        line-height: 20px;
      }
      .blog-url {
        margin-bottom: 10px;
        color: #0071de;
        font-style: italic;
      }
      .create_time {
        font-size: 12px;
        color: #999;
        font-weight: 400;
      }
    }
  }

  .reply-btn {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: #0071de;
    opacity: 0;
    padding: 2px 4px;
    cursor: pointer;
    font-weight: 400;
    font-size: 13px;
    transition: all 0.25s;
    margin-left: 5px;
    display: flex;
    align-items: center;
  }
  .master {
    background: #a7342d;
    opacity: 0.6;
    cursor: default;
  }
}
@media screen and (max-width: 1025px) {
  .comment-wrapper {
    .comment-card {
      .reply-btn {
        opacity: 0.8;
      }
      .master {
        font-size: 80%;
        padding: 1px 3px ;
      }
    }
  }
}
</style>