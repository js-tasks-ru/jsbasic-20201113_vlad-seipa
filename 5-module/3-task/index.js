function initCarousel() {
  // ваш код...
  let carouselInner = document.querySelector(".carousel__inner");
  let slideTransformWidth = 0;

  let arrowLeft = document.querySelector(".carousel__arrow_left");
  let arrowRight = document.querySelector(".carousel__arrow_right");

  arrowLeft.style.display = "none";

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
}
