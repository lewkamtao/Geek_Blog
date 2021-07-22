<template>
  <div class="comment-wrapper">
    <div class="comment-card">
      <div class="left">
        <div class="avatar border border-primary" :class="getBorderType()">
          <img :src="comment.expand.head_img" alt="" srcset="" />
        </div>
      </div>
      <div class="right">
        <div class="nickname">
          {{ comment.nickname }}
          <label
            class="reply-btn"
            @click="reply({ id: comment.id, nickname: comment.nickname })"
            for="modal-reply"
            >回复</label
          >
        </div>
        <div class="content">
          {{ comment.content }}
        </div>
        <div class="create_time">
          {{ getBeautifyTime(comment.create_time) }}
        </div>
      </div>
    </div>
    <div class="son-box">
      <div
        class="comments-box"
        v-for="(son, index) in comment.son"
        :key="index"
      >
        <div class="comment-card">
          <div class="left">
            <div class="avatar border border-primary" :class="getBorderType()">
              <img :src="son.expand.head_img" alt="" srcset="" />
            </div>
          </div>
          <div class="right">
            <div class="nickname">
              {{ son.nickname }}
              <label
                class="reply-btn"
                @click="reply({ id: son.id, nickname: son.nickname })"
                for="modal-reply"
                >回复</label
              >
            </div>
            <div class="content">
              {{ son.content }}
            </div>
            <div class="create_time">
              {{ getBeautifyTime(son.create_time) }}
            </div>
          </div>
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
        update_time: "2021-03-23 18:36:31",
        son: [],
      },
    },
  },
  data() {
    return {};
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
    reply({ id, nickname }) {
      this.$emit("setReply", { id, nickname });
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.comment-wrapper {
  background: #f4f7f9;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;
  .son-box {
    width: calc(100% - 30px);
    margin-left: 30px;
  }

  .comment-card {
    padding: 10px;
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
          width: 100%;
          height: auto;
        }
      }
    }
    .right {
      width: calc(100% - 60px);
      .content {
        color: #666;
        margin: 7px 0px 10px 0px;
        font-size: 14px;
        line-height: 20px;
      }
      .create_time {
        font-size: 14px;
        color: #999;
      }
    }
  }
  .reply-btn {
    border-radius: 2px;
    background: #7fad88;
    color: #fff;
    padding: 2px 4px;
    cursor: pointer;
    opacity: 0.8;
    transition: all 0.25s;
    margin-left: 5px;
  }
  .reply-btn:hover {
    opacity: 1;
  }
}
</style>