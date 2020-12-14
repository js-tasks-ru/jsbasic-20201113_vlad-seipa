function initCarousel() {
  // ваш код...
  let carouselInner = document.querySelector(".carousel__inner");
  let slideTransformWidth = 0;

  let carousel = document.querySelector(".carousel");

  document.querySelector(".carousel__arrow_left").style.display = "none";

  carousel.addEventListener("click", function(event){
    if (event.target.closest("div.carousel__arrow_right")){
      slideTransformWidth += carouselInner.offsetWidth;
      carouselInner.style.transform = "translateX(-" + slideTransformWidth + "px)";
  
      if (slideTransformWidth > carouselInner.offsetWidth*2){
        document.querySelector(".carousel__arrow_right").style.display = "none";
      };
  
      if (slideTransformWidth > 0){
        document.querySelector(".carousel__arrow_left").style.display = "";
      };

    } else if(event.target.closest("div.carousel__arrow_left")){
      slideTransformWidth -= carouselInner.offsetWidth;
      carouselInner.style.transform = "translateX(" + slideTransformWidth*-1 + "px)";
  
      if (slideTransformWidth === 0){
        document.querySelector(".carousel__arrow_left").style.display = "none";
      };
  
      if (slideTransformWidth !== carouselInner.offsetWidth*4){
        document.querySelector(".carousel__arrow_right").style.display = "";
      };

    } else {
      return;
    };
  });

/*
  // ПРЕЖНЯЯ ВЕРСИЯ

  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");

  arrowLeft.addEventListener("click", function(){
    slideTransformWidth -= carouselInner.offsetWidth;
    carouselInner.style.transform = "translateX(" + slideTransformWidth*-1 + "px)";

    if (slideTransformWidth === 0){
      arrowLeft.style.display = "none";
    };

    if (slideTransformWidth !== carouselInner.offsetWidth*4){
      arrowRight.style.display = "";
    };
  });

  arrowRight.addEventListener("click", function(){
    slideTransformWidth += carouselInner.offsetWidth;
    carouselInner.style.transform = "translateX(-" + slideTransformWidth + "px)";

    if (slideTransformWidth > carouselInner.offsetWidth*2){
      arrowRight.style.display = "none";
    };

    if (slideTransformWidth > 0){
      arrowLeft.style.display = "";
    };
  });
*/
}
