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
        <label
          class="border border-secondary reply-main-btn"
          @click="
            setReply({
              id: 2313,
              nickname: '主任'
            })
          "
          for="modal-reply"
          >我要发言</label
        >

        <input class="modal-state" id="modal-reply" type="checkbox" />
        <div class="modal">
          <label class="modal-bg" for="modal-reply"></label>
          <div class="modal-body">
            <label class="btn-close" for="modal-reply">X</label>
            <h4 class="modal-title">{{ reply.id }}</h4>
            <h5 class="modal-subtitle">{{ reply.nickname }}</h5>
            <p class="modal-text">
              This is an example of modal which is implemented with pure CSS! :D
            </p>
            <label for="modal-reply">Nice!</label>
          </div>
        </div>
      </div>

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
      reply: {}
    };
  },
  watch: {},
  computed: {},
  methods: {
    getTagColor() {
      var options = ["", "secondary", "success", "warning", "danger"];
      var index = Math.floor(Math.random() * options.length);
      return options[index];
    },
    setReply({ id, nickname }) {
      this.reply = {
        id: id,
        nickname: nickname
      };
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
  .reply-main-btn {
    color: #0071de;
    background: rgba($color: #0071de, $alpha: 0.1);
    height: 30px;
    opacity: 0.8;
    text-align: center;
    cursor: pointer;
    transform: scale(1);
    transition: all 0.25s;
    font-size: 16px;
    line-height: 30px;
    padding: 0px 15px;
  }
  .reply-main-btn:hover {
    opacity: 1;
  }
  .reply-main-btn:active {
    transform: scale(0.95);
  }
}
</style>