<template>
  <div class="messgae-wrapper part">
    <!-- 评论板块 -->
    <page-header></page-header>
    <div class="messgae-main">
      <comment
        @reloadComments="reloadComments"
        :comments="msg_wall"
        type="msg_wall"
      ></comment>
    </div>
  </div>
</template>

<script>
import PageHeader from "@/components/custom/PageHeader.vue";
import Comment from "@/components/detail/parts/Comment.vue";

export default {
  components: { Comment, PageHeader },
  props: {
    msg_wall: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    reloadComments() {
      this.$emit("reloadComments");
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.messgae-wrapper {
  width: 100%;
  box-sizing: border-box;
  padding: 0px;

  .messgae-main {
    margin: 0 auto;
    padding: 50px 0px;
    max-width: 500px;
  }
}
</style>
