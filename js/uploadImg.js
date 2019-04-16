function UploadImg(id, expectWidth, expectHeight, cb){
    var Orientation = "";
    var loadImage = null;
    var base64Img = null;
    var self = this;

    this.getOrientation = function(file,callback){
        //获取照片方向角属性，用户旋转控制
        EXIF.getData(file, function() {
            // alert(EXIF.pretty(this));
            EXIF.getAllTags(this);
            Orientation = EXIF.getTag(this, 'Orientation');
            if(callback != null){
                callback();
            }
        });
    };

    this.readFile = function(file, width, height, callback){
        var oReader = new FileReader();
        oReader.onload = function(e) {
            var image = new Image();
            image.src = e.target.result;
            //alert(image.src);
            image.onload = function() {
                loadImage = image;
                var expectWidth = this.naturalWidth;
                var expectHeight = this.naturalHeight;

                if (this.naturalWidth > this.naturalHeight && this.naturalWidth > width) {
                    expectWidth = width;
                    expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > height) {
                    expectHeight = height;
                    expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                }
                var canvas = document.createElement("canvas");
                var ctx = canvas.getContext("2d");
                canvas.width = expectWidth;
                canvas.height = expectHeight;
                ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                var base64 = null;

                if(Orientation != "" && Orientation != 1){
                    //alert('旋转处理');
                    switch(Orientation){
                        case 6://需要顺时针（向左）90度旋转
                            //alert('需要顺时针（向左）90度旋转');
                            self.rotateImg(this,'left',canvas);
                            var h = expectHeight;
                            expectHeight = expectWidth;
                            expectWidth = h;
                            break;
                        case 8://需要逆时针（向右）90度旋转
                            //alert('需要顺时针（向右）90度旋转');
                            self.rotateImg(this,'right',canvas);
                            var h = expectHeight;
                            expectHeight = expectWidth;
                            expectWidth = h;
                            break;
                        case 3://需要180度旋转
                            //alert('需要180度旋转');
                            self.rotateImg(this,'right',canvas);//转两次
                            self.rotateImg(this,'right',canvas);
                            break;
                    }
                }
                base64Img = canvas.toDataURL("image/jpeg", 1);
                if(callback != null){
                    callback(base64Img, expectWidth, expectHeight);
                }
            };
        };
        oReader.readAsDataURL(file);
    };

    //对图片旋转处理 added by lzk
    this.rotateImg = function(img, direction,canvas) {
        //alert(img);
        //最小与最大旋转方向，图片旋转4次后回到原方向
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');
        var step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        //img.setAttribute('step', step);
        /*var canvas = document.getElementById('pic_' + pid);
        if (canvas == null) {
            img.style.display = 'none';
            canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'pic_' + pid);
            img.parentNode.appendChild(canvas);
        }  */
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch (step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
    }

    $("#"+id).change(function(){
        var files = document.getElementById(id).files;
        if(files == undefined || files == null  || files.length <= 0)
            return;
        var file = files[0];
        if (!/image\/\w+/.test(file.type)) {
            alert("请确保文件为图像类型");
            return false;
        }
        self.getOrientation(file, function(){
            self.readFile(file, expectWidth, expectHeight, cb);
        });
    });

}

function CombinImage(width, height, bgColor){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = bgColor;
    ctx.fillRect(0,0, width, height);
    var self = this;

    this.addImage = function(img,x,y,w,h, cb){
        ctx.drawImage(img, x, y, w, h);
        if(cb != null){
            cb();
        }
    };

    this.addImageFile = function(url,x,y,w,h, cb){
        var img = new Image();
        img.onload = function () {
            self.addImage(img,x,y,w,h,null);
            if(cb != null){
                cb();
            }
        };
        img.src = url;
    };
    this.addImageScale = function(img,x,y,w,h,tx,ty,tw,th, cb){
        ctx.drawImage(img, x, y, w, h, tx, ty, tw, th);
        if(cb != null){
            cb();
        }
    };
    this.addImageFileScale = function(url,x,y,w,h,tx,ty,tw,th, cb){
        var img = new Image();
        img.onload = function () {
            self.addImageScale(img,x,y,w,h,tx,ty,tw,th,null);
            if(cb != null){
                cb();
            }
        };
        img.src = url;
    };

    this.toDataUrl = function(quality){
        return canvas.toDataURL("image/jpeg", quality);
    };

}




