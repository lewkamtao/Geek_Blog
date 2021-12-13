<template>
  <div class="article-footer">
    <!--分割线-->
    <div class="ui horizontal divider">
      <span class="end">END</span>
    </div>
    <!--许可协议及分享文章-->
    <div class="license-share">
      <section id="license">
        <div class="header"><span>许可协议</span></div>
        <div class="body">
          <p>
            <span>本文采用</span>
            <a target="_blank" rel="external nofollow noopener noreferrer"
               href="https://creativecommons.org/licenses/by-nc-sa/4.0/">署名-非商业性使用-相同方式共享 4.0 国际</a>
            <span>许可协议，转载请注明出处。</span>
          </p>
        </div>
      </section>
      <section id="share">
        <div class="header"><span>分享文章</span></div>
        <div class="body">
          <div class="link"><input class="copy-area" readonly="true" id="copy-link" :value="articleUrl"/></div>
          <div class="social-wrap dis-select">
            <a class="social share-item wechat" @click="toggle('qrcode-wechat')"><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/b32ef3da1162a.svg" alt=""></a>
            <a class="social share-item weibo" target="_blank" rel="external nofollow noopener noreferrer"
               :href="'https://service.weibo.com/share/share.php?url='+ articleUrl +'&amp;title=' + article.title + '&amp;summary=' + article.description"><img
              class="lazy entered loaded"
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/80c07e4dbb303.svg" alt=""></a>
            <a class="social share-item email"
               :href="'mailto:?subject='+ article.title +'&amp;body='+ articleUrl"><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/a1b00e20f425d.svg" alt=""></a>
            <a class="social share-item link" @click="copy('copy-link')"><img
              src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/social/8411ed322ced6.svg"></a>
          </div>
          <div class="qrcode" id="qrcode-wechat" style="visibility:hidden;height:0"><img
            :src="'https://api.qrserver.com/v1/create-qr-code/?size=256x256&amp;data=' + articleUrl"
            alt=""></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>

export default {
  components: {},
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
      articleUrl: ""
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
          message: "复制成功！"
        });
      }
    }
  },
  created() {
  },
  mounted() {
    this.articleUrl = window.document.location.host + '/Article?id=' + this.article.id
  }
};
</script>

<style lang="scss" scoped>
.article-footer {
  margin-top: 2.5rem;

  .end {
    background-color: rgba(182, 222, 247, 0.9);
    color: #fff;
    padding: 3px 20px;
    position: relative;
    border-radius: 14px;
  }


  .license-share {
    margin-top: 3rem;
    padding: 1rem;
    background: #f2f2f2;
    border-radius: 6px;
    border: 1px solid #e5e5e5;

    .header {
      font-weight: 500;
      color: #5a5a5a;
      font-size: 1.2rem;
    }

    .body {
      color: #5a5a5a;
      margin: .5em 0;

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
        margin: .75rem 0;
        padding: 0;
        width: 100%;
        display: block;
        font-family: Menlo, Monaco, Consolas, system-ui, "Courier New", monospace, sans-serif;
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
      transition: box-shadow .2s ease-out, background .2s ease-out, transform .2s ease-out;
      -moz-transition: box-shadow .2s ease-out, background .2s ease-out, transform .2s ease-out;
      -webkit-transition: box-shadow .2s ease-out, background .2s ease-out, transform .2s ease-out;
      -o-transition: box-shadow .2s ease-out, background .2s ease-out, transform .2s ease-out;
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
      transition: height .2s ease-out;
      -moz-transition: height .2s ease-out;
      -webkit-transition: height .2s ease-out;
      -o-transition: height .2s ease-out;
    }

    .qrcode.display {
      margin: 2rem auto 1rem;
      height: 128px !important;
      visibility: visible !important;
    }
  }
}

input::selection, textarea::selection {
  background: #0079ff;
  color: #f7f7f7;
}
</style>
