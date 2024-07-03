/**
 * cookie操作
 */
 var getCookie = function(name, value, options) {
     //某些ios下safari浏览器阻止了cookie 检测是否支持cookie
     if (typeof value != 'undefined') { // name and value given, set cookie
        $.cookie(name, value, options);
    } else { // only name given, get cookie
        return $.cookie('Language');
    }
    
};

/**
 * 设置语言类型： 默认为中文
 */
var i18nLanguage = "zh-CN";

/*
设置一下网站支持的语言种类
 */
var webLanguage = ['zh-CN', 'zh-TW', 'en'];

/**
 * 执行页面i18n方法
 * @return
 */ 
var execI18n = function(){
    /*
    首先获取用户浏览器设备之前选择过的语言类型
        */
    var cookie=getCookie("Language");
    if (cookie) {
        i18nLanguage = cookie;
    } else {
        // 获取浏览器语言
        var navLanguage = navigator.language;
        if (navLanguage) {
            // 判断是否在网站支持语言数组里
            var charSize = $.inArray(navLanguage, webLanguage);
            if (charSize > -1) {
                i18nLanguage = navLanguage;
                // 存到缓存中
                getCookie("Language",navLanguage);
            };
        } else{
            console.log("not navigator");
            return false;
        }
    }
    /* 需要引入 i18n 文件*/
    if ($.i18n == undefined) {
        console.log("请引入i18n js 文件")
        return false;
    };

    /*
    这里需要进行i18n的翻译
        */
    jQuery.i18n.properties({
        name : 'index', //资源文件名称
        path : 'i18n/' + i18nLanguage +'/', //资源文件路径
        mode : 'map', //用Map的方式使用资源文件中的值
        language : i18nLanguage,
        callback : function() {//加载成功后设置显示内容
            var insertEle = $(".i18n");
            console.log(".i18n 写入中...");
            insertEle.each(function() {
                // 根据i18n元素的 name 获取内容写入
                $(this).html($.i18n.prop($(this).attr('name')));
            });
           console.log("写入完毕");

        }
    });
}
//语言选择
function langClick(lang) { 
    getCookie("Language",lang,{
        expires: 30,
        path:'/'
    });
    if(!getCookie("Language")&&isSafari()){
        //cookie获取不到且浏览器为safari
        $("#langPanel").hide(); 
        alert('safari阻止了所有cookie,请在设置中取消阻止所有cookie');
    }else{
        $("#langBtn").html($.i18n.prop(lang));
        location.reload();
    }
}
function isSafari(){
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('applewebkit') > -1 && ua.indexOf('mobile') > -1 && ua.indexOf('safari') > -1 &&
        ua.indexOf('linux') === -1 && ua.indexOf('android') === -1 && ua.indexOf('chrome') === -1 &&
        ua.indexOf('ios') === -1 && ua.indexOf('browser') === -1) {
        return true;
    }else{
        return false;
    }
}
/*页面执行加载执行*/
$(function(){
    /*执行I18n翻译*/
    execI18n();

    // /*将语言选择默认选中缓存中的值*/
    $("#langBtn").html($.i18n.prop(i18nLanguage));

    $("body").addClass(i18nLanguage);


    //en 下替换图片
    $("body.en .enImg").each(function () {
        var index=$(this).attr('data-index');
        $(this).attr('src','../image/en/'+index+'.png');
    })
    //mobile en替换
    $("body.en .enImgPhone").each(function () {
        var index=$(this).attr('data-index');
        $(this).attr('src','../image/mobile/en/'+index+'.png');
    })

    $("#langLi").click(function (e) { 
        var display=$("#langPanel").css('display');
        if(display==="none"){
            $("#langPanel").show();
        }else{
            $("#langPanel").hide(); 
        }
        e.preventDefault();
    });

});