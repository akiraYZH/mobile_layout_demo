function Carousel(id){

    if(!document.querySelector(id)){
        return;
    }
    this.obj = document.querySelector(id);
    this.oDotList = this.obj.querySelector('#dot');
    this.oCarousel_bar= this.obj.querySelector('#carousel_bar');
    this.oCarousel_bar.style.left=0;
    this.oSub_bar = this.obj.querySelector('#carousel_sub_bar');
    this.oCarousel_frame=this.obj.querySelector('#carousel_frame');
    this.timer = null;
    this.frame_width=this.oCarousel_frame.offsetWidth;
    this.index=0;

    // this.oCarousel_bar.style.transition = '.3s';
    

    var _this=this;
    for(i=0; i < this.oDotList.children.length; i++){


        this.oDotList.children[i].index = i;

        this.oDotList.children[i].onclick = function(){
            _this.switch(this.index);

        }
    }

    this.timer = setInterval(function(){
        _this.play();

    },2000)

    this.oCarousel_frame.onmouseover= function(){
        clearInterval(_this.timer);
    }

    this.oCarousel_frame.onmouseout= function(){
        _this.timer= setInterval(function(){
            _this.play();
    
        },2000)
    }

    window.onresize = function(){
        _this.switch(0);
    }

}



Carousel.prototype.switch =function(index){


    this.frame_width = this.oCarousel_frame.offsetWidth;
    // alert(this.frame_width);
    this.oCarousel_bar.style.transition = '0.3s';
    this.oCarousel_bar.style.position = 'relative';
    this.oSub_bar.style.transition = '0.3s';
    this.oSub_bar.style.position = 'relative';
    this.oCarousel_bar.style.left = -(this.frame_width * index) + 'px';
    this.oSub_bar.style.left = -(this.frame_width * index) + 'px';
    

    for(i=0; i < this.oDotList.children.length; i++){
        this.oDotList.children[i].classList.remove('active');
    }
    this.oDotList.children[index].classList.add('active')

    

}

Carousel.prototype.play = function(){
    // alert(this.index);
        
        if(this.index>this.oDotList.children.length-1){
            this.index=0
        }
        
        this.switch(this.index);
        this.index++;
}