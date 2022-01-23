<template>
  <div class="tag-list">
    <span
      class="ui mini label"
      v-for="(tag, index) in tags"
      :key="index"
      style="margin-right: 5px"
      :class="tagsClass[index]"
      >{{ tag.name }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
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
  created() {},
  mounted() {
    // this.getTagColor();
  },
};
</script>

<style></style>
