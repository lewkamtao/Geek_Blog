import util from "@/util/index";
import {Debounce, Throttle} from "@/util/common.js";

export default function (opts) {
  let defaultOpts = {
    linkClass: 'cl-link',                             // 所有目录项都有的类
    linkActiveClass: 'cl-link-active',                // active的目录项
    datasetName: 'data-catalog-target',               // 目录项DOM的attribute存放对应目录的id
    selector: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],   // 按优先级排序
    activeHook: null,                                 // 激活时候回调
    delay: 200,                                       // 防抖的延迟时间
  }

  const Opt = Object.assign({}, defaultOpts, opts)

  // 内容获取区
  const $content = document.getElementById(Opt.contentEl)
  // 目录容器
  const $catalog = document.getElementById(Opt.catalogEl)

  let allCatalogs = $content.querySelectorAll(Opt.selector.join())
  let tree = getCatalogsTree(allCatalogs)

  // 隐藏目录
  if (tree.length === 0) {
    document.querySelector(".catalogue").style.setProperty("display", "none");
    return;
  }

  try {
    $catalog.innerHTML = `<div class='cl-wrapper'>${generateHtmlTree(tree, {id: -1})}</div>`
  } catch (e) {
    console.error('error in progress-catalog', e)
  }

  // 事件注册
  $catalog.addEventListener('click', clickHandler)
  window.addEventListener('scroll', Debounce(scrollHandler, Opt.delay))

  // 初始化选中目录
  scrollHandler()

  /**
   * 防抖：触发高频事件 n 秒后只会执行一次，如果 n 秒内事件再次触发，则会重新计时。
   * @param fn
   * @param delay
   * @returns {(function(*=): void)|*}
   */
  function debounce(fn, delay = 200) {
    return function (args) {
      const _this = this
      clearTimeout(fn.id)
      fn.id = setTimeout(function () {
        fn.apply(_this, args)
      }, delay)
    }
  }

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
    if (allCatalogs.length > 0 && allCatalogs[allCatalogs.length - 1].offsetTop + maskHeight + editBoxHeight <= number) {
      scrollToEl = allCatalogs[allCatalogs.length - 1]
    }
    if (scrollToEl) setActiveItem(scrollToEl.id)
    else setActiveItem(null)            // 无匹配的元素
  }

  /**
   * 点击事件
   */
  function clickHandler({target}) {
    let datasetId;
    datasetId = target.getAttribute(Opt.datasetName)
    if (datasetId == null) {
      datasetId = target.children[0].getAttribute(Opt.datasetName)
      let active = document.querySelector(".cl-link.cl-link-active");
      if (active !== null) {
        active.classList.remove("cl-link-active");
      }
      target.children[0].classList.add("cl-link-active")
    } else {
      let active = document.querySelector(".cl-link.cl-link-active");
      if (active !== null) {
        active.classList.remove("cl-link-active");
      }
      target.classList.add("cl-link-active")
    }

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
    let catalogs = [...$catalog.querySelectorAll(`[${Opt.datasetName}]`)]

    catalogs.forEach(catalog => {
      if (catalog.getAttribute(Opt.datasetName) === id) {
        typeof Opt.activeHook === 'function' && !catalog.classList.contains(Opt.linkActiveClass) && Opt.activeHook.call(this, catalog)
        catalog.classList.add(Opt.linkActiveClass)
      } else {
        catalog.classList.remove(Opt.linkActiveClass)
      }
    })
  }
}
