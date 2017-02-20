/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 11:20:15
 */

'use strict';
$(function() {
    getSerialList();
    //获取连载动漫列表
    function getSerialList() {
        $.ajax({
            url: "http://czdm.ittun.com/api/getlianzai",
            success: function(data) {
            	var html = template('serialListTmp',{"list":data});
            	$('#serial').html(html);
            }
        })
    }
})
