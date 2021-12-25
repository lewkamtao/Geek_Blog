<template>
  <div>
    <transition name="fade">
      <div v-if="visible" class="dialog">
        <slot class="dialog-box"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
  created() {
  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba($color: #000, $alpha: 0.5);
  backdrop-filter: blur(10px);
  z-index: 999;
}

.close-btn {
  position: fixed;
  right: 50px;
  top: 30px;
  font-size: 22px;
  color: #000;
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
