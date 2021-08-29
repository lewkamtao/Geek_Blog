<template>
  <div class="part pages">
    <div class="main-title">评论排行榜</div>
    <div class="list">
      <ul>
        <a
          v-for="(item, index) in commentsGroup.data"
          :key="index"
          :href="item.expand.url"
          target="_blank"
          class="user-item"
        >
          <div class="avatar border border-primary">
            <img :src="item.expand.head_img" />
          </div>
          <div class="user-info">
            <div class="name">
              {{ item.nickname }}
              <span style="margin-left: 10px" class="ui mini label">{{
                item.count
              }}</span>
            </div>
            <p class="agent">{{ getUA(item.expand.agent) }}</p>
          </div>
        </a>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    commentsGroup: {
      type: Object,
      default: [],
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {
    getUA() {
      return function (agent) {
        return (
          "来自 " +
          (agent.os.system +
            " " +
            agent.os.version +
            " " +
            agent.browser.kernel)
        );
      };
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.pages {
  width: 100%;
}

.list {
  width: 100%;
  line-height: 35px;
}
.text-secondary {
  background-image: none !important;
}

.user-item {
  display: flex;
  background-image: none;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 7px;

  .avatar {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40px;
      height: auto;
      border-radius: 5px;
    }
  }
  .user-info {
    width: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .name {
      font-weight: bold;
      color: #5f6984;
      font-size: 14px;
      display: flex;
      align-items: center;
      line-height: 16px;
      .label {
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0px 8px;
        font-weight: bold;
      }
    }
    .agent {
      font-size: 13px;
      line-height: 16px;
      white-space: nowrap;
      margin-top: 5px;
      color: #999;
    }
  }
}
.user-item:first-child {
  .user-info {
    .name {
      .label {
        background: #f05050;
        color: #fff;
      }
    }
  }
}
.user-item:nth-child(2) {
  .user-info {
    .name {
      .label {
        background: #f94;
        color: #fff;
      }
    }
  }
}
.user-item:nth-child(3) {
  .user-info {
    .name {
      .label {
        background: #5f6984;
        color: #fff;
      }
    }
  }
}
.user-item:hover {
  background: rgba($color: #000000, $alpha: 0.05);
}
</style>
