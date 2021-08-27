<template>
  <form class="ui form">
    <h4 id="setting_menu" class="ui dividing header">菜单</h4>

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
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.form {
  margin-bottom: 50px;
  .header {
    padding-top: 80px;
  }
}
</style>