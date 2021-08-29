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
      <div class="ui positive message" :class="status">
        <i class="close icon"></i>
        <div class="header">真棒！当前配置有效。</div>
        <p>你可以随时修改这些信息</p>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>关于</label>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>时光机</label>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>音乐</label>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>朋友</label>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>留言板</label>
          </div>
        </div>
      </div>
      <div class="ui segment">
        <div class="field">
          <div class="ui toggle checkbox">
            <input type="checkbox" name="gift" tabindex="0" class="hidden" />
            <label>后台管理</label>
          </div>
        </div>
      </div>
      <div class="ui button blue" tabindex="0">保存配置</div>
    </form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
    };
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.part {
  padding: 50px;
}
</style>
