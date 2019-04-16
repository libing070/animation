function SetPhoneWidth(width){
    var phoneWidth =  parseInt(window.screen.width);
    var setWidth = width||750;
    var phoneScale = phoneWidth/setWidth;
    var ua = navigator.userAgent;
    if (/Android (\d+\.\d+)/.test(ua)){
        var version = parseFloat(RegExp.$1);
        if(version>2.3){
            document.write('<meta name="viewport" content="width='+setWidth+', user-scalable=0, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'">');
        }else{
            document.write('<meta name="viewport" content="width='+setWidth+', user-scalable=0, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'">');
        }
    } else {
        document.write('<meta name="viewport" content="width='+setWidth+', user-scalable=no, minimum-scale = '+phoneScale+', maximum-scale = '+phoneScale+'">');
    }
}

// 取得ULR参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 验证手机号是否正确
checkPhone = function(phone) {
    return !!phone.match(/^(0|86|17951)?(13[0-9]|15[0-9]|17[0-9]|18[0-9]|14[579])[0-9]{8}$/);
};


// 背景帧动画
function BgFrameAnimation(el,minIdx, maxIdx, speed, url, ext){
    this.el = $(el);
    var self = this;
    this.minIdx = minIdx;
    this.maxIdx = maxIdx;
    this.currIdx = minIdx;
    this.speed = speed;
    this.url = url;
    this.ext = ext;
    this.timer = null;

    this.Start = function(){
        if(self.timer == null){
            self.timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        self.el.css({"background":"url("+self.url+self.currIdx+"."+self.ext+") no-repeat"});
        self.currIdx ++;
        if(self.currIdx > self.maxIdx){
            self.currIdx = self.minIdx;
        }
    };


    this.End = function(){
        if(self.timer != null){
            window.clearInterval(self.timer);
            self.timer = null;
        }
    };
}

// 绑定默认值
function BindFoucs(el){
    this.el = el;
    this.value = el.val();
    var self = this;
    this.el.focus(function(){
        if(self.el.val() == self.value){
            self.el.val('');
        }
    });
    this.el.blur(function(){
        var v = self.el.val();
        if(v == ''){
            self.el.val(self.value);
        }
    });
}


function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


// 背景帧动画
function BindImageFrameAnimation(id,minIdx, maxIdx, speed, url, ext){
    this.el = $("#"+id);
    var self = this;
    this.minIdx = minIdx;
    this.maxIdx = maxIdx;
    this.currIdx = minIdx;
    this.speed = speed;
    this.url = url;
    this.ext = ext;
    this.timer = null;

    this.Start = function(){
        if(self.timer == null){
            self.timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        self.el.attr("src", self.url+self.currIdx+"."+self.ext);
        self.currIdx ++;
        if(self.currIdx > self.maxIdx){
            self.currIdx = self.minIdx;
        }
    };


    this.End = function(){
        if(self.timer != null){
            window.clearInterval(self.timer);
            self.timer = null;
        }
    };
}

// 背景帧动画
function BindImageLoadLoopFrameAnimation(id, speed, loadImages, speed1, loopImages, loopStopTime){
    var el = $("#"+id);
    var self = this;
    var speed = speed;
    var loopTimer = null;
    var loopIndex = 0;
    var stopLoop = false;
    var stopTimer = 0;
    var startTimer = null;
    var startIndex = 0;

    this.Start = function(){
        startIndex = 0;
        self.ClearStartTimer();
        self.ClearLoopTimer();
        startTimer = window.setInterval(function(){
            el.attr("src", loadImages[startIndex]);
            startIndex ++;
            if(startIndex >= loadImages.length){
                self.ClearStartTimer();
                self.Loop();
            }
        }, speed);
    };

    this.Loop = function(){
        loopIndex = 0;
        self.ClearLoopTimer();
        stopTimer = false;
        stopTimer = 0;
        loopTimer = window.setInterval(function(){
            if(stopLoop){
                stopTimer += speed1;
                if(stopTimer>=loopStopTime)
                    stopLoop= false;
            } else {
                el.attr("src", loopImages[loopIndex]);
                loopIndex ++;
                if(loopIndex >= loopImages.length){
                    loopIndex = 0;
                    stopLoop = true;
                    stopTimer = 0;
                }
            }
        }, speed1);
    };

    this.ClearStartTimer = function(){
        if(startTimer != null){
            window.clearInterval(startTimer);
            startTimer = null;
        }
    };
    this.ClearLoopTimer = function(){
        if(loopTimer != null){
            window.clearInterval(loopTimer);
            loopTimer = null;
        }
    };

    this.End = function(){
        self.ClearStartTimer();
        self.ClearLoopTimer();
    };
}


// 背景帧动画
function BgOneFrameAnimation(el,images,speed){
    el = $(el);
    var self = this;
    var currIdx = 0;
    var speed = speed;
    var timer = null;

    this.Start = function(){
        currIdx = 0;
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        el.css({"background":"url("+images[currIdx]+") no-repeat"});
        currIdx ++;
        if(currIdx >= images.length){
            this.End();
        }
    };

    this.Reset = function(){
        currIdx = 0;
        el.css({"background":"url("+images[currIdx]+") no-repeat"});
    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}


// 背景帧动画
function BgOneSpritesFrameAnimation(el,images,speed){
    el = $(el);
    var self = this;
    var currIdx = 0;
    var speed = speed;
    var timer = null;

    this.Start = function(){
        currIdx = 0;
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        el.css({"background-position":images[currIdx]});
        currIdx ++;
        if(currIdx >= images.length){
            this.End();
        }
    };

    this.Reset = function(){
        currIdx = 0;
        el.css({"background-position":images[currIdx]});
    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}

// 背景帧动画
function BindOneImageFrameAnimation(id,images, speed){
    var el = $("#"+id);
    var self = this;
    var currIdx = 0;
    var speed = speed;
    var timer = null;

    this.Start = function(){
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        el.attr("src", images[currIdx]);
        currIdx ++;
        if(currIdx >= images.length){
            currIdx = 0;
            self.End();
        }
    };

    this.Reset = function(){
        currIdx = 0;
        el.attr("src", images[currIdx]);
    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}

// 背景帧动画
function BindImageFrameAnimation2(id,images, speed, stopTime){
    var el = $("#"+id);
    var self = this;
    var currIdx = 0;
    var speed = speed;
    var timer = null;
    var isRun = true;
    var stopRunTime =0;

    this.Start = function(){
        isRun = true;
        currIdx = 0;
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        if(isRun){
            el.attr("src", images[currIdx]);
            currIdx ++;
            if(currIdx >= images.length){
                currIdx = 0;
                if(stopTime > 0){
                    isRun = false;
                    stopRunTime = stopTime;
                }
            }
        } else {
            stopRunTime -= speed;
            if(stopRunTime <= 0){
                isRun = true;
            }
        }
    };
    this.Reset = function(){

    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}

// 扫光
function BindLeftShaoGuanAnimation(id,bgid,left,bgLeft,maxWidth, speed){
    var el = $("#"+id);
    var bg = $("#"+bgid);
    var cLeft = left;
    var cBgLeft = bgLeft;
    var timer = null;
    var self = this;
    this.Start = function(){
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
            console.log(speed);
        }
    };

    this.Loop = function(){
        bg.css({"width":$(window).width(), "height":$(window).height()});
        cLeft +=10;
        cBgLeft -=10;
        el.css({"left":cLeft});
        bg.css({"left":cBgLeft});
        if(cLeft >= maxWidth){
            cLeft = left;
            cBgLeft = bgLeft;
        }
        console.log('a');
    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}

/* 交替变化对象  */
// elList 数组列表
// speed 速度
function JiaoTiAnimation(elList, speed){
    var timer = null;
    var currIndex = 0;
    var self =this;
    this.Start = function(){
        if(timer == null){
            timer = window.setInterval(function(){
                self.Loop();
            }, speed);
        }
    };

    this.Loop = function(){
        for(var i=0;i<elList.length;i++){
            if(i==currIndex){
                elList[i].show();
            } else {
                elList[i].hide();
            }
        }
        currIndex++;
        if(currIndex >= elList.length){
            currIndex = 0;
        }
    };

    this.End = function(){
        if(timer != null){
            window.clearInterval(timer);
            timer = null;
        }
    };
}

// 更新执行
function NewUpdate(speed, maxNum, callback){
    var num = 0;
    var timer = window.setInterval(function(){
        num ++;
        callback(num);
        if(num >= maxNum){
            window.clearInterval(timer);
            timer = null;
        }

    }, speed);
}

// 绑定提交按钮
function BindScaleObj(id,minScale, maxScale, step){
    var state = "big";
    var el = $("#"+id);
    var maxScale = maxScale || 1.1;
    var minScale = minScale || 1;
    var currScale = minScale;
    var step = step || 0.01;
    var timer = window.setInterval(function(){
        if(state == "big"){
            currScale+=step;
            if(currScale >= maxScale){
                state = "small";
            }
        } else {
            currScale-=step;
            if(currScale <= minScale){
                state = "big";
            }
        }
        el.css({"transform":"scale("+currScale+")"});
    }, 40);

    this.Stop = function(){
        window.clearInterval(timer);
        timer = null;
    };
}

function BindFloat(id, y,state, delay){
    var state = state || "up";
    var el = $("#"+id);
    var y = y || 20;
    var orginY = parseInt($(el).css("top"));
    var currY = y;
    if(state == "down")
        currY = -y;
    var step = step || 0.01;
    var frame = 1/60;
    var isstop = false;
    var timer = null;

    window.setTimeout(function(){
        start();
    }, delay);
    var start =function(){
        if(isstop) return;
        timer = window.setInterval(function(){
            if(state == "up"){
                currY = currY - currY * frame;
                if(currY <= 10){
                    currY = -y;
                    state = "down";
                }
            } else {
                currY = currY + (-currY * frame);
                if(currY >= -10){
                    currY = y;
                    state = "up";
                }
            }
            var t = parseFloat($(el).css("top"));
            t += currY * frame;
            el.css({"top":t});
        }, 40);
    }

    this.Stop = function(){
        if(timer != null)
            window.clearInterval(timer);
        timer = null;
        isstop = true;
    };
}

// 循环播放某个对象
function BindScrollMargin(el, child,dir,speed){
    var scrollBox = $(el).find(".scrollBox");
    var w = $(child).width();
    var html = $(scrollBox).html();
    for(var i=0;i <3; i++){
        $(scrollBox).append(html);
    }
    $(scrollBox).css({"width":w*4});
    var x = 0;
    var timer = window.setInterval(function(){
        if(dir == "left"){
            x +=2;
            $(el).scrollLeft(x);
            if(x >= w){
                x -= w;
            }
        }
    }, speed);
}


// 闪一闪动画
function BindShanYiShan(el, shanNum, shanSpeed, stopTime){
    var shanTimer = null;
    var stopTimer = null;
    var isShow = true;
    var self = this;
    var currShanNum = 0;
    this.Start = function(){
        shanTimer = window.setInterval(function(){
            isShow = !isShow;
            if(isShow){
                $(el).show();
                currShanNum ++;
                if(currShanNum >= shanNum){
                    currShanNum = 0;
                    window.clearInterval(shanTimer);
                    shanTimer = null;
                    startStopTimer();
                }
            }
            else{
                $(el).hide();
            }
        }, shanSpeed);
    };
    var startStopTimer = function(){
        stopTimer = window.setTimeout(function(){
            self.Start();
        }, stopTime);
    };
    this.End = function(){
        if(stopTimer != null){
            window.clearInterval(stopTimer);
            stopTimer = null;
        }
        if(shanTimer != null){
            window.clearInterval(shanTimer);
            shanTimer = null;
        }
    };

}



