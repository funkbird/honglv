/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 21:10:27
 */

'use strict';
$(function() {
    //1.点击菜单的时候 主页往右移动 左侧菜单也往右移动
    //2 获取点击菜单这个元素
    //3. 添加点击事件
    //4. 把主页往右移动 200px 同时遮罩层显示
    //5. 左侧菜单往右移动200px
    //6. 点击遮罩层的任意位置 让左侧菜单 往左移动200px 
    //7. 主页往左移动200px  同时遮罩层隐藏
    // 获取点击菜单这个元素
    var menu = $('.icon-menu');
    //获取左侧菜单
    var leftMenu = $('.left-menu');
    //获取主页容器
    var layout = $('.layout');
    //获取遮罩层
    var mask = $('.mask');
    // 给菜单添加点击事件
    menu.on('click', function() {
        layout.css("transform", "translateX(200px)");
        mask.addClass("show");
        leftMenu.css("transform", "translateX(0px)");
    });
    //给遮罩层添加点击事件 
    //当点击的时候左侧菜单回到 -200px 的位置  主页容器 回到0px 的位置 遮罩层隐藏
    mask.on('click', function() {
        leftMenu.css("transform", "translateX(-200px)");
        layout.css("transform", "translateX(0px)");
        mask.removeClass("show");
    });
    //1.请求轮播图的API
    //2. 将请求到的轮播图数据 给模板去生成html
    //3. 把生成好的html 放到 carousel-inner 轮播图每一项的容器里面
    getSlide();

    function getSlide() {
        //1. 请求轮播图API
        //a.  发送一个请求
        // 参数 第一个url是请求的API的地址  第二个success是请求成功的回调函数
        $.ajax({
            url: "http://czdm.ittun.com/api/getlunbo",
            success: function(data) {
                //如果执行了success的回调函数说明请求成功
                //讲请求回来的数组包到一个对象的list属性身上
                data = { "list": data };
                //给模板去生成html
                //调用template 方法 第一个参数是模板的ID  第二个参数是数据
                var html = template('slideTmp', data);
                // console.log(html);
                //把 html放到carousel-inner 容器中
                //注意 如果直接替换里面的每一项轮播 可能会出现轮播图看不见 
                // 原因是轮播项需要一个active才能显示
                $('.carousel-inner').html(html);
                //给轮播项的第一项添加一个active类名
                //获取给轮播项的第一张轮播图 添加一个active类名
                $('.carousel-inner .item').eq(0).addClass('active');
            }
        })
    }
    //1. 实现轮播图的滑动 
    // a. 当手指从左往右滑动的时候  轮播图要切换到上一张
    // b. 当手指从右往左滑动的时候  轮播图要切换到下一张
    // 1添加滑动事件 
    // 2获取滑动开始的位置 
    // 3获取滑动结束的位置
    // 4用滑动结束的位置 - 开始的位置 =  滑动的距离  
    // 5通过滑动的距离判断 是 从左往右还是从右往左
    // 6从左往右滑动的时候   轮播图要切换到上一张
    // 7从右往左滑动的时候   轮播图要切换到下一张
    //获取轮播图容器 
    var slide = $('#slide');
    //给轮播图容器添加滑动事件
    //滑动开始的位置
    var startX = 0;
    //滑动结束的位置
    var endX = 0;
    // 给轮播图添加滑动开始事件
    slide.on('touchstart', function(e) {
        startX = e.originalEvent.touches[0].clientX;
    });
    // 给轮播图添加滑动结束事件
    slide.on('touchend', function(e) {
        endX = e.originalEvent.changedTouches[0].clientX;
        // 如果 滑动的距离是负值 表示是从右往左滑
        // 滑动的距离是正值 表示是从左往右滑
        if (endX - startX > 0) {
            // 正值 表示是从左往右滑 切换到上一张
            // 切换到上一张 调用轮播图的 carousel("prev")
            $('.carousel').carousel("prev");
        } else {
            // 负值 表示是从右往左滑 切换到下一张
            // 切换到下一张 调用轮播图的 carousel("next")
            $('.carousel').carousel("next");
        }
    });
    // 1. 当点击tab栏标题的时候要显示标题对应的数据
    // 2. 注册点击事件 给所有的tab栏标题注册点击事件
    // 3. 在点击事件里面获取这个标题对应的数据
    // 4. 根据标题的对应的type类型 传入到API里面获取对应的数据
    //   数据类型参数type：传入如下1-4中的任何一个数值来获取不同标签页中的数据
    // 1：新增连载 
    // 2：新增完结
    // 3：推荐连载 
    // 4：推荐完结
    // 5. 将这个数据类型type的值 关联到tab栏标题上
    // 6. 当点击某个tab栏标题的时候获取标题对应的 data-type的值
    // 7. 请求API同时将这个 data-type的值传到api的后面
    // 8. 请求完成后讲这个数据绑定到对应的tab栏里面
    // 9. 因为tab标题对应的tab栏面板 标题和面板是通过a标签的href属性来关联的
    // 10. 要拿到标题对应的面板容器 就要获取a标签对应的href顺序的值 通过这个值获取这个面板
    // 11 拿到这个面板把ul 里面的li 替换成 数据生成好的html模板
    var tabTitle = $("#cartoon > .nav-tabs > li > a");
    tabTitle.on('click', function() {
        //原生获取自定义属性的值
        // console.log(this.dataset['type']);
        //jquery的方式获取自定义属性
        // console.log($(this).data('type'));
        // jquery获取属性的方式 
        // console.log($(this).attr("href"));
        // console.log(this.getAttribute('href'));
        getCartoonList($(this).data('type'), $(this).attr('href'));
    });
    getCartoonList(1, "#home");
    // 获取动漫列表的函数
    function getCartoonList(type, href) {
        $.ajax({
            url: "http://czdm.ittun.com/api/gethometab/" + type,
            success: function(data) {
                var html = template('cartoonListTmp', { "list": data });
                // console.log(html);
                // 将模板放到对应的ul里面
                $(href).html(html);
            }
        })
    }
});
