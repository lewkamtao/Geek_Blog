<template>
  <no-ssr>
    <mavon-editor
      v-model="content"
      :ishljs="true"
      :subfield="false"
      :defaultOpen="prop.defaultOpen"
      :toolbarsFlag="prop.toolbarsFlag"
      :editable="prop.editable"
      :scrollStyle="prop.scrollStyle"
      :boxShadow="prop.boxShadow"
      :previewBackground="prop.previewBackground"
      :boxShadowStyle="prop.boxShadowStyle"
      :imageClick="prop.imageClick"
    />
  </no-ssr>
</template>

<script>
import "highlight.js/styles/googlecode.css";

export default {
  components: {},
  props: {
    content: {
      type: String,
      default: function () {
        return "";
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    prop() {
      return {
        subfield: false,
        defaultOpen: 'preview',
        editable: false,
        toolbarsFlag: false,
        scrollStyle: true,
        boxShadow: true,
        previewBackground: 'unset',
        boxShadowStyle: 'unset',
        imageClick: function (){}
      }
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped></style>




