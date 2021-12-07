import Vue from 'vue'
import Highlight from "highlight.js";
import Clipboard from 'clipboard'

export const addCodeCopyBtn = () => {

  const content = document.getElementById('article-editor')
  const arr = Array.from(content.getElementsByTagName('pre'))

  arr.forEach((element, index) => {
    let lines = element.innerText.split('\n').length - 1
    // 添加有序列表
    let numbering = document.createElement("ol");
    numbering.setAttribute("class", "pre-numbering")
    element.appendChild(numbering)
    for (let i = 0; i <= lines; i++) {
      let li = document.createElement("li")
      numbering.appendChild(li)
    }

    // 添加复制按钮，此处使用的是element-ui icon 图标
    let copyBtn = document.createElement('i');
    copyBtn.setAttribute("title", "copy")
    copyBtn.setAttribute("class", "el-icon-document-copy code-copy")

    copyBtn.addEventListener('click', function (e) {
      // code标签
      const code = e.target.parentElement.children[0]
      const codeText = code.innerText
      copyContent('code-copy', codeText)
    })
    element.appendChild(copyBtn)
  });

  // 设置高亮
  let highlight = document.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    Highlight.highlightBlock(block);
  })
}

/**
 * className 是点击的元素的class，content是复制的内容
 * @param className
 * @param content
 */
export default function copyContent(className, content) {
  let clipboard = new Clipboard('.' + className, {
    text: function () {
      return content
    }
  })
  clipboard.on('success', e => {
    // 复制成功消息通知
    Vue.prototype.$notify({
      title: '成功',
      message: '复制成功, Ctrl+V 粘贴',
      type: 'success'
    });
    // 释放内存
    clipboard.destroy()
  })
  clipboard.on('error', e => {
    // 复制失败消息通知
    Vue.prototype.$notify({
      title: '失败',
      message: '复制失败,需手动复制文本内容',
      type: 'error'
    });
    clipboard.destroy()
  })
}
