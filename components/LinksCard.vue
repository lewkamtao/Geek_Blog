<template>
  <div class="part pages" style="margin-bottom: 30px">
    <div class="main-title">友情链接</div>
    <div class="list">
      <ul>
        <div v-for="(item, index) in links" :key="index">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16px"
            height="16px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-link"
          >
            <path
              d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            ></path>
            <path
              d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            ></path>
          </svg>
          <a :href="item.url" target="_blank">{{ item.name }}</a>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    links: {
      type: Array,
      default: [],
    },
  },
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
.pages {
  width: 100%;
}

.list {
  line-height: 35px;
  padding-left:10px;
}
.text-secondary {
  background-image: none !important;
}
</style>