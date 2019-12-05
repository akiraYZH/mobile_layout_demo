window.onload = function () {

    if (document.querySelector('#carousel')) {
        new Carousel('#carousel');
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
            if (option.parentNode.open) {
                option.parentNode.open = false;
                return;
            }
            option.parentNode.children[2].style.transform = 'scaleY(1)';
            option.parentNode.children[2].style.height = 'auto';
            option.parentNode.children[1].style.transform = 'rotate(90deg)';
            for (i = 0; i < aLi.length; i++) {
                aLi[i].open = false;
            }
            option.parentNode.open = true;
        }


    }


    /////////////////////////
    var json = {
        txt1: "melon真帅melon真帅melon真帅melon真帅melon真帅melon真帅melon真帅",
        txt2: "roger真帅roger真帅roger真帅roger真帅roger真帅roger真帅",
        txt3: "鸡你太美鸡你太美鸡你太美鸡你太美鸡你太美",
        txt4: "GIMC VS 易车，汽车电商“风口”上的2种姿势2014年11月易车市值接近汽车之家时，正值公布上季度财报，而在2014年Q3业绩易车网净1.86亿，超过汽车1.71亿。看来美国投资人是完全按净利润、自由现金流为这两家公司估值，对汽车电商..."

    }

    var oSearch_bar = document.querySelector('#search_bar_s');
    var oTags = document.querySelector('#tags');
    var oMatches = document.querySelector('#match');
    // var keyword = null;




    oSearch_bar.onkeyup = function () {
        //When input length is 0, show the tags
        if (oSearch_bar.value.length == 0) {
            // alert();
            oTags.style.display = 'block';
            oMatches.style.display = 'none';
            return;
        }

        oTags.style.display = 'none';
        oMatches.style.display = 'block';
        keywords = oSearch_bar.value.split(' ');


        // clear show record everytime the user types something

        oMatches.innerHTML = "";


        // sort keywords by length and remove repeated children
        keywords = sortKeywords(keywords);

        function sortKeywords(keywords) {
            keywords.sort(function (n1, n2) {
                return n1.length - n2.length;
            });
            // remove blank children
            for (i = 0; i < keywords.length; i++) {
                if (keywords[i].length == 0) {
                    keywords.splice(i, 1);
                    i = i - 1;
                }
            }

            // remove repeated children
            var keywords_nr = [];
            for (i = 0; i < keywords.length; i++) {
                if (!keywords_nr.includes(keywords[i])) {
                    keywords_nr.push(keywords[i]);
                }
            }
            //reverse the array sequence (for Practice )
            keywords_nr.reverse();
            return keywords_nr;
        }




        // show the matches


        for (i in json) {

            // var text_o = json[i];
            var text = json[i];
            var oLi = document.createElement('li');
            var oH3 = document.createElement('h3');
            var match = true;
            

            // juge if the text contains all the keywords
            for (j = 0; j < keywords.length; j++) {
                if (json[i].toLowerCase().search(keywords[j].toLowerCase()) == -1) {
                    match = false;
                }

            }
            console.log(keywords)

            if (match == true) {

                for (j = 0; j < keywords.length; j++) {

                    var _text = text;
                    var _keyword = keywords[j];
                    var reg = new RegExp('(?<!\<|\<\/)'+keywords[j] + '(?!\>)', 'gi');

                    _keyword = _text.substr(text.toLowerCase().indexOf(keywords[j].toLowerCase()), keywords[j].length);
                    console.log(keywords[j]);
                    text = _text.replace(reg, '<m>' + _keyword + '</m>');

                    console.log(reg);


                }

                oH3.innerHTML = text;
                oLi.appendChild(oH3);
                oLi.classList.add('match');
                oMatches.appendChild(oLi);
            }


        }



    }








}