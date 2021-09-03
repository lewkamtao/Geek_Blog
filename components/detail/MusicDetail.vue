<template>
  <div class="part">
    <h2 class="ui header">
      <v-img
        style="border-radius: 8px"
        width="120px"
        height="120px"
        :url="songs.info.head_img"
        nullUrl="https://api.kamtao.com/storage/users/anime/1.jpg?&1630570087077"
      ></v-img>
      <div class="content">
        {{ songs.info.title }}
        <div class="sub header">
          {{ songs.info.description || "这个歌单的介绍空空如也~" }}
        </div>
      </div>
    </h2>
    <table style="margin-top: 30px" class="ui red table">
      <thead>
        <tr>
          <th></th>
          <th>头图</th>
          <th>音乐标题</th>
          <th>歌手</th>
        </tr>
      </thead>
      <tbody>
        <tr
          @click="play({ songs: songs.songs, index: index })"
          v-for="(item, index) in songs.songs"
          :key="index"
        >
          <td class="center aligned">
            {{ index + 1 }}
          </td>
          <td>
            <v-img
              style="border-radius: 50%"
              width="35px"
              height="35px"
              :url="item.cover"
              nullUrl="https://api.kamtao.com/storage/users/anime/1.jpg?&1630570087077"
            ></v-img>
          </td>
          <td>{{ item.name }}</td>
          <td>{{ item.author }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PageHeader from "@/components/custom/PageHeader.vue";

export default {
  components: { PageHeader },
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
    songs: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {};
  },

  watch: {},
  computed: {},
  methods: {
    play({ songs, index }) {
      this.$emit("playSong", { songs, index });
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 30px;
}
td {
  cursor: pointer;
}
tr:hover td {
  background: #eee;
}
</style>
