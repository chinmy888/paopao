$(function(){
    //nav click
    $("aside .urlHref").click(function () { 
        $("aside .urlHref").removeClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($.attr(this, 'data-href')).offset().top-50
        }, 500);
    })

    //页面滚动时找到对应nav
    var $section = $('div[data-section]');
		
    $section.waypoint(function(direction) {
        if (direction === 'down') {
            navActive($(this.element).attr('data-section'));
        }
    }, {
        offset: '150px'
    });

    $section.waypoint(function(direction) {
        if (direction === 'up') {
            navActive($(this.element).attr('data-section'));
        }
    }, {
        offset: function() { return -$(this.element).height() + 155; }
    });
    
    function navActive(section) {
		var $el = $("aside .urlHref");
		$el.removeClass('active');
		$el.each(function(){
			$('[data-href="'+section+'"]').addClass('active');
		});

	};
    //删除英文模式下某些元素
    $("body.en #section1 .logo-title,body.en header .logo-title").find('.zh').remove();
    $("body.en").find('#section1 .logo-title .en').addClass('font20');


    //判断屏幕宽度到达手机宽度的时候，直接跳转手机页面
    loadIndex();
    window.addEventListener("resize", function() {
        loadIndex();
    })

    function loadIndex() {
        if (/Android|ios|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||($(window).width())<1000) {
            if(window.location.pathname!="/indexMobile.html"){
                window.location.href = '/indexMobile.html';
            }
        }else{
            if(window.location.pathname!="/index.html"){
                window.location.href = "/index.html"
            }
        }
    }



})