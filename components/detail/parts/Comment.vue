<template>
  <div class="part">
    <div class="main-title">
      <div class="title">
        {{ type == "msg_wall" ? "留言" : "评论" }}
        <span style="margin-left: 10px" class="ui mini blue label">{{
          comments.count
        }}</span>
      </div>
    </div>
    <div style="margin-bottom: 20px" v-if="comments.data.length == 0">
      {{ type == "msg_wall" ? "暂无留言" : "暂无评论" }}
    </div>
    <comment-form
      :type="type"
      :isLogin="isLogin"
      :articleId="articleId"
      style="margin-bottom: 20px"
      @reloadComments="reloadComments"
    ></comment-form>
    <div v-if="comments.data.length != 0" class="comments">
      <comment-card
        v-for="(item, index) in comments.data"
        :key="index"
        :masterId="masterId"
        @setCurId="setCurId"
        :type="type"
        :isLogin="isLogin"
        :curId="curId"
        :articleId="articleId"
        :comment="item"
        @reloadComments="reloadComments"
        class="comment-card"
      ></comment-card>
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
      default: function() {
        return {};
      }
    },
    comments: {
      type: Object,
      default: function() {
        return {};
      }
    },
    articleId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curId: 0,
      isLogin: false,
      masterId: ""
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

    async getMasterId() {
      this.masterId = (
        await this.$axios.get("/options?key=webmaster")
      ).data.opt.users_id;
    }
  },
  created() {
    var token = this.$cookies.get("token");
    // 博主
    if (token) {
      this.isLogin = true;
    }
  },
  mounted() {
    this.getMasterId();
  }
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
.comment-card:last-child {
  margin-bottom: 0px !important;
}
</style>
