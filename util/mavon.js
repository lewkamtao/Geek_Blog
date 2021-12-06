import JQ from 'jquery'
import Vue from 'vue'
import hljs from "highlight.js";

export const addCodeCopyBtn = () => {

  let blocks = document.querySelectorAll("pre");
  blocks.forEach(block => {
    let lines = block.innerText.split('\n').length - 1
    // 添加有序列表
    let numbering = document.createElement("ol");
    numbering.setAttribute("class", "pre-numbering")

    // 添加复制按钮，此处使用的是element-ui icon 图标
    let copy = document.createElement('i');
    copy.setAttribute("title", "copy")
    copy.setAttribute("class", "el-icon-document-copy code-copy")

    block.setAttribute("class", "code")
    block.appendChild(numbering)
    block.appendChild(copy)

    for (let i = 0; i <= lines; i++) {
      let li = document.createElement("li")
      numbering.appendChild(li)
    }
  })

  // 设置代码块高亮
  blocks.forEach(block => {
    hljs.highlightBlock(block);
  });

  // 监听复制按钮点击事件
  JQ('pre.code i.code-copy').click(e => {
    let text = JQ(e.target).siblings('code').text()
    let element = JQ('<textarea>' + text + '</textarea>')
    JQ('body').append(element)
    element[0].select()
    document.execCommand('Copy')
    element.remove()
    // 复制成功消息通知
    Vue.prototype.$notify({
      title: '成功',
      message: '代码复制成功',
      type: 'success'
    });
  })

}

