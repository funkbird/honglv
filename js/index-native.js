/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 21:14:51
 */

'use strict';
$(function() {
    //1. 点击tab栏标题的时候把active 类名添加到当前点击的标题
    //a. 给所有tab栏标题添加点击事件
    //b. 先把所有标题的active类名删除掉 
    //c. 给当前点击的a(this)添加active类名
    //2. 当点击的时候要让所有的tab栏面板隐藏 给当前点击的标题对应的面板 显示
    var tabs = $('#cartoon > ul > li > a');
    var tabsPanel = $('#cartoon > div');
    tabs.on('click', function() {
        // console.log(this);
        tabs.removeClass('active');
        $(this).addClass('active');
        //给所有面板隐藏
        tabsPanel.hide();
        //给当前点击的标题对应的显示
        // 获取当前点击标题对应的面板 这个面板的id 存在了当前a href属性
        var panelId = $(this).attr('href');
        $(panelId).show();
    });

    //1. 轮播图自动无缝轮播
    // a. 得要知道多少秒走一张图片 设置一个定时器 设定多少秒走一张
    // b. 实现走一张 采用CSS3位移 同时走的过程中加过渡
    // c. 给轮播图的Ul加上位移
    // b. 计算每一张图片位移的距离 (图片的宽度 == 轮播图容器的宽度)
    // e. 定时器每走一次要切换到下一张 距离每次++
    // f. 将加好的距离设置到ul 是位移属性身上
    // g. 同时加上过渡
    // h. 当走到最后一张的时候要迅速回到第一张的位置 得判断什么时候是最后一张
    // i. 把当前的位置调整到第一张 同时 当前ul的位移的位置移到第一张的位置
    //获取轮播图容器的宽度
    var slideWidth = $('#slide').width();
    //定义一个轮播图当前的索引
    var index = 1;
    var slideUl = $('#slide .slide-ul');
    var points = $('#slide .points li');

    function setTransfrom() {
        //设置位移
        slideUl.css("transform", "translateX(" + -slideWidth * index + "px)");
        //加过渡
        slideUl.css("transition", "all 0.5s");
    }

    function removeTransition() {
        //设置位移
        slideUl.css("transform", "translateX(" + -slideWidth * index + "px)");
        //删除过渡
        slideUl.css("transition", "none");
    }
    var timer;
    setTimer();
    function setTimer() {
        timer = setInterval(function() {
            // 定时器每走一次 图片的索引++
            index++;
            setTransfrom();
        }, 1000);
    }
    //要判断什么时候是走到最后一张需要添加一个过渡完成事件
    slideUl.on('transitionend', function() {
        //判断index的位置
        if (index >= 3) {
            index = 1;
            removeTransition()
        } else if (index <= 0) {
            index = 2;
            removeTransition()
        }
        //在过渡完成之后切换小圆点的active
        //把所有小圆点的active类名删除掉
        points.removeClass("active");
        //给当前轮播图的索引对应的小圆点加上active
        //注意points[index] 是一个原生的DOM对象不能再使用zepto的方法
        $(points[index - 1]).addClass("active");
    });
    //2. 轮播图轮播的时候 下面的小圆点跟着变化
    //3. 轮播图要支持滑动左滑右滑
    //zepto的左滑事件 给当前的轮播图容器添加的事件 当从右往左滑动的时候触发
    $('#slide').on('swipeLeft', function() {
        clearInterval(timer);
        //从右往左滑动 切换到下一张图
        index++;
        setTransfrom()
        setTimer();
    });
    //zepto的右滑事件 给当前的轮播图容器添加的事件 当从左往右滑动的时候触发
    $('#slide').on('swipeRight', function() {
        clearInterval(timer);
        //从右往左滑动 切换到上一张图
        index--;
        setTransfrom()
    });
});
