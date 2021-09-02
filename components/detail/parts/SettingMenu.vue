<template>
  <div class="part">
    <ul>
      <a
        :href="'#' + item.id"
        v-for="(item, index) in setting_menu"
        :key="index"
      >
        {{ item.name }}
      </a>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      setting_menu: [
        {
          id: "setting_menu",
          name: "菜单配置",
        },
        {
          id: "setting_siteinfo",
          name: "站点配置",
        },
        {
          id: "setting_master",
          name: "个人信息",
        },
        {
          id: "image_set",
          name: "图片设置",
        },
        {
          id: "setting_contact",
          name: "社交媒体配置",
        },
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
  padding: 10px;
  width: 100%;
}
ul {
  display: flex;
  flex-direction: column;
  a {
    position: relative;
    width: 100%;
    background-image: none;
    border-radius: 7px;
    line-height: 28px;
    min-height: 36px;
    padding: 4px 15px;
    color: #999;
    display: inline-block;
    box-sizing: border-box;
    font-size: 14px;
    cursor: pointer;
    .label {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  a:hover {
    color: #000;
    background: rgba($color: #000, $alpha: 0.05);
  }
}
</style>
