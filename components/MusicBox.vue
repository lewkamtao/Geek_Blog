<template>
  <div class="musicBox part">
    <!--音频-->
    <audio
      ref="audioRef"
      class="bgMusic"
      controls
      :autoplay="true"
      style="display: none"
      @ended="overAudio"
      @pause="onPause"
      @play="onPlay"
    >
      <source  type="audio/mpeg" />
    </audio>

    <div class="info">
      <div class="cover">
        <img
          src="https://q2.qlogo.cn/g?b=qq&nk=1057072668&s=100"
          alt=""
          srcset=""
        />
      </div>
      <div class="title">{{ "歌歌名歌名歌名歌名歌名歌名名" }}</div>
      <svg
        @click="isShowSongsList = !isShowSongsList"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        stroke="currentColor"
        stroke-width="3"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="css-i6dzq1 music-list-btn"
      >
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    </div>

    <div class="songs-list" :class="{ isShowSongsList: isShowSongsList }">
      <div v-for="item in songs" :key="item.id" class="item">
        {{ item.name }}
      </div>
    </div>

    <div class="contorl">
      <div class="line-box">
        <div class="time-line">
          <div class="start-time">2:46</div>
          <div class="end-time">-1:52</div>
          <div class="line"><span class="line-btn"></span></div>
        </div>
      </div>
      <div class="btn-box">
        <svg class="icon icon-prev" aria-hidden="true">
          <use xlink:href="#icon-prev"></use>
        </svg>

        <svg
          v-show="music.status == 'pause'"
          class="icon icon-play"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play"></use>
        </svg>

        <svg
          v-show="music.status != 'pause'"
          class="icon icon-pause"
          aria-hidden="true"
        >
          <use xlink:href="#icon-pause"></use>
        </svg>

        <svg class="icon icon-next" aria-hidden="true">
          <use xlink:href="#icon-next"></use>
        </svg>
      </div>
      <div class="line-box">
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        </svg>
        <div class="volume-line">
          <div class="line">
            <span class="line-btn"></span>
          </div>
        </div>
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="css-i6dzq1"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      music: {
        status: "pause",
      },
      isShowSongsList: false,
      songs: [],
    };
  },
  watch: {},
  computed: {},
  methods: {
    /**
     * audio自身事件
     * */
    // 当音频播放
    onPlay() {
      console.log("开始播放声音");
    },
    // 当音频暂停
    onPause() {
      console.log("暂停播放声音");
    },
    //播放完毕执行
    overAudio() {
      console.log("播放声音完毕");
      this.audioArr.forEach((item) => {
        item.isStart = true;
      });
    },

    async getMusicList() {
      const data = (await this.$axios.get("/music?id=1&mode=list")).data;
      this.songs = data.songs;
    },
  },
  created() {
    this.getMusicList();
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.musicBox {
  width: 100%;
  margin: 14px 0px;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;

  .info {
    position: relative;
    display: flex;
    align-items: flex-start;
    .cover {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      img {
        width: 100%;
        height: auto;
        border-radius: 6px;
      }
    }
    .title {
      width: calc(100% - 60px);
      margin-left: 10px;
      line-height: 20px;
    }
    .music-list-btn {
      position: absolute;
      cursor: pointer;
      right: 0px;
      bottom: -5px;
      transition: all 0.25s;
    }
    .music-list-btn:hover {
      transform: scale(1.1);
    }
    .music-list-btn:active {
      transform: scale(0.9);
    }
  }

  .songs-list {
    height: 0px;
    transition: all 0.5s;
    overflow-y: scroll;
    margin: 5px 0px;
    .item {
      position: relative;
      padding: 10px;
      border-radius: 8px;
      cursor: pointer;
    }
    .item::before {
      position: absolute;
      top: 1px;
      left: 0px;
      height: 1px;
      width: 100%;
      content: "";
      background: #eee;
    }
    .item:first-child::before {
      display: none;
    }
    .item:hover {
      background: rgba($color: #000000, $alpha: 0.05);
    }
    .item:hover + .item::before {
      display: none;
    }
  }
  .isShowSongsList {
    height: 250px;
    margin: 10px 0px;
  }
  /* 设置滚动条的样式 */
  .songs-list::-webkit-scrollbar {
    width: 4px;
  }
  /* 滚动槽 */
  .songs-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  .songs-list::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
  }

  .contorl {
    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        cursor: pointer;
        color: #333;
        transition: all 0.15s;
        padding: 10px;
        box-sizing: content-box;
      }
      .icon:hover {
        color: #000;
        transform: scale(1.1);
      }
      .icon-prev,
      .icon-next {
        font-size: 28px;
      }

      .icon-play,
      .icon-pause {
        font-size: 28px;
        margin: 0px 15px;
      }
    }
  }
  .line-box {
    padding: 15px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .time-line {
    position: relative;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    margin-bottom: 10px;
    background: #bfbfc4;

    .start-time {
      position: absolute;
      left: 0px;
      top: 10px;
      color: #999;
      font-size: 10px;
    }
    .end-time {
      position: absolute;
      right: 0px;

      top: 10px;
      color: #999;
      font-size: 10px;
    }
    .line {
      position: absolute;
      left: 0px;
      top: 0px;
      border-radius: 4px;
      height: 4px;
      width: 30%;
      background: #000;
      .line-btn {
        position: absolute;
        right: -4px;
        content: "";
        width: 8px;
        height: 8px;
        background: #000;
        animation: playingBtn 2s ease-in-out infinite alternate;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }

  .volume-line {
    position: relative;
    width: calc(100% - 60px);
    margin: 0px 8px 0px 4px;
    height: 4px;
    border-radius: 4px;
    background: #bfbfc4;
    .line {
      position: absolute;
      left: 0px;
      top: 0px;
      border-radius: 4px;
      height: 4px;
      width: 30%;
      background: #000;
      .line-btn {
        position: absolute;
        right: -9px;
        content: "";
        width: 18px;
        height: 18px;
        cursor: pointer;
        background: #fff;
        animation: playingBtn 2s ease-in-out infinite alternate;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
@keyframes playingBtn {
  from {
    box-shadow: 0px 0px 2px #999;
  }
  to {
    box-shadow: 0px 0px 15px #999;
  }
}
</style>