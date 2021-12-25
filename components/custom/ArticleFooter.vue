<template>
  <div class="article-footer">
    <!--分割线-->
    <div class="ui horizontal divider">
      <span class="end">END</span>
    </div>
    <!--赞赏-->
    <div class="appreciation">
      <div @click="visible = true" class="appreciation-box">
        <svg
          fill="none"
          style="width: 18px; margin-right: 5px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          aria-hidden="true"
        >
          <path
            d="M10.084 7.606c3.375-1.65 7.65-1.154 10.493 1.487 3.497 3.25 3.497 8.519 0 11.77-3.498 3.25-9.167 3.25-12.665 0-.897-.834-2.488-2.96-2.488-5.085"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M17.392 14.78s1.532-1.318-.053-2.79c-1.585-1.473-3.17-.404-3.719.403-.549.807.495 2.082.93 2.69.434.61 1.364 2.182-.054 3.202-1.417 1.012-3.002.658-4.153-.708-1.15-1.367-.602-3.365 0-3.924M17.338 11.982l1.159-1.076M9.87 18.922l.937-.871"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M.8 1.205s7.15 4.673 8.773 6.182c1.623 1.508 3.231 4.008 1.616 5.509-2.195 2.04-4.054.595-6.737-.75-.884-.447-3.15-1.777-3.15-1.777M10.136.9l1.047 3.188"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg
        >
        赞 赏
      </div>
      <p>如果觉得我的文章对你有用，请随意赞赏</p>
    </div>
    <!--许可协议及分享文章-->
    <div class="license-share">
      <section id="license">
        <div class="header"><span>许可协议</span></div>
        <div class="body">
          <p>
            <span>本文采用</span>
            <a
              target="_blank"
              rel="external nofollow noopener noreferrer"
              href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            >署名-非商业性使用-相同方式共享 4.0 国际</a
            >
            <span>许可协议，转载请注明出处。</span>
          </p>
        </div>
      </section>
      <section id="share">
        <div class="header"><span>分享文章</span></div>
        <div class="body">
          <div class="link">
            <input
              class="copy-area"
              readonly="true"
              id="copy-link"
              :value="articleUrl"
            />
          </div>
          <div class="social-wrap dis-select">
            <a class="social share-item wechat" @click="toggle('qrcode-wechat')"
            ><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/b32ef3da1162a.svg"
              alt=""
            /></a>
            <a
              class="social share-item weibo"
              target="_blank"
              rel="external nofollow noopener noreferrer"
              :href="
                'https://service.weibo.com/share/share.php?url=' +
                articleUrl +
                '&amp;title=' +
                article.title +
                '&amp;summary=' +
                article.description
              "
            ><img
              class="lazy entered loaded"
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/80c07e4dbb303.svg"
              alt=""
            /></a>
            <a
              class="social share-item email"
              :href="
                'mailto:?subject=' + article.title + '&amp;body=' + articleUrl
              "
            ><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/a1b00e20f425d.svg"
              alt=""
            /></a>
            <a class="social share-item link" @click="copy('copy-link')"
            ><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/8411ed322ced6.svg"
            /></a>
          </div>
          <div
            class="qrcode"
            id="qrcode-wechat"
            style="visibility: hidden; height: 0"
          >
            <img
              :src="
                'https://api.qrserver.com/v1/create-qr-code/?size=256x256&amp;data=' +
                articleUrl
              "
              alt=""
            />
          </div>
        </div>
      </section>
    </div>
    <!--打赏弹窗-->
    <Dialog :visible="visible">
      <div class="modal-content">
        <div class="modal-body">
          <div class="modal-header">
            <svg @click="visible = false" t="1640426247102" class="close icon" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="4600" width="24" height="24">
              <path
                d="M504.224 470.288l207.84-207.84a16 16 0 0 1 22.608 0l11.328 11.328a16 16 0 0 1 0 22.624l-207.84 207.824 207.84 207.84a16 16 0 0 1 0 22.608l-11.328 11.328a16 16 0 0 1-22.624 0l-207.824-207.84-207.84 207.84a16 16 0 0 1-22.608 0l-11.328-11.328a16 16 0 0 1 0-22.624l207.84-207.824-207.84-207.84a16 16 0 0 1 0-22.608l11.328-11.328a16 16 0 0 1 22.624 0l207.824 207.84z"
                p-id="4601" fill="#ffffff"></path>
            </svg>
            <div class="make"></div>
            <div class="text-center">
              <svg t="1640422110790" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3508" width="32" height="32">
                <path
                  d="M875.934 339.767c-24.267-23.267-43.667-41.9-67.934-60.5 29.101-23.267 48.5-60.534 48.5-97.733 0-74.5-72.767-135-164.967-135-19.399 0-38.8 4.667-58.233 9.3-4.866 0-4.866 0-4.866 4.667C623.6 51.2 613.9 46.534 604.2 37.233 575.066 13.934 545.967 4.634 512 0c-33.967 4.634-63.1 13.934-87.333 37.233C410.1 46.534 405.233 51.2 395.533 60.5H390.7c-19.434-9.3-38.834-13.966-58.233-13.966-92.2 0-165 60.5-165 135 0 37.2 19.434 69.8 48.533 97.733-24.267 18.6-43.667 32.567-67.934 60.5-87.333 83.8-131 176.867-131 269.966C17.066 861.067 211.167 1024 512 1024c295.967 0 494.934-162.933 494.934-414.267 0-93.099-43.667-186.166-131-269.966z m-359.067 637.7H512c-213.5 0-441.566-97.767-441.566-367.733 0-83.767 38.833-162.899 116.467-237.366 29.1-27.934 48.533-41.9 72.767-60.533-4.834-4.634 9.733-13.967 9.733-13.967 9.699-4.634 14.533-13.934 14.533-18.6S279.1 260.634 269.4 256c-33.967-13.966-53.4-41.899-53.4-74.466 0-46.567 53.4-88.467 116.467-88.467 14.533 0 29.1 0 38.8 9.333 4.867 0 9.733 4.633 14.566 4.633 14.567 4.667 29.134 0 38.834-9.3 4.833-4.667 9.699-13.967 24.233-23.267 24.267-18.633 43.7-27.932 63.1-27.932 24.267 0 43.667 9.3 63.066 27.933 14.567 9.3 19.434 18.6 24.267 23.267 9.7 9.3 24.267 13.966 43.667 9.3 4.867 0 4.867-4.633 14.566-4.633 4.867-4.667 19.4-9.333 33.967-9.333 63.067 0 116.467 41.9 116.467 88.467 0 32.567-19.434 55.833-53.399 74.466-9.7 4.634-14.534 9.3-14.534 18.601 0 9.333 4.834 18.633 9.7 18.633 4.834 0 4.834 4.634 9.7 9.3 33.967 23.267 58.233 46.567 82.5 69.833 77.634 74.467 116.434 153.6 116.434 237.366C958.4 879.7 730.367 977.467 516.867 977.467z m95.3-363c10.767 0.1 19.366-6.9 19.233-15.667-0.134-8.733-8.934-15.9-19.7-16l-91.752-1.057a14.599 14.599 0 0 0-6.481-1.409c-2.049 0.023-4.006 0.48-5.811 1.268l-95.522-1.102c-10.733-0.1-19.367 6.9-19.233 15.634 0.133 8.767 8.966 15.933 19.699 16.033l84.692 0.976-0.795 70.729-84.362-0.972c-10.733-0.1-19.367 6.9-19.233 15.633 0.133 8.767 8.966 15.933 19.699 16.033l83.541 0.963-0.973 86.504c-0.101 9.433 6.899 16.966 15.633 16.833 8.767-0.1 15.934-7.833 16.033-17.233l0.965-85.739 84.369 0.973c10.767 0.1 19.366-6.9 19.233-15.667-0.134-8.733-8.934-15.9-19.7-16l-83.546-0.963 0.796-70.729 83.215 0.959z m26.6-200.533L512 540.7 385.233 413.934c-6.267-6.267-16.434-6.267-22.7 0s-6.267 16.434 0 22.733l136.132 136.132a16.165 16.165 0 0 0 1.802 2.168A15.996 15.996 0 0 0 512 579.658a15.998 15.998 0 0 0 11.533-4.691 16.165 16.165 0 0 0 1.802-2.168l136.132-136.132c6.267-6.3 6.267-16.467 0-22.733s-16.434-6.267-22.7 0z"
                  fill="#ffffff" p-id="3509"></path>
              </svg>
              <div class="text">不喜欢喝咖啡，来杯奶茶吧</div>
            </div>
          </div>
          <ul class="flex text-center rewards-box">
            <li>
              <p class="text-color">微信扫一扫</p>
              <div class="rewards-img">
                <img class="fit-cover" :src="article.expand.author.pay.wechat_pay || null_qrcode">
              </div>
            </li>
            <li>
              <p class="text-color">支付宝扫一扫</p>
              <div class="rewards-img">
                <img class="fit-cover" :src="article.expand.author.pay.alipay || null_qrcode">
              </div>
            </li>
          </ul>
          <div class="modal-footer">
            <div class="" data-inverted="" data-tooltip="用户自行承担资金安全，我方不承担连带责任！"
                 data-position="top center">
              法律声明
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";

