<template>
  <form class="ui form">
    <h4 id="setting_contact" class="ui dividing header">联系方式板块</h4>

    <div class="fields">
      <div class="six wide field">
        <label>社交平台</label>
        <select class="ui fluid search dropdown" name="card[expire-month]">
          <option value="">Month</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>
      </div>

      <div class="six wide field">
        <label>地址</label>
        <input
          type="text"
          name="shipping[address]"
          placeholder="你的社交媒体链接"
        />
      </div>

      <div class="six wide field">
        <label>昵称</label>
        <input type="text" name="shipping[address]" placeholder="你的昵称" />
      </div>
    </div>
    <div class="ui button">
      <i style="margin-right: 0px" class="add icon"></i> 添加多一个
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