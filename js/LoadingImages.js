//Insane - Tech Demo
(function( LoadingImages, $, undefined ) {
    LoadingImages.images = [];
    LoadingImages.callback = null;
    LoadingImages.currNum = 0;
    LoadingImages.finishCallback = null;

    // 初始化
    // images[] 要加载的图片列表
    // loadCallback(idx,img) 回加载完一个图片的回调,参数(索引,图片对象)
    // finishCallback 全部加载完后的回调
    LoadingImages.Init = function(images, loadCallback, finishCallback){
        LoadingImages.images = images;
        LoadingImages.callback = loadCallback;
        LoadingImages.finishCallback = finishCallback;
        LoadingImages.currNum = 0;
        LoadingImages.StartLoading();
    };

    // 开始加载
    LoadingImages.StartLoading = function(){
        for(var i=0; i<LoadingImages.images.length; i++){
            LoadingImages.LoadImg(i,LoadingImages.images[i]);
        }
    };

    // 加载一个图片
    LoadingImages.LoadImg = function(idx,url){
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.onload = function () { //图片下载完毕时异步调用callback函数。
            LoadingImages.LoadCallback(idx,img);
        };
        img.src = url;
    }

    // 加载结束回调
    LoadingImages.LoadCallback = function(idx,img){
        LoadingImages.currNum ++;
        LoadingImages.callback(LoadingImages.currNum, idx, img);
        if(LoadingImages.currNum >= LoadingImages.images.length){
            LoadingImages.currNum = 0;
            LoadingImages.finishCallback();
        }
    }
}( window.LoadingImages = window.LoadingImages || {}, jQuery ));