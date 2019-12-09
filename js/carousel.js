new Carousel('#carousel');

function Carousel(id) {

    if (!document.querySelector(id)) {
        return;
    }

    this.obj = document.querySelector(id);

    if (this.obj.querySelector('#carousel_sub_bar')) {
        this.oSub_bar = this.obj.querySelector('#carousel_sub_bar');
    }
    this.oDotList = this.obj.querySelector('#dot');
    this.oCarousel_bar = this.obj.querySelector('#carousel_bar');
    this.oCarousel_bar.style.left = 0;

    this.oCarousel_frame = this.obj.querySelector('#carousel_frame');
    this.timer = null;
    this.frame_width = this.oCarousel_frame.offsetWidth;
    this.index = 0;
    this.ontouch_ev1 = null;
    this.ontouch_ev2 = null;

    // this.oCarousel_bar.style.transition = '.3s';


    var _this = this;
    for (i = 0; i < this.oDotList.children.length; i++) {


        this.oDotList.children[i].index = i;

        this.oDotList.children[i].onclick = function () {
            _this.index = this.index;
            _this.switch(this.index);

        }
    }

    this.timer = setInterval(function () {
        _this.play();

    }, 2000)

    this.oCarousel_frame.onmouseover = function () {
        clearInterval(_this.timer);
    }
    

    this.oCarousel_frame.onmouseout = function () {
        _this.timer = setInterval(function () {
            _this.play();
            

        }, 2000)
    }
   
    this.oCarousel_frame.ontouchstart = function (ev) {
        clearInterval(_this.timer);
        _this.ontouch_ev1 = ev||window.event;
        _this.ontouch_ev1.preventDefault();
        // alert(_this.ontouch_ev1);
        
    }

    this.oCarousel_frame.ontouchmove = function (ev) {
        // clearInterval(this.timer);
        _this.ontouch_ev2 = ev||window.event;
        _this.ontouch_ev2.preventDefault();
        // this.oCarousel_bar.style.position = 'relative';
        // this.oCarousel_bar.style.left = this.oCarousel_bar.offsetLeft +(this.ontouch_ev1.targetTouches[0].clientX - this.oCarousel_bar.offsetLeft) + 'px';
        
    }.bind(this);

    this.oCarousel_frame.ontouchend = function (ev) {
       
       
        _this.calc_index();

        _this.switch(_this.index);
        _this.timer = setInterval(function () {
            _this.play();
            

        }, 2000)
        console.log(_this.index);
    }

    window.onresize = function () {
        _this.switch(0);
        _this.index = 0;
    }

}



Carousel.prototype.switch = function (index) {

    
    this.frame_width = this.oCarousel_frame.offsetWidth;
    // alert(this.frame_width);
    this.oCarousel_bar.style.transition = '0.3s';
    this.oCarousel_bar.style.position = 'relative';

    if (this.oSub_bar) {
        this.oSub_bar.style.transition = '0.3s';
        this.oSub_bar.style.position = 'relative';
        this.oSub_bar.style.left = -(this.frame_width * index) + 'px';
    }

    this.oCarousel_bar.style.left = -(this.frame_width * index) + 'px';



    for (i = 0; i < this.oDotList.children.length; i++) {
        this.oDotList.children[i].classList.remove('active');
    }
    this.oDotList.children[index].classList.add('active')



}

Carousel.prototype.play = function () {
    // alert(this.index);
    console.log(this.index);
    this.index++;
    if (this.index > this.oDotList.children.length - 1) {
        this.index = 0
    }
    
    // if(this.index<0)
    // this.calc_index();
    
    this.switch(this.index);
    
}

Carousel.prototype.calc_index =function(){
    if(!this.ontouch_ev2){
        return;
    }
   
    if(this.ontouch_ev2.targetTouches[0].clientX - this.ontouch_ev1.targetTouches[0].clientX>10){
        if(this.index<=0){
            this.index = this.oCarousel_bar.children.length-1;
        }else{
            this.index--;
        }
        
        
    } else if(this.ontouch_ev2.targetTouches[0].clientX - this.ontouch_ev1.targetTouches[0].clientX<-10){
        if(this.index>=this.oCarousel_bar.children.length-1){
            this.index=0;
        }else{
            this.index++;
        } 
        
    }

    this.ontouch_ev2=null;

    
} 