<template>
  <div class="part">
    <div class="ui grid">
      <div class="ten wide column">
        <form class="ui form">
          <h4 class="ui dividing header">个人信息</h4>
          <div class="ui positive message" :class="status">
            <i class="close icon"></i>
            <div class="header">真棒！当前配置有效。</div>
            <p>你可以随时修改这些信息</p>
          </div>
          <div class="field">
            <label>昵称</label>
            <input type="text" placeholder="中间名" />
          </div>

          <div class="field">
            <label>简介</label>
            <textarea rows="2"></textarea>
          </div>
          <div class="two fields">
            <div class="field">
              <label>手机号</label>
              <input
                type="text"
                name="shipping[first-name]"
                placeholder="First Name"
              />
            </div>
            <div class="field">
              <label>邮箱</label>
              <input
                type="text"
                name="shipping[last-name]"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div class="field">
            <label>头像链接</label>
            <input type="text" placeholder="中间名" />
          </div>
          <div class="ui button blue" tabindex="0">保存配置</div>
        </form>
      </div>
      <div class="six wide column">
        <div class="ui link cards">
          <div class="card">
            <div class="image">
              <img src="/images/avatar2/large/matthew.png" />
            </div>
            <div class="content">
              <div class="header">Matt Giampietro</div>
              <div class="meta">
                <a>好友</a>
              </div>
              <div class="description">
                Matthew is an interior designer living in New York.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { status: "" };
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
