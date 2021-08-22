<template>
  <div>
    <div class="mode-setting part">
      <div @click="mode.isDark = !mode.isDark" class="mode-setting-box">
        <span> {{ mode.isDark ? "暗黑模式" : "白天模式" }}</span>
        <div class="inline field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              v-model="mode.isDark"
              tabindex="0"
              id="mode1"
              class="hidden"
            />
            <label></label>
          </div>
        </div>
      </div>
      <div @click="mode.isSharp = !mode.isSharp" class="mode-setting-box">
        <span>{{ mode.isSharp ? "锐利模式" : "圆滑模式" }}</span>
        <div class="inline field">
          <div class="ui toggle checkbox">
            <input
              type="checkbox"
              v-model="mode.isSharp"
              tabindex="0"
              id="mode2"
              class="hidden"
            />
            <label></label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/util/index";

export default {
  components: {},
  props: {},
  data() {
    return {
      mode: {
        isDark: false,
        isSharp: false,
      },
    };
  },
  watch: {
    "mode.isDark": function (status) {
      this.$cookies.set("mode", this.mode);
      util.darkHandle(status);
    },
    "mode.isSharp": function (status) {
      this.$cookies.set("mode", this.mode);
      util.sharpHandle(status);
    },
  },
  computed: {},
  methods: {},
  created() {
    var mode = this.$cookies.get("mode");
    if (!!mode) {
      this.mode = mode;
      if (mode.isDark) {
        util.darkHandle(mode.sharp);
      }
      if (mode.isSharp) {
        util.sharpHandle(mode.sharp);
      }
    }
  },
  mounted() {},
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
    color: #999;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .field {
      display: flex;
      align-items: center;
      margin-right: -15px;
    }
  }
  .mode-setting-box:hover {
    color: #000;
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
}
</style>
