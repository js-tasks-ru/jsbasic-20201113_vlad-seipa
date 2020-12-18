export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.elem = this.render();
    this.changeValue();
  }

  render(){
    const slider = document.createElement("DIV");
    slider.classList.add("slider");

    slider.insertAdjacentHTML("beforeend", `
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: 0;">
        <span class="slider__value">${this.value}</span>
      </div>

      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: 0;"></div>

      <!--Шаги слайдера-->
      <div class="slider__steps">
      </div>
  `);

    for (let i = 0; i < (this.steps); i++){
      slider.querySelector(".slider__steps").insertAdjacentHTML("beforeend", `
        <span></span>
      `);
    };
    slider.querySelector(".slider__steps").children[0].classList.add("slider__step-active");

    return slider;
  }

  changeValue(){
    const thumb = this.elem.querySelector('.slider__thumb');
    const progress = this.elem.querySelector('.slider__progress');
    const sliderValue = this.elem.querySelector(".slider__value")
    const procentStep = 100/(this.steps-1);

    this.elem.addEventListener("click", (event) => {
      let coords = this.elem.getBoundingClientRect();

      let leftPercents = (event.clientX - coords.left) / this.elem.offsetWidth * (this.steps-1);
      leftPercents = +leftPercents.toFixed(0) / (this.steps-1) * 100;

      this.value = leftPercents/procentStep;
      
      sliderValue.innerHTML = this.value;
      
      for(let obj of this.elem.querySelectorAll(".slider__step-active")){
        obj.classList.remove("slider__step-active");
      };
      this.elem.querySelector(".slider__steps").children[this.value].classList.add("slider__step-active");

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;

      let ev = new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
      this.elem.dispatchEvent(ev);
    });
  }

}
