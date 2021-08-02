<template>
  <div class="setting part">
    <div class="form">
      <div class="title">通用设置</div>
      <div class="subTitle">页面设置</div>
      <div class="form-group">
        <label for="back_site_url">博客标题</label>
        <input type="text" placeholder="是一尘不染的猫" id="back_site_url" />
      </div>
      <div class="form-group">
        <label for="back_site_url">关键字（SEO）</label>
        <input
          type="text"
          placeholder="Geek,博客,个人博客"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">简介</label>
        <input
          type="text"
          placeholder="https://api.kamtao.com/"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">备案信息 (支持html)</label>
        <input type="text" placeholder="粤ICP备18056223号" id="back_site_url" />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点 favicon 图标</label>
        <input
          type="text"
          placeholder="https://tngeek.com/favicon.ico"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点用户头像</label>
        <input
          type="text"
          placeholder="https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="back_site_url">站点地址</label>
        <input
          type="text"
          placeholder="https://api.kamtao.com/"
          id="back_site_url"
        />
      </div>
      <div class="form-group">
        <label for="footer">页面脚部 (支持html)</label>
        <textarea
          id="footer"
          placeholder="Powered by inis | 本站自豪使用了全世界最好的Vue框架 <br> Copyright (c) 2021-present, Kamtao (To) Lew"
        ></textarea>
      </div>
      <div class="subTitle">模块显示设置</div>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 博客信息 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 联系方式 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <div class="subTitle">菜单显示设置</div>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 关于我 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 时光机 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 相册 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 友情链接 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>

      <fieldset class="form-group">
        <label for="Switch1" class="paper-switch-label"> 留言墙 </label>
        <label class="paper-switch">
          <input id="Switch1" name="Switch1" type="checkbox" checked />
          <span class="paper-switch-slider"></span>
        </label>
      </fieldset>
      <div class="subTitle">联系方式</div>

      <div class="contact">
        <div class="left">
          <div class="form-group">
            <label for="paperSelects1">平台</label>
            <select id="paperSelects1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
        <div class="right">
          <div class="form-group">
            <label for="paperInputs3">联系方式 / 地址</label>
            <input class="input-block" type="text" id="paperInputs3" />
          </div>
        </div>
      </div>
      <div class="contact">
        <div class="left">
          <div class="form-group">
            <label for="paperSelects1">平台</label>
            <select id="paperSelects1">
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
        <div class="right">
          <div class="form-group">
            <label for="paperInputs3">联系方式 / 地址</label>
            <input class="input-block" type="text" id="paperInputs3" />
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
  max-width: 600px;
  min-width: 500px;
  margin: 0 auto;
  padding: 60px 0px;
  .title {
    font-weight: bold;
    font-size: 28px;
    color: #000;
    padding-bottom: 20px;
  }
  .subTitle {
    font-size: 18px;
    margin-top: 50px;
    padding: 40px 0px;
    font-weight: bold;
    color: #000;
    border-top: 1px #999 solid;
  }
  .form-group {
    margin-bottom: 20px;
    label {
      font-size: 14px;
      margin: 10px 20px 10px 0px;
    }
    .paper-switch {
      width: 60px;
    }
    .paper-switch-label {
      width: 80px;
    }
    input {
      padding: 10px;
      width: 100%;
      font-size: 14px;
    }
    textarea {
      height: 120px;
      width: 100%;
      padding: 20px 10px;
      font-size: 14px;
    }
  }
  .contact {
    display: flex;
    margin-bottom: 0px;
    .left {
      margin-right: 20px;
      select {
        font-size: 14px;
        width: 150px;
        height: 40px;
      }
    }
    .right {
      width: calc(100% - 170px);
    }
  }
}
</style>