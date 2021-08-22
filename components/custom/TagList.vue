<template>
  <div class="tag-list">
    <span
      class="ui mini label"
      v-for="(tag, index) in tags"
      :key="index"
      style="margin-right: 5px"
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
};
</script>

<style>
</style>
