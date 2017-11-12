/*

*/

var slider = (function(){
    'use strict'
    
    var Slider = window.Slider || {};
    
    Slider = (function(){
    
        //Constructor
        function Slider(element){
            
            var _ = this;
            console.log(_);
            var elImgs = element.children;
            var slidesWrapper = document.createElement('div');
            slidesWrapper.className = 'slider-wrapper';

            _.settings = {
                activated: false,
                speed: 3000,
                parentElement: element,
                slidesWrapperElement: slidesWrapper,
                nextArrow: null,
                prevArrow: null,
                allSlides: null,
                currentSlideIndex: 0,
                timer: null
            };
            
            //think about building a prototype init function to add these
            _.buildSlides(elImgs);
            _.buildArrows();
            _.autoPlay();
        }
        
        return Slider;
    })();
    
    //Functionality
    Slider.prototype.autoPlay = function() {
        
        var _ = this;

        _.settings.activated = true;
        _.settings.timer = setInterval(function(){_.iterateSlides(_)}, _.settings.speed);
        
    }
    
    Slider.prototype.iterateSlides = function(instance) {

        var _ = instance;

        //Remove siblings' style attribute
         _.removeSiblingAttr();
        
        if(_.settings.allSlides[_.settings.currentSlideIndex].nextElementSibling == null) {
            
            //Reset slide index
            _.settings.currentSlideIndex = 0;
            
            //Make the reset index element visible
            _.settings.allSlides[_.settings.currentSlideIndex].setAttribute("style", "display:block; z-index:1;");
            
        } else {
            
            //Set Slide index to next slide
            _.settings.currentSlideIndex = ++_.settings.currentSlideIndex;

            //Make the next sibling element visible
            _.settings.allSlides[_.settings.currentSlideIndex].setAttribute("style", "display:block; z-index:1;");
            
        }
    }
    
    Slider.prototype.removeSiblingAttr = function() {
        
        var _ = this;
        
        for(var i = 0;i < _.settings.allSlides.length;i++) {
            _.settings.allSlides[i].removeAttribute('style');
        }
        
    }
    
    Slider.prototype.nextSlide = function(instance) {
        var _ = instance;
        console.log('testing next slide'); //SCB
        _.autoPlayClear();
        
        //Remove siblings' style attribute
         _.removeSiblingAttr();
        
        if(_.settings.allSlides[_.settings.currentSlideIndex].nextElementSibling == null) {
            
            //Reset slide index
            _.settings.currentSlideIndex = 0;
            
            //Make the reset index element visible
            _.settings.allSlides[_.settings.currentSlideIndex].setAttribute("style", "display:block; z-index:1;");
            
        } else {
            
            //Set Slide index to next slide
            _.settings.currentSlideIndex = ++_.settings.currentSlideIndex;

            //Make the next sibling element visible
            _.settings.allSlides[_.settings.currentSlideIndex].setAttribute("style", "display:block; z-index:1;");
            
        }
    }
    
    Slider.prototype.autoPlayClear = function() {
        var _ = this;
        
        if(_.settings.timer) {
            clearInterval(_.settings.timer);
        }
    }
    
    Slider.prototype.buildSlides = function(images) {
        
        var _ = this;
        var i;
        var slides = '';
        
        

        for(i=0;i < images.length;i++) {
            
            var imgSource = images[i].getAttribute('src');
            var imgCaption = images[i].getAttribute('alt');
            
            //Create Slide Container for each image
            slides += "<div class='slider-img'>"
                        + "<img src='" + imgSource + "'/>"
                        + "<div class='slider-img-caption'>"
                        + imgCaption
                        + "</div>"
                    + "</div>";
  
        }
        
        //Clean out Images
        _.settings.parentElement.innerHTML = '';
        
        //Append new HTML content to parent and establish allSlides
        _.settings.slidesWrapperElement.innerHTML = slides;
        _.settings.allSlides = _.settings.slidesWrapperElement.children;
        _.settings.parentElement.appendChild(_.settings.slidesWrapperElement);
        
        
        //Activate first slide and set currentSlideIndex to first slide
        _.settings.allSlides[_.settings.currentSlideIndex].setAttribute("style", "display:block; z-index:1;");
        
    }
    
    Slider.prototype.buildArrows = function() {
        
        var _ = this;
        var parentElement = _.settings.parentElement;
        
        //Create Next Button
        var nextButton = document.createElement('div');
        nextButton.className = 'slider-nextBtn';
        parentElement.appendChild(nextButton);
        
        //Set next button in settings
        _.settings.nextArrow = nextButton;
        
        //CreatePrevious Button
        var previousButton = document.createElement('div');
        previousButton.className = 'slider-prevBtn';
        parentElement.appendChild(previousButton);
        
        //Set previous button in settings
        _.settings.prevArrow = previousButton;
        
        //Set EventListeners
        //_.settings.prevArrow.addEventListener();
        _.settings.nextArrow.addEventListener('click', function(){_.nextSlide(_)});
    }
    
    //Load CSS
    function loadDependencies() {
        
        var ss = document.styleSheets;
        var i;
        var deps = [];
        
        //Create Core CSS File
        var coreCSS = document.createElement('link');
        setAllAttributes(coreCSS, {"rel":"Stylesheet","type":"text/css","href":"css/slider.css"});
        deps.push(coreCSS);
        
        if(ss > 0) {
            
            for(i = 0;i < ss.length;i++) {

                console.log("in loop");
                if(ss[i].href.includes('font-awesome')) {

                    break;

                } else  {

                    //Create StyleSheet
                    var styleSheet = document.createElement('link')

                    //Set Attributes
                    setAllAttributes(styleSheet, {"rel":"Stylesheet","type":"text/css","href":"css/font-awesome.min.css"});

                    deps.push(styleSheet);
                }
            }
        } else {
                //Create StyleSheet
                var styleSheet = document.createElement('link')

                //Set Attributes
                setAllAttributes(styleSheet, {"rel":"Stylesheet","type":"text/css","href":"css/font-awesome.min.css"});

                deps.push(styleSheet);
        }
        
        for(i = 0;i < deps.length;i++) {
            console.log(deps);
            document.head.appendChild(deps[i]);
        }
    }
    
    //Exposed init function
    function sliderInit(selector) {
        
        var _ = this;
        var elements = document.querySelectorAll(selector);
        var i;
        
        loadDependencies();
        
        for(i=0;i < elements.length;i++) {
            _[i] = new Slider(elements[i]);
        }
        
        return _;
    }
    
    //Helper Functions
    function setAllAttributes(element, attrs) {
        for(var key in attrs) {
            element.setAttribute(key, attrs[key]);
        }
    }
    
    return {
        init: sliderInit
    }
})();