/*
* 移动端打开WEB端网页,显示下载条,点击尝试打开客户端,并跳转到下载页
* 使用方法
* <script src="./dlBar.js" imgurl="./jizhang.png" itunesurl="http://itunes.apple.com/app/id386756967?mt=8" androidurl="http://www.wacai.com/wap/download_wacai.html" iosschemaurl="wacai://home" androidschemaurl="wacai://home">
* androidurl: 安卓下载页地址
* itunesurl: IOS下载地址
* iosschemaurl: IOS打开APP schema url
* androidschemaurl: android 打开APP schema url
* schemaurl: 默认打开app schema url
 */
(function() {
  var ua = navigator.userAgent,
    isAndroid = /android/i.test(ua),
    isIOS = !isAndroid && /ipad|iphone/i.test(ua);

  if (!isAndroid && !isIOS) return;

  var scripts = document.getElementsByTagName("script"),
    curScript = scripts[scripts.length - 1],
    imgSrc = curScript.getAttribute('imgurl'),
    appBarContent = '<div id="appBar" style="position:fixed;left:0;bottom:0;width:100%;"><img style="width:100%;display:block;" src="' + imgSrc + '" alt="下载条"><span style="position:absolute;right:14.8%;bottom:20%;width:18.55%;height:63%"></span><span style="position:absolute;right:3.4375%;bottom:35%;width:4.6875%;height:30%;"></span></div>';

  document.body.insertAdjacentHTML("beforeEnd", appBarContent);

  var appBar = document.querySelector("#appBar"),
    appBarBtns = appBar.querySelectorAll("span"),
    schemaurl = function() {
      var _schemaurl = curScript.getAttribute('schemaurl');

      return _schemaurl ? _schemaurl : isIOS ? curScript.getAttribute('iosschemaurl') : curScript.getAttribute('androidschemaurl');
    }();
  
  appBarBtns[1].addEventListener("touchend", function() {
    appBar.style.display = "none";
  });
  
  appBarBtns[0].addEventListener("touchend", function() {
    var timer,
      clickTime = Date.now(),
      oIframe = document.createElement('iframe');
      
    oIframe.src = schemaurl;
    oIframe.style.display = 'none';
    document.body.appendChild(oIframe);
    timer = setTimeout(function() {
      var timeOutTime = Date.now();

      if (!clickTime || timeOutTime - clickTime < 800) {
        location.href = isIOS ? curScript.getAttribute('itunesurl') : curScript.getAttribute('androidurl');
      }
    }, 600);

    window.addEventListener("blur", function() {
      clearTimeout(timer);
      window.removeEventListener("blur", arguments.callee, false);
    }, false);
  });
})();