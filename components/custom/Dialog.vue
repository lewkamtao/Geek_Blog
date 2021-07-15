<template>
  <div>
    <transition name="fade">
      <div v-if="visible" class="dialog">
        <slot class="dialog-box"> </slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      default: false
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background: rgba($color: #000000, $alpha: 0.5);
  z-index: 999;
}


</style>