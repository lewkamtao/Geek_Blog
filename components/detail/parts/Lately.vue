<template>
  <div style="margin-bottom: 14px" class="info part">
    <div class="main-title" style="margin-bottom: 12px">最新动态</div>
    <div
      class="comments-box"
      v-for="(item, index) in newComments.data"
      :key="index"
    >
      <comment-card type="new" :comment="item"></comment-card>
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
  components: {
    CommentCard,
  },
  props: {
    newComments: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
