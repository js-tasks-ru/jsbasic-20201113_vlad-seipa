import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.render();
  }

  render(){
    const _this = this.slides;

    // Slider's render
    const carousel = document.createElement("DIV");
    carousel.classList.add("carousel");

    const sliderButtons = `
      <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left" style="display: none">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `;
    carousel.insertAdjacentHTML("beforeEnd", sliderButtons);

    const carousel__inner = document.createElement("DIV");
    carousel__inner.classList.add("carousel__inner");

    for(const slide of this.slides){
      let slideTemplate = `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
      carousel__inner.insertAdjacentHTML("beforeEnd", slideTemplate);
    };
    carousel.append(carousel__inner);

    // Init carousel
    const slidesLength = this.slides.length;
    let slideTransformWidth = 0;
    carousel.addEventListener("click", function(event){
      if (event.target.closest("div.carousel__arrow_right")){

        slideTransformWidth += carousel__inner.offsetWidth;
        carousel__inner.style.transform = "translateX(-" + slideTransformWidth + "px)";

        if (slideTransformWidth > carousel__inner.offsetWidth*(slidesLength-2)){
          event.target.closest("div.carousel__arrow_right").style.display = "none";
        };

        if (slideTransformWidth > 0){
          document.querySelector(".carousel__arrow_left").style.display = "";
        };

      } else if(event.target.closest("div.carousel__arrow_left")){
        slideTransformWidth -= carousel__inner.offsetWidth;
        carousel__inner.style.transform = "translateX(" + slideTransformWidth*-1 + "px)";

        if (slideTransformWidth === 0){
          event.target.closest("div.carousel__arrow_left").style.display = "none";
        };
    
        if (slideTransformWidth !== carousel__inner.offsetWidth*slidesLength){
          document.querySelector(".carousel__arrow_right").style.display = "";
        };
      } else {
        return;
      }
    });

    // Slider's event
    carousel.addEventListener("click", function(event){
      if(event.target.closest("button.carousel__button")){
        carousel.dispatchEvent(new CustomEvent("product-add", {
          detail: event.target.closest("button.carousel__button").parentNode.parentNode.dataset.id,
          bubbles: true
        })
        );
      };
    });

    return carousel;
  }
  
}
