<template>
  <div class="info part">
    <div class="main-title" style="margin-bottom: 12px">动态</div>

    <comment-card
      v-for="(item, index) in newComments.data"
      :key="index"
      type="lately"
      :masterId="masterId"
      :comment="item"
      class="comment-card"
    ></comment-card>
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
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      masterId: 1
    };
  },
  methods: {
    async getMasterId() {
      this.masterId = (
        await this.$axios.get("/options?key=webmaster")
      ).data.opt.users_id;
    }
  },
  mounted() {
    this.getMasterId();
  }
};
</script>

<style lang="scss" scoped>
.comment-card:last-child {
  margin-bottom: 0px !important;
}
</style>
