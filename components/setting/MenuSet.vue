<template>
  <div class="part">
    <h1 style="margin-bottom: 30px" id="setting_menu">设置</h1>
    <div class="ui message">
      <div class="header">
        <font style="vertical-align: inherit"
          ><font style="vertical-align: inherit"> 新网站功能 </font></font
        >
      </div>
      <ul class="list">
        <li v-for="(item, index) in news" :key="index">
          <font style="vertical-align: inherit"
            ><font style="vertical-align: inherit">{{ item.info }}</font></font
          >
        </li>
      </ul>
    </div>
    <form class="ui form">
      <h4 class="ui dividing header">菜单配置</h4>

      <div
        class="ui segment"
        v-for="(menu, index) in form.menu_config"
        :key="'menu' + index"
        @click="change(index)"
      >
        <div class="field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              v-model="menu.isShow"
              name="gift"
              tabindex="0"
              class="hidden"
            />
            <label>{{ menu.title }}</label>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    menu_config: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      tips: {
        type: "",
      },
      news: [
        {
          info: "您现在可以在博客页面上使用封面图片",
        },
        { info: "你也可以自定义站点信息、个人信息。" },
        { info: "还可以添加你的社交媒体的信息" },
      ],
      form: {
        menu_config: [
          {
            value: "about",
            title: "关于",
            isShow: false,
          },
          {
            value: "photo",
            title: "图库",
            isShow: false,
          },
          {
            value: "time_line",
            title: "时光机",
            isShow: false,
          },
          {
            value: "music",
            title: "音乐",
            isShow: false
          },
          {
            value: "links",
            title: "友链",
            isShow: false,
          },
          {
            value: "msg_wall",
            title: "留言墙",
            isShow: false,
          },
          {
            value: "adm",
            title: "后台",
            isShow: false,
          },
        ],
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    change(index) {
      this.form.menu_config[index].isShow =
        !this.form.menu_config[index].isShow;
      var data = {
        "login-token": this.$cookies.get("token"),
        keys: "geek_config",
        opt: this.form,
      };

      this.$axios.post("/api/options/save", data).then((res) => {
        if (res.code == 200) {
          this.$notify({
            type: "success",
            title: "恭喜！",
            message: "配置成功，刷新页面之后立即生效。",
            duration: 5000,
            offset: 65,
          });
        }
      });
    },
  },
  created() {
    var config = this.menu_config.filter((e) => e.value != "music");
    this.form.menu_config = config;
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
@media screen and (max-width: 1025px) {
  .part .field {
    margin-bottom: 0px !important;
  }
}
</style>
