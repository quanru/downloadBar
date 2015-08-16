      (function  () {
        var domainNow = document.domain;
        var scripts = document.getElementsByTagName("script");
        var curScript = scripts[scripts.length - 1];
        var imgSrc = curScript.dataset.imgurl;
        var itunesSrc = curScript.dataset.itunesurl;
        var androidSrc = curScript.dataset.androidurl;
        var schemaSrc = curScript.dataset.schemaurl;

        creatHtml();
        var UA = navigator.userAgent;
        var downBar = document.querySelector("#barab");
        var wacai = 0, android = 0, ios = 0;
          if(UA.match(/android/i))
            android = 1;
          else if(UA.match(/iP/))
            ios = 1;
          if(android || ios ) {
            downBar.style.display = "block";
            downloadApp();//下载app
          }

          function creatHtml () {
                var st = document.createElement("style");
                var cssText = document.createTextNode(".bottom-bar { display: none; position: fixed;  left: 0; bottom: 0;  width: 100%; } .dl-btn { position: absolute; right: 17.5%; width: 18.75%; } .cl-btn { position: absolute; right: 3.4375%; width: 4.6875%; }  .dl-img { width: 100%;  display: block; }");
                st.setAttribute("type", "text/css");
                st.appendChild(cssText);
                var heads = document.getElementsByTagName("head");
                if(heads.length) {
                 heads[0].appendChild(st);
                }

            document.body.insertAdjacentHTML("beforeEnd", '<div id="barab" style="display: none; position: fixed;  left: 0; bottom: 0;  width: 100%;"><img style="width: 100%;  display: block;" src="'+ imgSrc +'" alt="下载条"><span style="position: absolute; right: 14.8%;  bottom: 20%; width: 18.55%; height: 63%"></span><span style="position: absolute; right: 3.4375%; bottom: 35%;width: 4.6875%; height: 30%;"></span></div>');
          }
          function downloadApp () {
              var dlNow = document.querySelector("#barab span");
              var closeBtn = dlNow.nextElementSibling;
              closeBtn.addEventListener("touchend", function  (event) {
                 downBar.style.display = "none";
              });
              dlNow.addEventListener("touchend", function  (event) {
                var t;
                var clickTime = new Date();
                var ifr = document.createElement('iframe');
                ifr.src = schemaSrc;
                ifr.style.display = 'none';
                document.body.appendChild(ifr);
                t = window.setTimeout(function() {
                    var endTime = Date.now();
                    if (!clickTime || endTime - clickTime < 600 + 200) { 
                        if(android)
                            window.location = androidSrc;
                        else if(ios)
                            window.location = itunesSrc;
                    } 
                }, 600);
                window.onblur = function() {
                    clearTimeout(t);
                };
              });
          }
          })();