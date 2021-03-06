/*
        **  sprite动画插件 纯js
        **  作者: marchen
        **  版本: 0.1.0
        **  说明: option为sprite的参数,需要填写
        **  option.url   格式: xxx.jpg,xxx.png这样;
        **  option.xNum  格式:整数  sprite图片水平方向上有几个小图片
        **  option.yNum  格式:整数  sprite图片垂直方向上有多少小图片
                */
var spriteAnimate = (function(option){
                var className = option.className || 'spriteAnimate';    //定义HTML元素的类名
                var url = option.url   || null;         //图片的地址
                var xNum      = option.xNum  || null;         //图片中x方向多少个小图片
                var yNum      = option.yNum  || null;         //图片中y方向多少个小图片
                var hz        = option.hz    || 12  ;         //帧率
                var start     = option.start || 'yes';        //是否自动开始播放
                var time      = option.time  || 'infinite';   //动画重复播放次数
        //错误检查
                try{if(url === null){throw "error1"}
                else if(xNum === null || yNum === null){throw "error2";}}
                catch(e){
          if(e === "error1"){console.log('请填写option.url属性');alert('请填写option.url属性');}
          else if(e === "error2"){console.log('请填写option.xNum和option.yNum属性');alert('请填写option.xNum和option.yNum属性');}
                }

        //得到外部图片信息
                var image = new Image();
                image.src = url;
                image.onload = function(){
                var xOff = image.width/xNum;
                var yOff = image.height/yNum;

                //设置html元素的css样式
                var frame     =  document.getElementsByClassName('spriteAnimate')[0];   //得到动画的外框架
                frame.style.width = xOff + 'px';
                frame.style.height = yOff + 'px';
                frame.style.border = '1px solid red';
                frame.style.backgroundImage = "url("+url+")";
                frame.style.display = 'block';

        //开始动画
        run.i = 0;
        run.j = 0;
        run.time = 0;
        run.timeout = null;
        run.hz = Math.floor(1000/hz);
        function run(){
                if(run.i > (xNum-1)){
              run.j++;
              run.i = 0;
                }
                frame.style.backgroundPosition = (xOff*run.i) + 'px ' + (yOff*run.j) + 'px';
                run.i ++;
            run.timeout = setTimeout(run,run.hz);

            //播放完成一次
            if(run.j > (yNum-1)){
              //图片播放完了 是否重复播放
               if(time === 'infinite'){
                       //重头播放无限次
                       run.i = 0;
                       run.j = 0;
               }
               else{
                       if(run.time > (time-1)){
                               //播放次数用完
                  clearTimeout(run.timeout);
                       }
                       run.time ++;
               }
                }
        }
        if(start === 'yes'){run();}}
        })(option);
