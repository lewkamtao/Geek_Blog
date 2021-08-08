<template>
  <div>
    <div class="mode-setting part">
      <fieldset class="form-group mode-setting-box">
        <label for="mode" class="paper-switch-label">{{ mode ? "暗黑模式" : "白天模式" }}</label>
        <label class="paper-switch-2">
          <input id="paperSwitch4" name="mode" v-model="mode" type="checkbox" />
          <span class="paper-switch-slider round"></span>
        </label>
      </fieldset>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { mode: false };
  },
  watch: {
    mode: function(val) {
      if (val) {
        document.getElementsByTagName("html")[0].className = "geek-dark";
      } else {
        document.documentElement.removeAttribute("class");
      }
    }
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.mode-setting {
  padding: 8px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  flex-direction: column;
  .mode-setting-box {
    position: relative;
    padding: 8px 8px 8px 15px;
    width: 100%;
    margin-bottom: 0px;
    display: flex;
    border-radius: 8px;
    align-items: center;
    justify-content: space-between;
  }
  .mode-setting-box:hover {
    background: rgba($color: #000000, $alpha: 0.05);
  }
  .mode-setting-box:hover::before {
    display: none;
  }
  .mode-setting-box:hover + .mode-setting-box::before {
    display: none;
  }
  .mode-setting-box::before {
    position: absolute;
    left: 0px;
    top: 0px;
    content: "";
    width: 100%;
    height: 1px;
    background: rgba($color: #000000, $alpha: 0.05);
  }
  .mode-setting-box:first-child::before {
    display: none;
  }

  .paper-switch-label {
    margin-top: 0px;
  }
  .paper-switch {
    margin-top: 3px;
  }
}
</style>