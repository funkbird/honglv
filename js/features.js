/*
 * @Author: zhengwei
 * @Date:   2016-11-21 09:31:23
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-11-22 14:47:39
 */

'use strict';
$(function() {
    getFeatureList();
    //获取专题列表数据的
    function getFeatureList() {
        $.ajax({
            url: "http://czdm.ittun.com/api/gettopics",
            success: function(data) {
                var html = template('featuresListTmp', { "list": data });
                $('#features').html(html);
            }
        })
    }
})
