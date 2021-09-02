<template>
  <div style="margin-bottom: 8px" class="info part">
    <div class="main-title" style="margin-bottom: 12px">博客信息</div>
    <div>
      <ul>
        <li>
          <div>
            <span>Dom 渲染耗时</span><span>{{ info.domTime + " ms" }} </span>
          </div>
        </li>
        <li>
          <div>
            <span>白屏时间</span><span>{{ info.blankTime + " ms" }} </span>
          </div>
        </li>
        <li>
          <div>
            <span>内存使用占比</span>
            <span>{{ info.memoryPercent + " %" }} </span>
          </div>
        </li>
        <li>
          <div>
            <span>Dom Ready时间</span>
            <span>{{ info.domreadyTime + " ms" }} </span>
          </div>
        </li>
        <li>
          <div>
            <span>onload 时间 </span><span>{{ info.onloadTime + " ms" }} </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: false,
    };
  },
  created() {
    if (this.$cookies.get("info")) {
      this.info = this.$cookies.get("info");
    }
  },
  mounted() {
    if (process.browser) {
      var that = this;
      window.onload = function () {
        let t = performance.timing;
        setTimeout(function () {
          that.info = {
            dnsTime: t.domainLookupEnd - t.domainLookupStart, // DNS查询耗时
            TCPTime: (t.connectEnd - t.connectStart).toFixed(0), // 链接耗时
            requestTime: (t.responseEnd - t.responseStart).toFixed(0), // request请求耗时
            domTime: (t.domComplete - t.domInteractive).toFixed(0), // dom渲染耗时
            blankTime: (t.responseStart - t.navigationStart).toFixed(0), // 白屏时间
            domreadyTime: (
              t.domContentLoadedEventEnd - t.navigationStart
            ).toFixed(0), // domready时间
            onloadTime: (t.loadEventEnd - t.navigationStart).toFixed(0), // onload时间
          };
          if ((t = performance.memory)) {
            that.info.memoryPercent = (
              (t.usedJSHeapSize / t.totalJSHeapSize) *
              100
            ).toFixed(2); //  js内存使用占比
          }
          that.$cookies.set("info", that.info);
        });
      };
    }
  },
};
</script>

<style lang="scss" scoped>
ul {
  padding: 1px 15px;
  box-sizing: border-box;
  border-radius: 7px;
  width: 100%;
    background: rgba(0, 0, 0, 0.025);
  li {
    position: relative;
    width: 100%;
    color: #333;
    div {
      margin: 20px 0px;
      font-size: 14px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span:nth-child(1) {
      color: #666;
    }
    span:nth-child(2) {
      text-align: center;
      padding: 0px 6px;
      border-radius: 3px;
      background: #fff;
      box-shadow: 0px 0px 15px rgba($color: #000000, $alpha: 0.055);
      color: #000;
      font-size: 12px;
    }
  }
  li::before {
    display: none !important;
  }
}
</style>
