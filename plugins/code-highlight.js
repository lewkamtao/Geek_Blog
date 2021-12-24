import Vue from "vue";
import JQ from "jquery";
// 代码高亮
import hljs from "highlight.js";
// 复制
import Clipboard from "clipboard";

Vue.directive("code-highlight", (el) => {
  const highlight = el.querySelectorAll("pre code");
  highlight.forEach((block) => {
    hljs.highlightBlock(block);
    // 显示行号
    block.innerHTML =
      "<ul><li>" +
      block.innerHTML.replace(/\n/g, "\n</li><li>") +
      "\n</li></ul>";
    /* 添加头 */
    let language = "bash";
    block.classList.forEach((className) => {
      if (className.indexOf("language-") !== -1)
        language = className.split("-")[1];
    });
    let pre_head = document.createElement("div");
    pre_head.classList.add("pre-head");
    pre_head.innerHTML =
      "<p><span class='code-language'>" +
      language.toUpperCase() +
      "</span><span class='copyBtn'><i class='copy icon'></i></span></p>";
    block.parentNode.insertBefore(pre_head, block);
  });
  // 复制操作
  el.querySelectorAll("pre").forEach((item) => {
    JQ(item)
      .find(".copy")
      .click((e) => {
        const codeText = JQ(item).find("code").text();
        copyContent("copy", codeText);
      });
  });
});

function copyContent(className, content) {
  let clipboard = new Clipboard("." + className, {
    text: function () {
      return content;
    },
  });
  clipboard.on("success", (e) => {
    // 复制成功消息通知
    Vue.prototype.$notify({
      title: "成功",
      message: "复制成功, Ctrl+V 粘贴",
      type: "success",
    });
    // 释放内存
    clipboard.destroy();
  });
  clipboard.on("error", (e) => {
    // 复制失败消息通知
    Vue.prototype.$notify({
      title: "失败",
      message: "复制失败,需手动复制文本内容",
      type: "error",
    });
    clipboard.destroy();
  });
}
