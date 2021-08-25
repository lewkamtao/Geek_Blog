<template>
  <div style="margin-bottom: 8px" class="info part">
    <div class="main-title" style="margin-bottom: 12px">动态</div>
    <div class="comments-box" v-for="(item, index) in newComments.data" :key="index">
      <comment-card type="lately" :comment="item"></comment-card>
    </div>
  </div>
</template>

<script>
import CommentCard from "./CommentCard.vue";

export default {
  components: {
    CommentCard
  },
  props: {
    newComments: {
      type: Object,
      default: {}
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
