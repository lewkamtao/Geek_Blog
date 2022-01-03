import util from "@/util/index";

export default function (opts) {
  let defaultOpts = {
    linkClass: 'cl-link',                             // 所有目录项都有的类
    linkActiveClass: 'cl-link-active',                // active的目录项
    datasetName: 'data-catalog-target',               // 目录项DOM的attribute存放对应目录的id
    selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],   // 按优先级排序
    activeHook: null                                  // 激活时候回调
  }

  const Opt = Object.assign({}, defaultOpts, opts)

  // 内容获取区
  const $content = document.getElementById(Opt.contentEl)
  // 目录容器
  const $catalog = document.getElementById(Opt.catalogEl)

  let allCatalogs = $content.querySelectorAll(Opt.selector.join())
  let tree = getCatalogsTree(allCatalogs)

  try {
    $catalog.innerHTML = `<div class='cl-wrapper'>${generateHtmlTree(tree, {id: -1})}</div>`
  } catch (e) {
    console.error('error in progress-catalog', e)
  }

  // 事件注册
  $catalog.addEventListener('click', clickHandler)
  window.addEventListener('scroll', scrollHandler)

  // 初始化选中目录
  scrollHandler()

  /**
   * 滚动事件
   */
  function scrollHandler() {
    let number = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
    let maskHeight = 0;
    let editBoxHeight = 0;
    if (document.querySelector(".article-wrapper .mask") !== null) {
      maskHeight = document.querySelector(".article-wrapper .mask").offsetHeight;
    }
    if (document.querySelector(".article-wrapper .edit-box") !== null) {
      editBoxHeight = document.querySelector(".article-wrapper .edit-box").offsetHeight;
    }
    let scrollToEl = null
    for (let i = 0; i < allCatalogs.length; i++) {
      if (allCatalogs[i].offsetTop + maskHeight + editBoxHeight >= number) {
        scrollToEl = allCatalogs[i]
        break
      }
    }
    if (allCatalogs[allCatalogs.length - 1].offsetTop + maskHeight + editBoxHeight <= number) {
      scrollToEl = allCatalogs[allCatalogs.length - 1]
    }
    if (scrollToEl) setActiveItem(scrollToEl.id)
    else setActiveItem(null)            // 无匹配的元素
  }

  /**
   * 点击事件
   */
  function clickHandler({target}) {
    const datasetId = target.getAttribute(Opt.datasetName)

    // let active = document.querySelector(".cl-link.cl-link-active");
    // if (active !== null) {
    //   active.classList.remove("cl-link-active");
    // }
    // target.classList.add("cl-link-active")

    let offsetTop = document.getElementById(datasetId).offsetTop;
    let topHeight = document.querySelector(".top-nav").offsetHeight - 70;
    let maskHeight = document.querySelector(".article-wrapper .mask").offsetHeight;
    let editBoxHeight = document.querySelector(".article-wrapper .edit-box").offsetHeight;
    util.scrollSmoothTo(offsetTop + topHeight + maskHeight + editBoxHeight);
  }

  /**
   * 获取目录树
   * @param catalogs
   */
  function getCatalogsTree(catalogs) {
    let title, tagName, tree = [], treeItem = {}, parentItem = {id: -1}, lastTreeItem = null, id

    for (let i = 0; i < catalogs.length; i++) {
      title = catalogs[i].innerText || catalogs[i].textContent
      tagName = catalogs[i].tagName
      id = 'heading-' + i
      catalogs[i].id = id
      treeItem = {
        name: title,
        tagName: tagName,
        id: id,
        level: +getLevel(tagName),
        parent: parentItem
      }
      if (lastTreeItem) {
        if (getLevel(treeItem.tagName) > getLevel(lastTreeItem.tagName)) {
          treeItem.parent = lastTreeItem
        } else {
          treeItem.parent = findParent(treeItem, lastTreeItem)
        }
      }
      lastTreeItem = treeItem
      tree.push(treeItem)
    }
    return tree
  }

  /**
   * 找到当前节点的父级
   * @param currTreeItem
   * @param lastTreeItem
   * @returns {*|Window}
   */
  function findParent(currTreeItem, lastTreeItem) {
    let lastTreeParent = lastTreeItem.parent
    while (lastTreeParent && (getLevel(currTreeItem.tagName) <= getLevel(lastTreeParent.tagName))) {
      lastTreeParent = lastTreeParent.parent
    }
    return lastTreeParent || {id: -1}
  }

  /**
   *  获取等级
   * @param tagName
   * @returns {*}
   */
  function getLevel(tagName) {
    return tagName ? tagName.slice(1) : 0
  }

  /**
   * 生成DOM树
   * @param tree
   * @param _parent
   * @return {string}
   */
  function generateHtmlTree(tree, _parent) {
    let ul, hasChild = false
    if (tree) {
      ul = `<ul>`
      for (let i = 0; i < tree.length; i++) {
        if (isEqual(tree[i].parent, _parent)) {
          hasChild = true
          ul += `<li><div class='${Opt.linkClass} cl-level-${tree[i].level}' ${Opt.datasetName}='${tree[i].id}'># ${tree[i].name}</div>`
          ul += generateHtmlTree(tree, tree[i])
          ul += '</li>'
        }
      }
      ul += `</ul>`
    }
    return hasChild ? ul : ''
  }

  /**
   * 判断是否是相同节点
   */
  function isEqual(node, node2) {
    return node && node2 && typeof node === 'object' && typeof node2 === 'object' && node.id === node2.id
  }

  /**
   *  设置选中的项
   */
  function setActiveItem(id) {
    let catas = [...$catalog.querySelectorAll(`[${Opt.datasetName}]`)]

    catas.forEach(T => {
      if (T.getAttribute(Opt.datasetName) === id) {
        typeof Opt.activeHook === 'function' &&
        !T.classList.contains(Opt.linkActiveClass) &&
        // 执行active钩子
        Opt.activeHook.call(this, T)
        T.classList.add(Opt.linkActiveClass)
      } else {
        T.classList.remove(Opt.linkActiveClass)
      }
    })
  }
}