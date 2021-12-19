<template>
  <div class="article-footer">
    <!--分割线-->
    <div class="ui horizontal divider">
      <span class="end">END</span>
    </div>
    <!--赞赏-->
    <div class="appreciation">
      <div @click="visible = true" class="appreciation-box">
        <svg t="1639893095492" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1601" width="15" height="15"><path d="M723.07624 239.356169c-17.756912 16.022945-37.442863 37.825781-59.070497 65.381416h113.237117c-1.647269 19.47643-2.470904 37.56388-2.470904 54.246094 0 15.421475 0.823635 35.150775 2.470904 59.184289h-64.286849v-63.96715h-400.889703v73.809222H247.777652c1.649075-25.021514 2.463679-46.39989 2.463679-64.120678 0-19.147699-0.814604-38.857131-2.463679-59.14997h123.073771c-19.606478-20.578222-38.48505-42.816357-56.632105-66.716211 16.066294-10.606102 32.139812-21.204979 48.2043-31.811081 24.736132 24.736132 46.50465 52.795702 65.303749 84.171485-15.240853 10.485085-27.548411 15.26614-36.904611 14.355807h90.760562c0-29.154137-0.807379-61.97128-2.431167-98.447819h66.718017c-1.621982 31.930291-2.429361 64.747435-2.429361 98.447819h59.106621c26.036608-38.282754 42.1896-69.477915 48.439108-93.587291 25.464037 11.84336 49.497551 21.244716 72.089704 28.204068zM715.699653 533.60325a953.32637 953.32637 0 0 0-2.47271 69.024555c0 23.643371 0.823635 47.476395 2.47271 71.500877h-64.281431V583.100801H373.60229v100.882597H309.315441c1.649075-28.348564 2.47271-53.830664 2.47271-76.448104 0-22.56506-0.825441-47.207269-2.47271-73.930238l406.384212-0.001806z" fill="#ffffff" p-id="1602"></path><path d="M545.870168 609.536582c-18.797293 55.826533-38.492275 92.304877-59.070497 109.445869-20.580028 17.142799-46.338479 31.984478-77.289801 44.516006-30.942291 12.54056-76.924945 22.957009-137.924481 31.245736-4.000769-17.209629-15.222791-37.590973-33.658841-61.153065 48.197075-1.988644 86.671288-6.571015 115.435283-13.763368 28.762188-7.186935 54.896331-19.398763 78.382561-36.62826 23.493455-17.236722 37.910673-48.249455 43.248043-93.041812 23.627115 6.457223 47.252424 12.921671 70.877733 19.378894zM688.637115 511.713715H336.377979c1.649075-26.697683 2.47271-49.723328 2.47271-69.069711 0-19.216335-0.825441-39.760239-2.47271-61.615456h352.259136v130.685167z m-64.288656-47.026647v-34.206124H400.664829v34.206124h223.68363zM579.164152 649.228185c77.50474 30.306503 141.881901 62.533014 193.133288 96.684951-16.057263 14.615902-30.292053 30.06447-42.70979 46.356541-36.377196-26.777156-97.703657-57.585787-183.993833-92.443956 13.393094-19.899085 24.578991-36.76192 33.570335-50.597536z" fill="#ffffff" p-id="1603"></path><path d="M1023.999097 511.999097c0 282.770383-229.23052 511.999097-511.993678 511.999097C229.231423 1024 0.000903 794.771286 0.000903 511.999097 0.000903 229.235939 229.231423 0 512.003612 0 794.768577 0 1023.999097 229.235939 1023.999097 511.999097zM512.003612 76.802122c-240.356812 0-435.207812 194.849193-435.207811 435.196975 0 240.355006 194.851 435.206006 435.207811 435.206006 240.349588 0 435.198781-194.851 435.198781-435.206006 0-240.345975-194.849193-435.196975-435.198781-435.196975z" fill="#ffffff" p-id="1604"></path></svg>
        &nbsp;&nbsp;赞 赏
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
