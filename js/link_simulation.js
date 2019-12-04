window.onload = function () {
    
    if(document.querySelector('#carousel')){
        new Carousel('#carousel');
    }
    
    
    /////////////////////
    var oSearch_bar = document.querySelector('#search_bar_s');
    var oTags = document.querySelector('#tags');
    var oMatches = document.querySelector('#match');

    oSearch_bar.onfocus = function () {
        oTags.style.display = 'none';
        oMatches.style.display = 'block';
    }

    oSearch_bar.onblur = function () {
        oTags.style.display = 'block';
        oMatches.style.display = 'none';
    }

    //////////
    var btn_login = document.querySelector('#login');
    var btn_submit = document.querySelector('#submit');
    var btn_logout = document.querySelector('#logout');

    btn_login.onclick = function () {
        document.querySelector('#login_search_bar').style.display = 'none';
        document.querySelector('.unlogin').style.display = 'none';
        document.querySelector('#login_form').style.display = 'block';
        document.querySelector('#side_nav').style.display = 'none';

    }
    btn_submit.onclick = function (ev) {
        var ev = ev || window.event;
        ev.preventDefault();
        document.querySelector('#login_search_bar').style.display = 'block';
        document.querySelector('#login_form').style.display = 'none';
        document.querySelector('.logined').style.display = 'block';
        document.querySelector('#side_nav').style.display = 'block';
        btn_logout.style.display = "block";
    }

    btn_logout.onclick = function () {

        document.querySelector('.unlogin').style.display = 'block';
        document.querySelector('.logined').style.display = 'none';
        btn_logout.style.display = "none";
    }
    /////////////
    var oSideNav = document.querySelector('#side_nav');
    var aLi = oSideNav.children;
    for (i = 0; i < aLi.length; i++) {
        aLi[i].children[2].style.transition = '.3s';
        aLi[i].children[1].style.transition = '.3s';
        aLi[i].children[2].style.transformOrigin = 'top';
        aLi[i].children[2].style.transform = 'scaleY(0)';
        aLi[i].children[2].style.height = 0;
        aLi[i].open = false;
    }

    oSideNav.onclick = function (ev) {
        // alert();
        var ev = ev || window.event;
        var option = ev.srcElement || ev.target;
        // alert(oLi.nodeName);
        if (option.nodeName.toLowerCase() == 'h3') {
            for (i = 0; i < aLi.length; i++) {
                aLi[i].children[2].style.transform = 'scaleY(0)';
                aLi[i].children[2].style.height = 0;
                aLi[i].children[1].style.transform = 'rotate(0)';
                
            }
            if(option.parentNode.open){
                for (i = 0; i < aLi.length; i++) {
                    aLi[i].open = false;
                }
                return;
            }
            option.parentNode.children[2].style.transform = 'scaleY(1)';
            option.parentNode.children[2].style.height = 'auto';
            option.parentNode.children[1].style.transform = 'rotate(90deg)';
            option.parentNode.open = true;
        }


    }
}