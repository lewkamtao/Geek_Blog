<template>
  <div style="margin-bottom: 8px" class="concact-wrapper part">
    <div class="main-title" style="margin-bottom: 18px">社交媒体</div>
    <div v-if="concact_array.length != 0">
      <a
        :href="checkStr(item.value, 'URL') ? item.value : '#'"
        v-for="(item, index) in concact_array"
        :key="index"
        :target="checkStr(item.value, 'URL') ? '_blank' : ''"
        class="item"
        ref="concactItem"
        @mouseenter="addHover(index)"
        @mouseleave="removeHover(index)"
      >
        <svg class="icon icon-play" aria-hidden="true">
          <use :xlink:href="'#icon-' + item.key" />
        </svg>
        <div class="concact-value">{{ item.nickname || item.value }}</div>
      </a>
    </div>
    <div v-if="concact_array.length == 0">未设置</div>
  </div>
</template>
<script>
import checkStr from "@/util/checkStr";

export default {
  props: {
    geek_config: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      concact_array: [],
    };
  },
  created() {
    this.concact_array = this.geek_config.master_info.concact_array;
    this.formatConcactUrl();
  },
  methods: {
    checkStr,
    addHover(index) {
      this.$refs.concactItem[index].classList.add("isHover");
      if (index != 0) {
        this.$refs.concactItem[index - 1].classList.add("isHoverPrve");
      }
      if (index != this.concact_array.length - 1) {
        this.$refs.concactItem[index + 1].classList.add("isHoverNext");
      }
    },
    removeHover(index) {
      this.$refs.concactItem[index].classList.remove("isHover");
      if (index != 0) {
        this.$refs.concactItem[index - 1].classList.remove("isHoverPrve");
      }
      if (index != this.concact_array.length - 1) {
        this.$refs.concactItem[index + 1].classList.remove("isHoverNext");
      }
    },
    formatConcactUrl() {
      this.concact_array.forEach((concact_array) => {
        if (checkStr(concact_array.value, "URL")) {
          concact_array.nickname = this.getQueryVariable(
            concact_array.value,
            "nickname"
          );
        }
      });
    },
    // 获取url参数
    getQueryVariable(url, variable) {
      var query = url.split("?")[1];
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    },
  },
};
</script>
<style lang="scss" scoped>
.concact-wrapper {
  a {
    background-image: none;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 8px 0px;
    transition: all 0.15s;
    .concact-value {
      width: calc(100% - 80px);
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      color: #999;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: all 0.15s;
    }
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      font-size: 30px;
      background: #fff;
      border-radius: 50% !important;
      box-shadow: 0px 0px 5px rgba($color: #000000, $alpha: 0.1);
      border: 1px rgba($color: #000000, $alpha: 0.1) solid;
      overflow: hidden;
      margin-right: 10px;
      transition: all 0.15s;
    }
  }
  .isHover {
    transform: translateX(18px);
    .concact-value {
      color: #000;
      margin-left: 14px;
    }
    .icon {
      transform: scale(1.3);
    }
  }
  .isHoverPrve {
    transform: translateX(6px);
    .concact-value {
      color: #666;
      margin-left: 7px;
    }
    .icon {
      transform: scale(1.1);
    }
  }
  .isHoverNext {
    transform: translateX(6px);
    .concact-value {
      color: #666;
      margin-left: 7px;
    }
    .icon {
      transform: scale(1.1);
    }
  }
}
</style>