export default {
  components: {Dialog},
  props: {
    article: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      articleUrl: "",
      visible: false,
      null_qrcode:
        "https://tngeek-mall-1255310647.cos.ap-guangzhou.myqcloud.com/public/qrcode/e5d06979176df4a377b1b6536db6856.jpg",
    };
  },
  watch: {},
  computed: {},
  methods: {
    toggle(id) {
      const el = document.getElementById(id);
      if (el) {
        el.classList.toggle("display");
      }
    },
    copy(id) {
      const el = document.getElementById(id);
      if (el) {
        el.select();
        document.execCommand("Copy");
        this.$notify({
          type: "success",
          title: "成功",
          message: "复制成功！",
        });
      }
    },
  },
  created() {
  },
  mounted() {
    this.articleUrl = window.location.href;
  },
};
</script>

<style lang="scss" scoped>
.article-footer {
  padding: 20px;

  .end {
    background-color: rgba(163, 163, 163, 0.9);
    color: #fff;
    padding: 3px 20px;
    position: relative;
    border-radius: 14px;
  }

  .license-share {
    padding: 1rem;
    background: #f7f6f6;
    border-radius: 6px;

    .header {
      font-weight: 500;
      color: #777;
      font-size: 1.2rem;
    }

    .body {
      color: #5a5a5a;
      margin: 0.5em 0;

      p a {
        color: #0366d6;
        text-decoration: none;
      }

      p a:hover {
        text-decoration: underline;
        color: #ff5722;
      }

      input.copy-area {
        background: 0 0;
        border: none;
        margin: 0.75rem 0;
        padding: 0;
        width: 100%;
        display: block;
        font-family: Menlo, Monaco, Consolas, system-ui, "Courier New",
        monospace, sans-serif;
        font-weight: 600;
        color: #818181;
      }
    }

    img {
      max-width: 100%;
    }

    section {
      margin-top: 1rem;
    }

    section + section {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid #e5e5e5;
    }

    .social-wrap {
      grid-gap: 0.5rem 1rem;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(auto-fill, 32px);
    }

    .social-wrap a.social {
      cursor: pointer;
      line-height: 0;
      display: inline-block;
      padding: 6px;
      border-radius: 4px;
      filter: grayscale(100%);
      overflow: hidden;
      background: 0 0;
      transition: box-shadow 0.2s ease-out, background 0.2s ease-out,
      transform 0.2s ease-out;
      -moz-transition: box-shadow 0.2s ease-out, background 0.2s ease-out,
      transform 0.2s ease-out;
      -webkit-transition: box-shadow 0.2s ease-out, background 0.2s ease-out,
      transform 0.2s ease-out;
      -o-transition: box-shadow 0.2s ease-out, background 0.2s ease-out,
      transform 0.2s ease-out;
    }

    .social-wrap a.social:hover {
      color: #ff5722;
      z-index: 1;
      filter: unset;
      transform: translateY(-1px);
      background: linear-gradient(145deg, #ddd, #fff);
      box-shadow: 2px 4px 8px #ddd, -2px -4px 8px #fff;
    }

    .qrcode {
      width: 128px;
      padding: 4px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgb(0 0 0 / 10%), 0 0 32px 0 rgb(0 0 0 / 10%);
      overflow: hidden;
      transition: height 0.2s ease-out;
      -moz-transition: height 0.2s ease-out;
      -webkit-transition: height 0.2s ease-out;
      -o-transition: height 0.2s ease-out;
    }

    .qrcode.display {
      margin: 2rem auto 1rem;
      height: 128px !important;
      visibility: visible !important;
    }
  }

  .appreciation {
    text-align: center;
    margin: 30px 0px;

    .appreciation-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 85px;
      height: 35px;
      margin: 0 auto;
      font-size: 14px;
      font-weight: 600;
      background: rgb(221, 86, 70);
      border-radius: 50px;
      opacity: 0.9;
      color: #fff;
      cursor: pointer;
      transition: all 0.25s;

      .icon {
        font-size: 18px;
      }
    }

    .appreciation-box:hover {
      background: rgb(209, 73, 58);
    }

    .appreciation-box:active {
      background: rgb(190, 58, 43);
    }

    p {
      margin: 20px;
      color: #999;
    }
  }

  .modal-content {
    top: 50%;
    left: 50%;
    width: 400px;
    height: 360px;
    -webkit-transform: translateX(-50%) translateY(-50%);
    -moz-transform: translateX(-50%) translateY(-50%);
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    position: relative;
    border-radius: 8px;
    background: #fff;
    border: none;

    .modal-header {
      position: absolute;
      overflow: hidden;
      left: 0;
      right: 0;
      top: 0;
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px 8px 0 0;
      background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);

      .close {
        z-index: 1;
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 10px;
        transition: .2s;
      }

      .close:hover {
        transform: rotate(270deg);
      }

      .make {
        left: 0;
        bottom: 0;
        height: 290px;
        width: 323px;
        top: 60%;
        position: absolute;
        color: #fff;
        background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
        border-radius: 500px;
        content: ' ';
      }

      .make::before {
        right: -240px;
        bottom: 0;
        height: 300px;
        width: 320px;
        top: -278px;
        transform: rotate(255deg);
        opacity: .6;
        position: absolute;
        color: #fff;
        background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
        border-radius: 500px;
        content: ' ';
      }

      .make::after {
        left: -113px;
        bottom: 0;
        height: 180px;
        width: 250px;
        top: -79px;
        transform: rotate(205deg);
        opacity: .7;
        border-radius: 100%;
        position: absolute;
        color: #fff;
        background: linear-gradient(135deg, #59c3fb 10%, #268df7 100%);
        content: ' ';
      }
    }

    .modal-body {
      color: #fff;
      padding: 20px;

      .text-center {
        z-index: 1;
        text-align: center;
      }

      .text {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 1.2em;
        margin-top: 10px;
      }

      .flex {
        justify-content: space-evenly;
        display: flex;
      }

      ul {
        list-style: none;
      }

      .rewards-box p {
        margin: 0 0 10px;
      }

      .modal-header + * {
        margin-top: 120px;
      }

      .text-color {
        color: #999;
      }

      .rewards-img {
        height: 140px;
        width: 140px;
        border-radius: 8px;
        overflow: hidden;
        margin: auto;
      }

      .fit-cover {
        width: 100%;
        height: 100%;
        transition: all .2s;
        -o-object-fit: cover;
        object-fit: cover;
      }
    }

    .modal-footer {
      text-align: center;
      left: 0;
      right: 0;
      bottom: 10px;
      height: 30px;
      margin-top: 15px;

      div {
        color: #999;
        cursor: pointer;
      }
    }
  }
}
</style>
