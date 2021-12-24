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
        imageClick: function () {
        }
      }
    }
  },
  created() {
  },
  mounted() {
  }
};
</script>

<style lang="scss">
.content .v-note-wrapper {
  min-width: unset !important;
}

.content .v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  padding: 0 25px 0 0 !important;
}

.content .markdown-body p {
  margin-bottom: 0 !important;
}

.content .markdown-body pre {
  margin-bottom: 0 !important;
}

.content .markdown-body img {
  max-width: 50% !important;
}

.markdown-body a:hover {
  text-decoration: underline !important;
  color: #ff5722 !important;
}
</style>




