<template>
  <div class="musicBox part">
    <!--音频-->

    <audio
      ref="audioRef"
      class="bgMusic"
      style="display: none"
      @ended="overAudio"
      @pause="onPause"
      @loadedmetadata="onLoadedmetadata"
      @timeupdate="onTimeupdate"
      :src="music.song ? music.song.url : ''"
      @play="onPlay"
    ></audio>

    <div class="song-info">
      <div class="cover">
        <img :src="music.song.cover" alt srcset />
      </div>
      <div class="info">
        <div class="title">{{ music.song.name }}</div>
        <div class="author">演唱： {{ music.song.author }}</div>
      </div>

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
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    </div>

    <div class="songs-list" :class="{ isShowSongsList: isShowSongsList }">
      <div
        v-for="(item, index) in songs"
        :key="item.id"
        @click="getMusicDetail(index)"
        class="item"
      >
        {{ item.name }}
        <svg
          v-show="music.song.song_id == item.song_id"
          class="icon icon-playing"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play" />
        </svg>
      </div>
    </div>

    <div class="contorl">
      <div class="line-box">
        <!-- 时间进度调节 -->
        <div
          ref="timeLine"
          class="line-wrapper-time"
          @mousedown="changeTimeMousedown"
        >
          <div class="time-line">
            <div class="start-time">{{ music.startTimeStr || "00:00" }}</div>
            <div class="end-time">- {{ music.endTimeStr || "00:00" }}</div>
            <div
              :style="'width:' + timeLine.isPlayWidth + 'px'"
              class="line"
              ref="isPlayWidth"
            >
              <span @mousedown="changeTimeMousemove" class="line-btn"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-box">
        <svg @click="prev()" class="icon icon-prev" aria-hidden="true">
          <use xlink:href="#icon-prev" />
        </svg>

        <svg
          @click="play()"
          v-show="music.status == 'pause'"
          class="icon icon-play"
          aria-hidden="true"
        >
          <use xlink:href="#icon-play" />
        </svg>

        <svg
          @click="pause()"
          v-show="music.status != 'pause'"
          class="icon icon-pause"
          aria-hidden="true"
        >
          <use xlink:href="#icon-pause" />
        </svg>

        <svg @click="next()" class="icon icon-next" aria-hidden="true">
          <use xlink:href="#icon-next" />
        </svg>
      </div>

      <!-- 音量调节 -->
      <div class="line-box">
        <svg
          @click="reduceVolume"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon-volume icon-reduceVolume"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        </svg>
        <div
          ref="volumeLine"
          @mousedown="changeVolumeMousedown"
          class="line-wrapper-volume"
        >
          <div class="volume-line">
            <div
              class="line"
              ref="isOpenWidth"
              :style="'width:' + volumeLine.isOpenWidth + 'px'"
            >
              <span class="line-btn" @mousedown="changeVolumeMousemove"></span>
            </div>
          </div>
        </div>
        <svg
          @click="increaseVolume"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          stroke="currentColor"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon-volume icon-increaseVolume"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
          />
        </svg>
      </div>
      <div class="error-url" v-show="error_tips">{{ error_tips }}</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    geek_config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      isLock: true, // 首次锁住
      music: {
        song: {},
        status: "pause",
        volume: 0,
        startTimeStr: "",
        endTimeStr: "",
      },

      timeLine: {
        isPlayWidth: 0,
        width: 0,
      },
      volumeLine: {
        isOpenWidth: 0,
        width: 0,
      },

      isShowSongsList: false,
      songs: [],
      error_tips: "",
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 播放音频
    play() {
      this.$refs.audioRef.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audioRef.pause();
    },
    // 下一首
    next() {
      if (this.music.song.index == this.songs.length - 1) {
        this.getMusicDetail(0);
      } else {
        this.getMusicDetail(this.music.song.index + 1);
      }
    },
    // 上一首
    prev() {
      if (this.music.song.index == 0) {
        this.getMusicDetail(this.songs.length - 1);
      } else {
        this.getMusicDetail(this.music.song.index - 1);
      }
    },
    // 点击调节进度
    changeTimeMousedown(de) {
      var bX = this.$refs.timeLine.getBoundingClientRect().x;
      var deX = de.x;
      var w = deX - bX;
      this.timeLine.isPlayWidth = w;
      var currentTime =
        (this.timeLine.isPlayWidth / this.timeLine.width) * this.music.duration;
      this.$refs.audioRef.currentTime = currentTime;
    },
    // 点击调节音量
    changeVolumeMousedown(de) {
      var bX = this.$refs.volumeLine.getBoundingClientRect().x;
      var deX = de.x;
      var w = deX - bX;
      this.volumeLine.isOpenWidth = w;
      var volume = this.volumeLine.isOpenWidth / this.volumeLine.width;
      this.$refs.audioRef.volume = volume;
    },
    // 降低调节音量
    reduceVolume() {
      var volume = this.$refs.audioRef.volume - 0.1;
      if (volume <= 0) {
        volume = 0;
      }
      this.$refs.audioRef.volume = volume;

      this.volumeLine.isOpenWidth = this.volumeLine.width * volume;
    },
    // 增加调节音量
    increaseVolume() {
      var volume = this.$refs.audioRef.volume + 0.1;
      if (volume >= 0.9) {
        volume = 0.9;
      }
      this.$refs.audioRef.volume = volume;
      this.volumeLine.isOpenWidth = this.volumeLine.width * volume;
    },
    // 拖动调节进度
    changeTimeMousemove(de) {
      var that = this;
      that.timeLine.isMove = true;
      var deX = de.x;
      var isPlayWidth = that.timeLine.isPlayWidth;
      document.onmousemove = function (me) {
        var meX = me.x;
        var w = isPlayWidth + (meX - deX);

        if (w > that.timeLine.width) {
          w = that.timeLine.width;
        } else if (w < 0) {
          w = 0;
        }
        that.timeLine.isPlayWidth = w;
      };
      document.onmouseup = function () {
        var currentTime =
          (that.timeLine.isPlayWidth / that.timeLine.width) *
          that.music.duration;

        that.$refs.audioRef.currentTime = currentTime;

        that.timeLine.isMove = false;
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    // 拖动音量
    changeVolumeMousemove(de) {
      var that = this;
      that.volumeLine.isMove = true;
      var deX = de.x;
      var isOpenWidth = that.volumeLine.isOpenWidth;

      document.onmousemove = function (me) {
        var meX = me.x;
        var w = isOpenWidth + (meX - deX);
        if (w > that.volumeLine.width - 15) {
          w = that.volumeLine.width - 15;
        } else if (w < 0) {
          w = 0;
        }
        that.volumeLine.isOpenWidth = w;
        var volume = that.volumeLine.isOpenWidth / that.volumeLine.width;
        that.$refs.audioRef.volume = volume;
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },

    // 当音频播放
    onPlay(e) {
      this.music.status = "playing";
      this.isShowSongsList = false;
    },
    // 当音频暂停
    onPause(e) {
      this.music.status = "pause";
    },
    //播放完毕执行
    overAudio() {
      this.next();
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.music.startTimeStr = this.realFormatSecond(res.target.currentTime);
      if (!this.timeLine.isMove) {
        this.timeLine.isPlayWidth =
          (res.target.currentTime / this.music.duration) * this.timeLine.width;
      }

      if (this.music.duration) {
        this.music.endTimeStr = this.realFormatSecond(
          this.music.duration - res.target.currentTime
        );
      } else {
        this.music.endTimeStr = "00:00";
      }
      // this.audio.currentTime = res.target.currentTime;
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.music.duration = res.target.duration;
    },
    async getMusicList() {
      var list_id = this.geek_config.site_config.song_list_id || 1;
      try {
        const data = (
          await this.$axios.get(
            "/music?id=" + list_id + "&mode=list&cache=false"
          )
        ).data;
        this.songs = data.songs;
        this.getMusicDetail(0);
      } catch {
        this.error_tips = "歌单ID已失效，请检查歌单ID";
      }
    },
    playSongs({ songs, index }) {
      this.songs = songs;
      this.getMusicDetail(index);
    },

    async getMusicDetail(index) {
      var that = this;
      const data = (
        await this.$axios.get(
          "/music?id=" + this.songs[index].song_id + "&mode=song&cache=false"
        )
      ).data;
      data.index = index;
      this.music.song = data;
      if (this.music.song.url == "") {
        this.error_tips = "歌曲地址已失效，请切换下一首。";
        setTimeout(function () {
          that.getMusicDetail(index + 1, this.songs[index + 1].song_id);
        });
      } else {
        this.error_tips = "";
      }
      if (!this.isLock) {
        setTimeout(function () {
          that.play();
        }, 200);
      } else {
        this.isLock = false; // 解锁
      }
    },
    realFormatSecond(second) {
      var secondType = typeof second;

      if (secondType === "number" || secondType === "string") {
        second = parseInt(second);

        var hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        var mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);

        // return (
        //   hours +
        //   ":" +
        //   ("0" + mimute).slice(-2) +
        //   ":" +
        //   ("0" + second).slice(-2)
        // );
      } else {
        return "0:00:00";
      }
    },
  },
  created() {
    this.getMusicList();
    if (process.browser) {
      this.$nextTick(function () {
        this.timeLine.width = this.$refs.timeLine.clientWidth;
        this.volumeLine.width = this.$refs.volumeLine.clientWidth;
        this.$refs.audioRef.volume = 0.618;
        this.volumeLine.isOpenWidth =
          this.$refs.audioRef.volume * this.volumeLine.width;
      });
    }
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.musicBox {
  width: 100%;
  margin: 8px 0px;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .song-info {
    position: relative;
    display: flex;
    align-items: flex-start;
    .info {
      width: calc(100% - 60px);
      margin-left: 10px;
      display: flex;
      flex-direction: column;
    }
    .cover {
      width: 50px;
      height: 50px;
      border-radius: 6px;
      background: #eee;
      img {
        width: 100%;
        height: auto;
        border-radius: 6px;
      }
    }
    .title {
      width: 100%;
      line-height: 20px;
    }
    .author {
      color: #999;
      margin-top: 5px;
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
    .item {
      position: relative;
      padding: 7px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      margin-right: 10px;
      .icon-playing {
        color: #999;
        margin-left: 10px;
      }
    }
    .item::before {
      position: absolute;
      top: 0px;
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
    .item:hover::before {
      display: none;
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
    width: 3px;
  }
  /* 滚动槽 */
  .songs-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
    border-radius: 7px;
  }
  /* 滚动条滑块 */
  .songs-list::-webkit-scrollbar-thumb {
    border-radius: 7px;
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
      .icon:active {
        color: #000;
        transform: scale(1);
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
    .line-wrapper-time {
      padding: 5px 0px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .line-wrapper-volume {
      padding: 5px 0px;
      width: calc(100% - 60px);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
  .time-line {
    position: relative;
    width: 100%;
    height: 3px;
    border-radius: 3px;
    margin-bottom: 10px;
    background: #bfbfc4;
    cursor: pointer;
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
      border-radius: 3px;
      height: 3px;
      width: 0%;
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
        cursor: pointer;
        transition: all 0.25s;
      }
      .line-btn:hover {
        right: -5px;
        width: 10px;
        height: 10px;
      }
    }
  }
  .icon-volume {
    cursor: pointer;
    transition: all 0.25s;
  }
  .icon-volume:hover {
    transform: scale(1.05);
  }
  .icon-volume:active {
    transform: scale(0.95);
  }
  .volume-line {
    position: relative;

    width: 100%;
    margin: 0px 8px 0px 4px;
    height: 3px;
    border-radius: 3px;
    cursor: pointer;
    background: #bfbfc4;
    .line {
      position: absolute;
      left: 0px;
      transition: all 0.25s;
      top: 0px;
      border-radius: 3px;
      height: 3px;
      width: 0px;
      background: #000;
      .line-btn {
        position: absolute;
        right: -9px;
        content: "";
        width: 18px;
        height: 18px;
        cursor: pointer;
        background: #fff;
        box-shadow: 0px 0px 15px #999;
        border-radius: 50%;
        top: 50%;
        transition: all 0.25s;
        transform: translateY(-50%);
      }
      .line-btn:hover {
        right: -10px;
        width: 20px;
        height: 20px;
      }
    }
  }
  .error-url {
    text-align: center;
    color: #a7342d;
  }
}
@keyframes playingBtn {
  from {
    box-shadow: 0px 0px 2px #000;
  }
  to {
    box-shadow: 0px 0px 15px #000;
  }
}
</style>
