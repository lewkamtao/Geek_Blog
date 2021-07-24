 /**
  * 人性化时间处理 传入时间 YY-MM-dd hh-mm-ss
  */
 function getBeautifyTime(date) {
     var timestamp = new Date(date).getTime()
     var mistiming = Math.round(new Date() / 1000) - timestamp / 1000;
     var postfix = mistiming > 0 ? '前' : '后'
     mistiming = Math.abs(mistiming)
     var arrr = ['年', '个月', '星期', '天', '小时', '分钟', '秒'];
     var arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
     for (var i = 0; i < 7; i++) {
         var inm = Math.floor(mistiming / arrn[i])
         if (inm != 0) {
             return inm + '' + arrr[i] + postfix
         }
     }
 }

 /**
  * 处理顶部栏优先级遮罩层
  */
 function showTopNav(status) {
     if (status) {
         document.getElementById("topNavMask").style.display = "none";
         document.getElementById("topNavMask").style.opacity = "0";
     } else {
         document.getElementById("topNavMask").style.display = "block";
         setTimeout(function() {
             document.getElementById("topNavMask").style.opacity = "1";
         }, 10)
     }
 }

 export default {
     getBeautifyTime,
     showTopNav
 }