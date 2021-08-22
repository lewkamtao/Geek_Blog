<template>
  <div class="messgae-wrapper">
    <!-- 评论板块 -->
    <comment
      @reloadComments="reloadComments"
      :comments="msg_wall"
      type="msg_wall"
    ></comment>
  </div>
</template>

<script>
import Comment from "@/components/detail/parts/Comment.vue";

export default {
  components: { Comment },
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
}


</style>
