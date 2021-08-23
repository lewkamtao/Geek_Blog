<template>
  <div class="part">
    <div class="main-title">
      <div class="title">
        {{ type == "msg_wall" ? "留言" : "评论" }}
        <span style="margin-left: 10px" class="ui mini red label">{{
          comments.count
        }}</span>
      </div>
    </div>
    <div style="margin-bottom: 20px" v-if="comments.data.length == 0">
      {{ type == "msg_wall" ? "暂无留言" : "暂无评论" }}
    </div>
    <comment-form
      :type="type"
      :articleId="articleId"
      style="margin-bottom: 20px"
      @reloadComments="reloadComments"
    ></comment-form>
    <div v-if="comments.data.length != 0" class="comments">
      <div
        class="comments-box"
        v-for="(item, index) in comments.data"
        :key="index"
      >
        <comment-card
          @setCurId="setCurId"
          :curId="curId"
          :articleId="articleId"
          :comment="item"
          @reloadComments="reloadComments"
        ></comment-card>
      </div>
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
import CommentForm from "./CommentForm.vue";

export default {
  components: { CommentCard, CommentForm },
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
      default: 0,
    },
  },
  data() {
    return {
      curId: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    setCurId(id) {
      this.curId = id;
    },
    reloadComments() {
      this.curId = 0;
      this.$emit("reloadComments");
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
    width: 260px;
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
