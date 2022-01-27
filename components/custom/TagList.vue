<template>
  <div class="tag-list">
    <span
      v-if="showJump === false"
      class="ui mini label"
      v-for="(tag, index) in tags"
      :key="index"
      style="margin-right: 5px"
      :class="tagsClass[index]"
    ># {{ tag.name }}</span>
    <nuxt-link
      v-if="showJump"
      :to="'ArticleByTag?tag_id=' + tag.id"
      v-for="(tag, index) in tags"
      :key="index"
    >
      <span
        class="ui mini label"
        style="margin-right: 5px"
        :class="tagsClass[index]"
      >{{ tag.name }}</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    showJump: {
      type: Boolean,
      default: false
    },
    tags: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      tagsClass: [],
    };
  },
  methods: {
    getTagColor() {
      if (this.tags && this.tags.length > 0) {
        this.tags.forEach((tag, index) => {
          var options = [
            "",
            "red",
            "orange",
            "yellow",
            "olive",
            "green",
            "teal",
            "blue",
            "violet",
            "brown",
          ];
          var i = Math.floor(Math.random() * options.length);
          this.tagsClass[index] = options[i];
        });
        this.$forceUpdate();
      }
    },
  },
  created() {
  },
  mounted() {
    // this.getTagColor();
  },
};
</script>

<style></style>
