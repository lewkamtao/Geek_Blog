<template>
  <div class="part">
    <div class="ui middle aligned selection list">
      <div
        v-for="(item, index) in music_list.data"
        :key="index"
        class="item"
        @click="getSongs(item.id)"
      >
        <v-img
          width="40px"
          height="40px"
          class="ui avatar image"
          :url="item.head_img"
          :nullUrl="'https://api.kamtao.com/storage/users/anime/1.jpg'"
        ></v-img>
        <div class="content">
          <div class="header">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    music_list: {
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
    getSongs(id) {
      this.$emit("getSongs", id);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 10px;
  width: 100%;
}
</style>
