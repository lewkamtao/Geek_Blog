import Vue from "vue";
// 代码高亮
import hljs from "highlight.js";
// 复制
import Clipboard from "clipboard";

Vue.directive("code-highlight", (el) => {
  const highlight = el.querySelectorAll("pre code");
  highlight.forEach((block) => {
    hljs.highlightBlock(block);
    var copyDom = document.createElement("div");
    copyDom.className = "copy-btn";
    copyDom.innerHTML = "Copy";
    copyDom.setAttribute("data-clipboard-text", block.innerText );
    copyDom.onclick = function () {
      copyContent();
      copyDom.innerHTML = "Copy success!";
    };
    block.parentNode.appendChild(copyDom);
  });
});

function copyContent() {
  var clipboard = new Clipboard(".copy-btn");

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
