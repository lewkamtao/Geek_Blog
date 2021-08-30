<template>
  <div
    class="comment-wrapper"
    :class="{ lately: type == 'lately' }"
    @click="toDetail()"
  >
    <div class="ui comments">
      <div class="comment">
        <a class="avatar" :href="comment.expand.url" target="_blank">
          <img :src="comment.expand.head_img" />
        </a>
        <div class="content">
          <a class="author" :href="comment.expand.url" target="_blank">
            {{ comment.nickname }} </a
          ><a
            v-if="comment.users_id == 2"
            style="margin-left: 5px"
            class="ui mini image label"
          >
            <img src="https://semantic-ui.com/images/avatar/small/joe.jpg" />
            博主
          </a>
          <div class="metadata">
            <span class="date">
              {{ getBeautifyTime(comment.create_time) }}</span
            >
          </div>
          <div class="text">
            <p v-html="comment.content"></p>
          </div>
          <div class="actions">
            <div class="btn-box">
              <div
                style="margin-right: 10px; color: #999; margin-left: 1px"
                @click="reply(comment.id)"
              >
                回复
              </div>
              <div
                v-if="isLogin"
                style="color: #a7342d"
                @click="delConfirm(comment.id)"
              >
                删除
              </div>
            </div>
          </div>
        </div>
        <comment-form
          :isLogin="isLogin"
          :type="type"
          :articleId="articleId"
          :pid="comment.id"
          v-if="curId == comment.id"
          @reloadComments="reloadComments"
        ></comment-form>
        <div v-for="(son, index) in comment.son" :key="index" class="comments">
          <div v-if="comment.son && comment.son.length != 0" class="comment">
            <a :href="son.expand.url" class="avatar" target="_blank">
              <img :src="son.expand.head_img" />
            </a>
            <div class="content">
              <a :href="son.expand.url" class="author" target="_blank">
                {{ son.nickname }}</a
              ><a
                v-if="son.users_id == 2"
                style="margin-left: 5px"
                class="ui mini image label"
              >
                <img
                  src="https://semantic-ui.com/images/avatar/small/joe.jpg"
                />
                博主
              </a>
              <div class="metadata">
                <span class="date">
                  {{ getBeautifyTime(son.create_time) }}</span
                >
              </div>
              <div v-html="son.content" class="text"></div>
              <div class="actions">
                <div class="btn-box">
                  <div
                    style="margin-right: 10px; color: #999; margin-left: 1px"
                    @click="reply(son.id)"
                  >
                    回复
                  </div>
                  <div
                    v-if="isLogin"
                    style="color: #a7342d"
                    @click="delConfirm(son.id)"
                  >
                    删除
                  </div>
                </div>
              </div>
            </div>
            <comment-form
              :isLogin="isLogin"
              :type="type"
              :articleId="articleId"
              :pid="son.id"
              v-if="curId == son.id"
              @reloadComments="reloadComments"
            ></comment-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";
import CommentCard from "./CommentCard.vue";
import CommentForm from "./CommentForm.vue";

export default {
  components: { CommentCard, CommentForm },
  props: {
    type: {
      type: String,
      default: "",
    },
    curId: {
      type: Number,
      default: 0,
    },
    articleId: {
      type: Number,
      default: 0,
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
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

    getUA() {
      return function (agent) {
        return (
          "来自 " +
          (agent.os.system +
            " " +
            agent.os.version +
            " " +
            agent.browser.kernel)
        );
      };
    },
  },
  methods: {
    reply(id) {
      this.$emit("setCurId", id);
    },
    reloadComments() {
      this.$emit("reloadComments");
    },
    delConfirm(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.del(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    del(id) {
      if (this.$cookies.get("token")) {
        var data = {
          "login-token": this.$cookies.get("token"),
          mode: "remove",
          id: JSON.stringify(id),
        };

        this.$axios.post("/comments", data).then((res) => {
          if (res.code == 200) {
            this.$emit("reloadComments");
            this.$notify({
              type: "success",
              title: "恭喜！",
              message: "成功删除了一条评论",
              duration: 5000,
              offset: 65,
            });
          }
        });
      }
    },
    toDetail() {
      if (this.type == "lately") {
        if (this.comment.article_id) {
          this.$router.push("/Article?id=" + this.comment.article_id);
        } else {
          switch (this.comment.type) {
            case "links":
              this.$router.push("/Links");
              break;
            case "msg_wall":
              this.$router.push("/MsgWall");
              break;
            case "moving":
              this.$router.push("/Timeline");
              break;
            case "about":
              this.$router.push("/About");
              break;

            default:
              break;
          }
        }
      }
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.comment-wrapper {
  position: relative;
  z-index: 9;
  padding: 10px;
  .comments {
    margin-top: 0px;
  }
  .btn-box {
    padding: 2px 4px;
    cursor: pointer;
    font-weight: 400;
    font-size: 12px;
    transition: all 0.25s;
    margin-left: -5px;
    display: flex;
    align-items: center;
  }
}
.lately {
  .btn-box {
    display: none;
  }
  cursor: pointer;
}
</style>
