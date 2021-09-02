<template>
  <div class="PostTimeLine-wrapper part">
    <div class="main-title">发布时光鸡</div>
    <div class="form">
      <comment-form
        :isLogin="isLogin"
        type="moving"
        style="margin-bottom: 20px"
        @reloadComments="reloadComments"
      ></comment-form>
    </div>
  </div>
</template>

<script>
import CommentForm from "./CommentForm.vue";

export default {
  components: { CommentForm },
  props: {},
  data() {
    return { isLogin: false };
  },
  watch: {},
  computed: {},
  methods: {
    reloadComments() {
      this.$emit("reloadComments");
    },
  },
  created() {
    var token = this.$cookies.get("token");
    // 博主
    if (token) {
      this.isLogin = true;
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.PostTimeLine-wrapper {
  .error_tips {
    margin-top: 10px;
    color: #a7342d;
  }
}
</style>
