<template>
  <div class="article-footer">
    <!--分割线-->
    <div class="ui horizontal divider">
      <span class="end">END</span>
    </div>
    <div @click="visible = true" class="appreciation">
      <p>如果觉得我的文章对你有用，请随意赞赏</p>
      <div class="appreciation-box">
        <i class="thumbs up outline icon"></i> 赞赏
      </div>
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
    <Dialog :visible="visible">
      <div class="qrcode-box">
        <div class="select">
          <div @click="isSelect = 'wechat'">微信</div>
          <div @click="isSelect = 'ali'">支付宝</div>
          <div @click="isSelect = 'qq'">QQ</div>
          <div class="active" :class="isSelect"></div>
        </div>
        <div class="qrcode">
          <img
            v-show="isSelect == 'wechat'"
            :src="article.expand.author.pay.wechat_pay || null_qrcode"
          />
          <img
            v-show="isSelect == 'ali'"
            :src="article.expand.author.pay.alipay || null_qrcode"
          />
          <img
            v-show="isSelect == 'qq'"
            :src="article.expand.author.pay.qq_pay || null_qrcode"
          />
        </div>

        <div @click="visible = false" class="close">
          <div class="btn">关闭</div>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  components: { Dialog },
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
      isSelect: "wechat",
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
  created() {},
  mounted() {
    this.articleUrl =
      window.document.location.host + "/Article?id=" + this.article.id;
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
    margin-top: 3rem;
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
      width: 100px;
      height: 40px;
      margin: 0 auto;
      font-size: 14px;
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
  .qrcode-box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;

    .select {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 48px;
      box-sizing: border-box;
      padding: 4px;
      div {
        position: relative;
        z-index: 9;
        width: calc(100% / 3);
        height: 100%;
        color: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .active {
        position: absolute;
        z-index: 1;
        width: calc(100% / 3 - 3px);
        height: calc(100% - 8px);
        left: 4px;
        top: 4px;
        border-radius: 7px;
        background: #eee;
        transition: all 0.25s;
      }
      .ali {
        transform: translateX(100%);
      }
      .qq {
        transform: translateX(200%);
      }
    }
    .qrcode {
      position: relative;
      width: 100%;
      height: calc(100% - 48px);
      height: 300px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        position: absolute;
        z-index: 9;
        width: 100%;
        height: auto;
      }
    }
    .close {
      width: 100%;

      text-align: center;

      background: #fff;
      padding: 4px;
      box-sizing: border-box;
      overflow: hidden;
      .btn {
        height: 36px;
        line-height: 40px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn:hover {
        background: #eee;
      }
    }
  }
}
</style>
