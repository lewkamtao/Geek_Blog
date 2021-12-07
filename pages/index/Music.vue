<template>
  <Detail
    @reloadComments="getComments"
    @getSongs="getSongs"
    @playSong="playSong"
    :music="{
      music_list: music_list,
      songs: songs,
    }"
    :options="{
      type: 'music',
      comments: comments,
    }"
  />
</template>

<script>
// 这里是留言墙的id 注意要是文章的id 文章标题必须是：留言墙

export default {
  components: {},
  head() {
    return {
      title: "音乐 - " + this.geek_config.site_config.title,
    };
  },
  async asyncData({ $axios }) {
    const music_list = (
      await $axios.get("/api/music", {
        params: {
          limit: 10000,
        },
      })
    ).data;

    const songs = (
      await $axios.get(
        "/api/music?id=" + music_list.data[0].id + "&mode=list&cache=false"
      )
    ).data;

    const comments = (
      await $axios.get("/api/comments", {
        params: {
          mode: "type",
          type: "music",
          tree: false,
          limit: 10000,
        },
      })
    ).data;
    return { music_list, comments, songs };
  },
  props: {
    geek_config: {
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
    // 获取评论
    async getComments() {
      const comments = (
        await this.$axios.get("/api/comments", {
          params: {
            mode: "type",
            type: "music",
            tree: false,
            limit: 10000,
          },
        })
      ).data;
      this.comments = comments;
    },
    // 获取歌曲
    async getSongs(id) {
      const songs = (
        await this.$axios.get("/api/music?id=" + id + "&mode=list&cache=false")
      ).data;
      this.songs = songs;
    },
    playSong({ songs, index }) {
      this.$emit("playSong", { songs, index });
    },
  },
};
</script>
