<template>
  <div class="error-page" v-if="error.statusCode === 404">
    <img class="lazy entered loaded" id="error"
         src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/404/1c830bfcd517d.svg"
         data-src="https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/404/1c830bfcd517d.svg" alt="404"
         data-ll-status="loaded">
    <p class="what"><strong>很抱歉，您访问的页面不存在</strong></p>
    <p class="why">可能是输入地址有误或该地址已被删除</p>
    <br>
    <br>
    <nuxt-link to="/">
      <span id="back">返回主页</span>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'error',
  head() {
    return {
      title: 404,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: 404,
        },
        {
          hid: "description",
          name: "description",
          content: "很抱歉，您访问的页面不存在",
        },
      ],
      link: [
        {
          rel: "icon",
          type: "image/x-icon",
          href: "https://cdn.jsdelivr.net/gh/cdn-x/placeholder@1.0.1/404/1c830bfcd517d.svg",
        },
      ],
    };
  },
  props: ['error']
}
</script>

<style lang="scss" scoped>
.error-page {
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  img#error {
    max-height: 200px;
  }

  p.what {
    margin: .5em;
    font-size: 1.5rem;
  }

  p.why {
    margin: .5em;
  }

  strong {
    font-weight: bolder;
  }

  span#back {
    margin: 2rem 0;
    display: inline-block;
    background: #fdb62f;
    color: #000;
    border-radius: 4px;
    border: 2px solid #000;
    font-weight: 500;
    line-height: 1;
    padding: .75rem 2rem;
    -webkit-transition: background .2s ease-out;
  }
}

</style>
