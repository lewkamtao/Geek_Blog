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
    <div v-if="comments.data.length != 0" class="comments" id="comments">
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
  components: {CommentCard, CommentForm},
  props: {
    type: {
      type: String,
      default: function () {
        return {};
      }
    },
    comments: {
      type: Object,
      default: function () {
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
      masterId: 1
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
      this.masterId = Number((
        await this.$axios.get("/api/options?key=webmaster")
      ).data.opt.users_id);
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
    // 处理评论
    if (process.browser) {
      this.$nextTick(function () {
        try {
          setTimeout(async () => {
            if (document.getElementById("comments") == null){
              return;
            }
            // 处理评论图片fancybox
            let imgdom = "";
            let imgs = document
              .getElementById("comments")
              .querySelectorAll(".v-note-panel img");
            for (let i = 0; i < imgs.length; i++) {
              // 如果img标签的父级是a标签，不增加fancybox
              let node = imgs[i].parentNode.localName;
              if (node === "a") {
                continue;
              }
              let elem = document.createElement("a");
              elem.setAttribute("data-fancybox", "gallery");
              imgdom = imgs[i].cloneNode(true);
              elem["href"] = imgdom.src;
              elem.appendChild(imgdom);
              imgs[i].parentNode.replaceChild(elem, imgs[i]);
            }

            // 处理a标签跳转到新窗口
            Array.from(document.getElementById("comments").getElementsByTagName("a")).forEach(function (aTag) {
              aTag.setAttribute("target", "_blank");
              aTag.setAttribute("rel", "external nofollow noopener noreferrer");
            })
          }, 1000);
        } catch {
        }
      });
    }
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
