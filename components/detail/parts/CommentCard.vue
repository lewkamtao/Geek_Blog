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
            v-if="comment.id == 2"
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
            <p>{{ comment.content }}</p>
          </div>
          <div class="actions">
            <label
              class="reply-btn"
              @click="reply(comment.id)"
              for="modal-reply"
            >
              <svg
                class="Zi Zi--Reply"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="14"
                height="14"
                style="margin-right: 5px"
              >
                <path
                  d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z"
                  fill-rule="evenodd"
                /></svg
              >回复
            </label>
          </div>
        </div>
        <comment-form
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
              <div class="text">{{ son.content }}</div>
              <div class="actions">
                <label
                  class="reply-btn"
                  @click="reply(son.id)"
                  for="modal-reply"
                >
                  <svg
                    class="Zi Zi--Reply"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    style="margin-right: 5px"
                  >
                    <path
                      d="M22.959 17.22c-1.686-3.552-5.128-8.062-11.636-8.65-.539-.053-1.376-.436-1.376-1.561V4.678c0-.521-.635-.915-1.116-.521L1.469 10.67a1.506 1.506 0 0 0-.1 2.08s6.99 6.818 7.443 7.114c.453.295 1.136.124 1.135-.501V17a1.525 1.525 0 0 1 1.532-1.466c1.186-.139 7.597-.077 10.33 2.396 0 0 .396.257.536.257.892 0 .614-.967.614-.967z"
                      fill-rule="evenodd"
                    /></svg
                  >回复
                </label>
              </div>
            </div>
            <comment-form
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
  background: rgba($color: #000, $alpha: 0.025);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  .comments {
    margin-top: 0px;
  }
  .reply-btn {
    color: #999;
    padding: 2px 4px;
    cursor: pointer;
    font-weight: 400;
    font-size: 12px;
    transition: all 0.25s;
    margin-left: -5px;
    display: flex;
    align-items: center;
  }
  .master {
    background: #a7342d;
    padding: 1px 2px;
    margin-left: 5px;
    opacity: 0.6;
    font-weight: normal;
    cursor: default;
  }
}
.lately {
  .reply-btn {
    display: none;
  }
  cursor: pointer;
}
@media screen and (max-width: 1025px) {
  .comment-wrapper {
    .comment-card {
      .reply-btn {
        opacity: 0.8;
      }
      .master {
        font-size: 80%;
        padding: 1px 3px;
      }
    }
  }
}
</style>
