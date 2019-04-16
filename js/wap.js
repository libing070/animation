// JavaScript Document


var isLoadingFinish = false;
var loadImage = null;
var headIconUrl = "images/icon1.png";
var isStartCombin = false;
$(function(){
    $(".loading_box").click(function(){
        if(isLoadingFinish){
            $(".loading_box").hide();
            $(".hlv1_box").show();
        }
    });

    $(".hlv1_but").click(function(){
        $("#iptFile").click();
    });

    new UploadImg("iptFile", 1000, 1500, function(img, w, h){
        loadImage = img;
        var radio = 663/w;
        h = h * radio;

        var t = -(h - 663)/2;
        var l = 0;

        dragOImage.width = 663;
        dragOImage.height = h;
        dragOImage.left = l;
        dragOImage.top = t;

        dragImage.width = 663;
        dragImage.height = h;
        dragImage.left = l;
        dragImage.top = t;

        $(".hlv2_box .head_bg").attr("src", img);
        $(".hlv2_box .head_bg").css({"left":l, "top":t, "width":663, "height":h});
        loadImage = $(".hlv2_box .head_bg")[0];
        dragTarget = $(".hlv2_box .head_bg");
        $(".hlv2_box").show();
        $(".hlv1_box").hide();
    });

    $(".hlv2_box .icon_box li").click(function(){
        var rel = parseInt($(this).attr("rel"));
        var images = [
            "images/icon1.png",
            "images/icon2.png",
            "images/icon3.png",
            "images/icon4.png",
            "images/icon5.png",
            "images/icon6.png",
            "images/icon7.png",
            "images/icon8.png",
            "images/icon9.png",
            "images/icon10.png",
        ];
        headIconUrl = images[rel];
        $("#head_icon").attr("src", headIconUrl);
    });

    $(".hlv2_box .hlv2_but").click(function(){
        if(isStartCombin) return;
        isStartCombin = true;
        startCombin();
    });

    window.setTimeout(function(){
        window.LoadingImages.Init(loadImages, function(num,idx,img){

        }, function(){

        });
    }, 1000);

    var progress = 0;
    var maxNum = 300;
    new NewUpdate(10,maxNum, function(num){
        progress = parseInt((num/maxNum)*100);
        $(".loading_box span").html(progress+"%");
        if(num >= maxNum){
            $(".loading_box span").html("100%");
            isLoadingFinish = true;
            $(".loading_box").click();
        }
    });

    $('.head_box').bind('touchy-longpress', handleTouchyEvent);
    $('.head_box').bind('touchy-drag', handleTouchyEvent);
    $('.head_box').bind('touchy-pinch', handleTouchyEvent);
    $('.head_box').bind('touchy-rotate', handleTouchyEvent);
    $('.head_box').bind('touchy-swipe', handleTouchyEvent);

    window.addEventListener("touchmove", function(event){
        //if (event.preventDefault)
        //	 event.preventDefault();
        //return false;
    }, false);
    document.body.addEventListener('touchmove', function(event){
        //if (event.preventDefault)
        //	 event.preventDefault();
        //return false;
    },false);
});


// 缩放,旋转操作
var inertiaMotion = true;
var dragImage = {"has":true, "left":0,"top":0,"rotate":0,"scale":1, "width":1000, "height":1000};  // 拖动后的内容
var dragOImage = {"has":true, "left":0,"top":0,"rotate":0,"scale":1, "width":1000, "height":1000}; // 原始内容
var dragTarget = null;
var boolIsPinch = false;
var txtNickName = '';
function handleTouchyEvent(event, phase, $target, data){
    if(!dragImage.has) return;
    if(event.type == 'touchy-swipe'){

    } else if(event.type == 'touchy-pinch'){
        dragImage.scale += (data.scale - data.previousScale) * 0.3;
        if(dragImage.scale < 0) dragImage.scale = 0;
        dragTarget.css({"width":dragImage.width*dragImage.scale, "height":dragImage.height*dragImage.scale});
    } else if(event.type == 'touchy-drag'){
        dragImage.left -= (data.lastMovePoint.x - data.movePoint.x);
        dragImage.top -= (data.lastMovePoint.y - data.movePoint.y);
        dragTarget.css({'left':dragImage.left, 'top':dragImage.top});
    } else if(event.type == 'touchy-rotate'){

        //switch (phase) {
//			case 'start':
//				inertiaMotion = false;
//				break;
//			case 'move':
//				if(Math.abs(data.degreeDelta) < 20){
//					dragImage.rotate += data.degreeDelta * 0.3;
//					if(dragImage.rotate > 360){
//						dragImage.rotate -= 360;
//					} else if(dragImage.rotate < -360){
//						dragImage.rotate += 360;
//					}
//					//$("#tip").html(dragImage.rotate+"---" + data.degreeDelta*0.3);
//					dragTarget.css({'transform':'rotate3d(0,0,1,'+ dragImage.rotate +'deg)', "transform-origin":"left top"});
//				}
//				break;
//			case 'end':
//				inertiaMotion = true;
//		}

    } else {
        boolIsPinch =false;
    }
    if (event.preventDefault)
        event.preventDefault();
}


function startCombin(){
    console.log(dragImage);
    var w = dragImage.width*dragImage.scale; // loadImage.width;
    var h = dragImage.height*dragImage.scale; // loadImage.height;

    //var l = 181; t=160;

    var t = dragImage.top;
    var l = dragImage.left;

    var l2 = 0;
    var t2 = 0;

    var scale = 2;

    var combin = new CombinImage(663*scale,663*scale, "#ffffff");
    combin.addImage(loadImage,l*scale,t*scale,w*scale,h*scale, function(){
        combin.addImageFileScale(headIconUrl,l2,t2,663,663,0,0,663*scale,663*scale, function(){
            //combin.addImageFile("images/hlv3.png",0,0,750,1334, function(){
            var trueImg = combin.toDataUrl(1);
            $(".hlv3_box .saveimg").attr("src", trueImg).show();
            $(".hlv3_box .savetipImg").attr("src", trueImg).show();
            $(".hlv3_box").show();
            $(".hlv2_box").hide();
            isStartCombin = false;
            //});
        });
    });

}